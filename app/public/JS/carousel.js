const switchBtn = document.querySelectorAll('.switch > input')
let carousel = document.querySelector('.client .carousel')
let controls = document.querySelectorAll('.client .controls > input')
let index

addEvent(controls)

switchBtn.forEach(item => {
    item.addEventListener('change', () => {
        controls = document.querySelectorAll(`.${item.id} .controls > input`)
        addEvent(controls)
        carousel = document.querySelector(`.${item.id} .carousel`)
    })
})

function addEvent(controls) {
    controls.forEach(item => {
        item.addEventListener('click', (e) => {
            index = Number(e.target.dataset.index)
            move(index)
        })
    })
}

function move(i) {
    if (i < 0) {
        index = 2
    } else if (i > 2) {
        index = 0
    }
    carousel.scrollLeft = carousel.clientWidth * index
}