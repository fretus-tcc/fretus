const step = document.querySelectorAll('.mobile-controls > input[type="radio"]')
const imgs = document.querySelectorAll('.mobile-content > .content-item')
let mobileIndex = 0

const changeCarouselState = (i) => {
    removeClass()
    step[i].checked = true
    imgs[i].classList.add('show')
}

step.forEach((item, i) => {
    item.addEventListener('click', () => {
        mobileIndex = i
        changeCarouselState(mobileIndex)
    })
})

setInterval(() => {
    if (mobileIndex >= 2) {
        mobileIndex = 0
    } else {
        mobileIndex++
    }
    changeCarouselState(mobileIndex)
}, 3500)

function removeClass() {
    imgs.forEach(item => {
        if (item.classList.contains('show')) {
            item.classList.remove('show')
        }
    })
}