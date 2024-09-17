// const carousel = document.querySelector('.rating-container')
// const feedbacks = document.querySelectorAll('.rating-container .content')
// const next = document.querySelector('.next')
// const back = document.querySelector('.back')
// let index = 0

// next.addEventListener('click', () => {
//     index++
//     moveCarousel(index)
// })

// back.addEventListener('click', () => {
//     index--
//     moveCarousel(index)
// })

// function moveCarousel(i) {
//     if (index < 0) {
//         index = feedbacks.length - 1
//     } else if (index >= feedbacks.length) {
//         index = 0
//     }
//     let width = carousel.clientWidth
//     carousel.scrollLeft = (width + 15) * index
// }

const swiper = new Swiper('.swiper', {
    spaceBetween: 30,

    // Navigation arrows
    navigation: {
        nextEl: '.rating-controls .next',
        prevEl: '.rating-controls .back',
    },
});