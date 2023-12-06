const carousel = document.querySelector('.rating-container')
const next = document.querySelector('.next')
const back = document.querySelector('.back')
let index = 0

next.addEventListener('click', () => {
    index++
    moveCarousel(index)
})

back.addEventListener('click', () => {
    index--
    moveCarousel(index)
})

function moveCarousel(i) {
    if (index < 0) {
        index = 5
    } else if (index > 5) {
        index = 0
    }
    let width = carousel.clientWidth
    carousel.scrollLeft = (width + 15) * index
}