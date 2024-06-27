const infoCall = document.querySelectorAll('.indicator')
const popupInfo = document.querySelector('.popup.description')
const popupClose = document.querySelector('.popup.description .close')

infoCall.forEach(item => {
    item.addEventListener('click', () => {
        popupInfo.classList.add('show')
    })
})

popupClose.addEventListener('click', () => {
    popupInfo.classList.remove('show')
})
