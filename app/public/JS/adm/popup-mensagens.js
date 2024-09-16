const popups = document.querySelectorAll('.popup.info')
const close = document.querySelectorAll('.popup.info .close')
const call = document.querySelectorAll('.indicator')

call.forEach((item, i) => {
    item.addEventListener('click', () => {
        popups[i].classList.add('show')
    })
})

close.forEach((item, i) => {
    item.addEventListener('click', () => {
        popups[i].classList.remove('show')
    })
})
