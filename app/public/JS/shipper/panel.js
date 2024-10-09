const accessToken = 'pk.eyJ1IjoiZ2FicmllbGNhcnZhbGgwIiwiYSI6ImNscG14ZDB6OTAwc3Eya29pM2dvZm5uamYifQ.IPac1tcfJTcmQLrrn937wQ'
let route
const socket = io()

const getUserPosition = () => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, { enableHighAccuracy: true })
    })
}

const setUserCoords = async () => {
    try {
        const { coords: { latitude, longitude } } = await getUserPosition()
        return [longitude, latitude]
    } catch (err) {
        return [-46.625290, -23.533773]
    }
}

const coords = await setUserCoords()

setInterval(async () => {
    const pos = await setUserCoords()
    start.setLngLat(pos)
    
    const active = document.querySelector('.ships.active')
    const next = document.querySelector('.status.active .next-step')
    // console.log(active.dataset.idPedido);
    
    if (active != null) {
        socket.emit('nova localizacao', { start: start.getLngLat(), end: end.getLngLat(), id_entregador, id_pedido: active.dataset.idPedido })
        getRoute(start.getLngLat(), end.getLngLat())
        // console.log(route)
        if (route.distance <= 1000) {
            console.log('perto')
            next.removeAttribute('disabled')
        } else {
            console.log('longe')
            next.setAttribute('disabled', 'true')
        }
    }
}, 5000)

mapboxgl.accessToken = accessToken
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: coords,
    zoom: 12,
    minZoom: 5,
    language: 'pt'
})
map.addControl(new mapboxgl.NavigationControl())

const start = new mapboxgl.Marker({
    color: 'rgb(15, 118, 110)',
}).setLngLat(coords)

const end = new mapboxgl.Marker({
    color: 'rgb(15, 118, 110)',
})

const ships = document.querySelectorAll('.ships')
const form = document.querySelector('.form')
const mapContainer = document.querySelector('.map')
const statusContainer = document.querySelectorAll('.status')
const backForm = document.querySelector('.return-form')

ships.forEach((item, index) => {
    item.addEventListener('click', () => {
        document.querySelector('.ships.active')?.classList.remove('active')
        item.classList.add('active')

        document.querySelector('.status.active')?.classList.remove('active')
        statusContainer[index].classList.add('active')

        form.classList.add('mobile')
        mapContainer.classList.add('mobile')
        backForm.classList.add('show')
        
        const shipCoords = [item.dataset.lng, item.dataset.lat]
        setRoute(shipCoords)
    })
})

const getRoute = async (start, end) => {
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${start.lng},${start.lat};${end.lng},${end.lat}?geometries=geojson&access_token=${accessToken}`
    const data = await fetch(url)
    const json = await data.json()
    route = json.routes[0]

    const geojson = {
        type: 'Feature',
        properties: {},
        geometry: {
            type: 'LineString',
            coordinates: route.geometry.coordinates
        }
    }

    if (map.getSource('route')) {
        map.getSource('route').setData(geojson)
    } else {
        map.addLayer({
            id: 'route',
            type: 'line',
            source: {
                type: 'geojson',
                data: geojson
            },
            layout: {
                'line-join': 'round',
                'line-cap': 'round'
            },
            paint: {
                'line-color': '#3887be',
                'line-width': 5,
                'line-opacity': 0.75
            }
        })
    }

    setZoomRoute(route)
}

const setZoomRoute = route => {
    const bounds = new mapboxgl.LngLatBounds(
        route.geometry.coordinates[0],
        route.geometry.coordinates[0]
    )
    
    route.geometry.coordinates.forEach(coord => {
        bounds.extend(coord)
    })

    map.fitBounds(bounds, { padding: 300 })
}

const setRoute = (shipCoords) => {
    start.addTo(map)
    end.setLngLat(shipCoords).addTo(map)

    map.easeTo({
        center: shipCoords
    })

    getRoute(start.getLngLat(), end.getLngLat())
}

const currentActive = document.querySelector('.ships.active')
if (currentActive != null) {
    setRoute([currentActive.dataset.lng, currentActive.dataset.lat])
}

window.addEventListener('resize', () => {
    if (route) {
        setZoomRoute(route)
    }
})

backForm.addEventListener('click', () => {
    form.classList.toggle('mobile')
})