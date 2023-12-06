const inputs = document.querySelectorAll('.address')
const results = document.querySelectorAll('.suggestions-options')
const accessToken = 'pk.eyJ1IjoiZ2FicmllbGNhcnZhbGgwIiwiYSI6ImNscG14ZDB6OTAwc3Eya29pM2dvZm5uamYifQ.IPac1tcfJTcmQLrrn937wQ'
let route

mapboxgl.accessToken = accessToken
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [-46.625290, -23.533773],
    zoom: 12,
    minZoom: 5,
    language: 'pt'
})

window.addEventListener('resize', () => {
    if (route) {
        setZoomRoute(route)
    }
})

map.addControl(new mapboxgl.NavigationControl());

const start = new mapboxgl.Marker({
    color: '#2C6493',
    draggable: true
})

const end = new mapboxgl.Marker({
    color: '#ef9652',
    draggable: true

})

start.on('dragend', async () => {
    const newCoords = start._lngLat
    start.setLngLat(newCoords)
    getRoute(start, end)
    const newAddress = await dataResult(newCoords)
    inputs[0].value = `${newAddress.features[0].place_name}`
    inputs[0].setCustomValidity('')
    // console.log(route.distance / 1000)
    // setPrice(route.distance / 1000)
})

end.on('dragend', async () => {
    const newCoords = end._lngLat
    end.setLngLat(newCoords)
    getRoute(start, end)
    const newAddress = await dataResult(newCoords)
    inputs[1].value = `${newAddress.features[0].place_name}`
    inputs[1].setCustomValidity('')
    // console.log(route.distance / 1000)
    // setPrice(route.distance / 1000)
})

const dataResult = async (query) => {
    // const bbox = "-53.305664,-25.204941,-45.439453,-19.849394"
    let url = `https://mapbox-hidden-api.vercel.app/geocoding/${query}`
    if (typeof query != 'string') {
        url = `https://mapbox-hidden-api.vercel.app/geocoding/${query.lng},${query.lat}?reverse=true`
    }
    const res = await fetch(url)
    const dataRes = await res.json()
    return dataRes
}

inputs.forEach((input, i) => {
    input.addEventListener('input', async () => {
        input.setCustomValidity('Endereço não válido!')
        input.classList.add('border')
        const dataRes = await dataResult(input.value)
        results[i].innerHTML = ''
        dataRes.features.forEach((suggestion) => {
            const suggestionItem = document.createElement('li')
            suggestionItem.innerText = suggestion.place_name
            suggestionItem.addEventListener('click', (e) => {
                input.setCustomValidity('')
                const coords = suggestion.geometry.coordinates
                input.value = e.target.innerText
                if (input.classList.contains('start')) {
                    start.setLngLat(coords).addTo(map)
                } else {
                    end.setLngLat(coords).addTo(map)
                }

                getRoute(start, end)

                map.easeTo({
                    center: coords
                })
                removeSuggestions(input, i)
            })
            results[i].appendChild(suggestionItem)
        })
    })
})

async function getRoute(start, end) {
    const startCoords = start._lngLat
    const endCoords = end._lngLat

    if (startCoords && endCoords) {
        const url = `https://mapbox-hidden-api.vercel.app/routes/?startLng=${startCoords.lng}&startLat=${startCoords.lat}&endLng=${endCoords.lng}&endLat=${endCoords.lat}`
        const res = await fetch(url)
        const data = await res.json()
        route = data.routes[0]
        
        // const minutes = Math.floor(route.duration / 60)
        // const meters = route.distance
        const geojson = {
            type: 'Feature',
            properties: {},
            geometry: {
                type: 'LineString',
                coordinates: route.geometry.coordinates
            }
        }
        
        if (map.getSource('route')) {
            map.getSource('route').setData(geojson);
        }
        else {
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
            });
        }
        
        setZoomRoute(route)
        setPrice(route.distance / 1000)
    }
}

const setZoomRoute = route => {
    const bounds = new mapboxgl.LngLatBounds(
        route.geometry.coordinates[0],
        route.geometry.coordinates[0]
    )
    
    route.geometry.coordinates.forEach(coord => {
        bounds.extend(coord)
    })

    map.fitBounds(bounds, { padding: 50 })
}

inputs.forEach((input, i) => {
    document.addEventListener('click', (e) => {
        if (!input.contains(e.target) && !results[i].contains(e.target)) {
            removeSuggestions(input, i)
        }
    })
})

function removeSuggestions(input, i) {
    results[i].innerHTML = ''
    input.classList.remove('border')
}