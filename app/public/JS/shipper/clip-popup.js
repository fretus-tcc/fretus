const clip = document.querySelector('.clip')
const popup = document.querySelector('.clip-popup')

clip.addEventListener('click', () => {
    popup.classList.toggle('active')
    document.addEventListener('click', closePopup)
})

function closePopup(e) {
    if (!popup.contains(e.target) && !clip.contains(e.target)) {
        popup.classList.remove('active')
        document.removeEventListener('click', closePopup)
    }
}