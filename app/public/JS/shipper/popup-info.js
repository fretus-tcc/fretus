const infoCall = document.querySelectorAll('.indicator')
const popupInfo = document.querySelectorAll('.popup.info')
const popupClose = document.querySelectorAll('.info .close')

infoCall.forEach((item, i) => {
    item.addEventListener('click', () => {
        popupInfo[i].classList.add('show')
    })
})

popupClose.forEach((item, i) => {
    item.addEventListener('click', () => {
        popupInfo[i].classList.remove('show')
    })
})
