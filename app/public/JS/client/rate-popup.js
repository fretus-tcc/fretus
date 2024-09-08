const rate = document.querySelectorAll('.rate-call')
const popup = document.querySelectorAll('.popup.rate')
const close = document.querySelectorAll('.popup.rate .close')
const rateField = document.querySelector('.rate-field')

rate.forEach((item, i) => {
    item.addEventListener('click', () => {
        popup[i].classList.add('show')
    })
})

close.forEach((item, i) => {
    item.addEventListener('click', () => {
        popup[i].classList.remove('show')
    })
})