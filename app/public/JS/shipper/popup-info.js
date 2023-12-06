const infoCall = document.querySelectorAll('.indicator')
const popupInfo = document.querySelector('.popup.info')
const popupClose = document.querySelector('.info .close')

infoCall.forEach(item => {
    item.addEventListener('click', () => {
        popupInfo.classList.add('show')
    })
})

popupClose.addEventListener('click', () => {
    popupInfo.classList.remove('show')
})