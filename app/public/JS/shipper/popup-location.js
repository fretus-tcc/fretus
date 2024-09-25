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
	})
})

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