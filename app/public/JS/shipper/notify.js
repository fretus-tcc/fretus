const notify = document.querySelectorAll('.notify-call')
const notifyPopup = document.querySelector('.notify')
const close = document.querySelector('.notify .close')

notify.forEach((item, idx) => {
    item.addEventListener('click', () => {
        notifyPopup.classList.add('show')
    })
})

close.addEventListener('click', () => notifyPopup.classList.remove('show'))

// console.log(notify);