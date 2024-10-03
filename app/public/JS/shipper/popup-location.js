const locationCall = document.querySelectorAll('.location-call')
const locationPopup = document.querySelector('.popup.location')
const closelocation = document.querySelector('.popup.location .close')
const accessToken = 'pk.eyJ1IjoiZ2FicmllbGNhcnZhbGgwIiwiYSI6ImNscG14ZDB6OTAwc3Eya29pM2dvZm5uamYifQ.IPac1tcfJTcmQLrrn937wQ'
const menuItems = document.querySelectorAll('.menu-item')
const errorContainer = document.querySelector('.popup.location .error')
const statusText = document.querySelector('.popup.location .status-text')
const statusBar = document.querySelectorAll('.popup.location .bar_count')
const loading = document.querySelector('.popup.location .loading')

mapboxgl.accessToken = accessToken
const map = new mapboxgl.Map({
	container: 'map',
	style: 'mapbox://styles/mapbox/streets-v12',
	center: [-46.625290, -23.533773],
	zoom: 12,
	minZoom: 5,
	language: 'pt'
})

map.addControl(new mapboxgl.NavigationControl());

locationCall.forEach(async item => {
	item.addEventListener('click', async () => {
		locationPopup.classList.add('show')
		map.resize()

		const { status } = await fetchStatus(item.dataset.idPedido)
		loading.classList.remove('show')
		showStatus(status)
	})
})

function showStatus(status) {
	status.shift()
	const statusItems = [...menuItems].reverse()

	if (status.length <= 0) {
		errorContainer.classList.add('show')
		statusText.textContent = 'Entrega não iniciada'
		return
	}

	status.forEach((item, i) => {
		statusItems[i].classList.add('active')
		const time = statusItems[i].querySelector('.time-status')
		const data_status = new Date(item.data_status)
		time.textContent = data_status.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
		const status_msgs = ['Buscando Produto', 'A caminho', 'Receba seu produto', 'Entrega Finalizada']
		statusText.textContent = status_msgs[item.status_entrega - 1]
		statusBar[i].classList.add('count1')
		locationPopup.setAttribute('data-id-entregador', item.id_entregador)
		locationPopup.setAttribute('data-id-pedido', item.id_pedido)
	})
	
	statusItems[status.length - 1].classList.add('color')
}

async function fetchStatus(id_pedido) {
	try {
        const res = await fetch(`/cliente/status-entrega/${id_pedido}`)
        const data = await res.json()

        if (!res.ok) {
            console.log(res)
            return
        }

        return data

    } catch (error) {
        console.log(error)
        return error
    }
}

closelocation.addEventListener('click', () => {
	const statusItems = [...menuItems].reverse()

	locationPopup.classList.remove('show')
	errorContainer.classList.remove('show')
	statusItems.forEach((item, i) => {
		item.classList.remove('active')
		item.classList.remove('color')
		statusBar[i].classList.remove('count1')
		loading.classList.add('show')
        locationPopup.setAttribute('data-id-entregador', '')
		locationPopup.setAttribute('data-id-pedido', '')
	})
})

socket.on('localizacao recebida', async (data) => {
	if (locationPopup.classList.contains('show') && locationPopup.dataset.idEntregador == data.id_entregador && locationPopup.dataset.idPedido == data.id_pedido) {
		console.log(data)
		await setMarkers(data.start, data.end)
	}
})

const startMarker = new mapboxgl.Marker({
	color: 'rgb(15, 118, 110)',
})

const endMarker = new mapboxgl.Marker({
	color: 'rgb(15, 118, 110)',
})

async function setMarkers(start, end) {
	startMarker.setLngLat(start).addTo(map)
	endMarker.setLngLat(end).addTo(map)
	await getRoute(start, end)
}

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

    map.fitBounds(bounds, { padding: 50 })
}

// function toggleItens() {
// 	var itens = document.querySelector('.itens');
// 	var icon = document.getElementById("arrow-icon");

// 	itens.style.display = itens.style.display === 'block' ? 'none' : 'block';

// 	if (icon.classList.contains("down-arrow")) {
// 		icon.classList.remove("down-arrow");
// 		icon.classList.add("up-arrow");
// 	} else {
// 		icon.classList.remove("up-arrow");
// 		icon.classList.add("down-arrow");
// 	}
// }