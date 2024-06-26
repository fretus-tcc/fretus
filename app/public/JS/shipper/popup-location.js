const locationCall = document.querySelectorAll('.location-call')
const locationPopup = document.querySelector('.popup.location')
const closelocation = document.querySelector('.popup.location .close')
const accessToken = 'pk.eyJ1IjoiZ2FicmllbGNhcnZhbGgwIiwiYSI6ImNscG14ZDB6OTAwc3Eya29pM2dvZm5uamYifQ.IPac1tcfJTcmQLrrn937wQ'

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

locationCall.forEach(item => {
  item.addEventListener('click', () => {
    locationPopup.classList.add('show')
    map.resize()
  })
})

closelocation.addEventListener('click', () => {
  locationPopup.classList.remove('show')
})

function toggleItens() {
  var itens = document.querySelector('.itens');
  var icon = document.getElementById("arrow-icon");

  itens.style.display = itens.style.display === 'block' ? 'none' : 'block';

  if (icon.classList.contains("down-arrow")) {
    icon.classList.remove("down-arrow");
    icon.classList.add("up-arrow");
} else {
    icon.classList.remove("up-arrow");
    icon.classList.add("down-arrow");
}
}
