const carousel = Array.from(document.querySelectorAll('.carousel'))
const content = document.querySelectorAll('.content')
let items = document.querySelectorAll('.content > .products')
const controls = document.querySelectorAll('.controls > *')
let index = carousel.map(() => 0)

let acts = {
    next(idx) {
        index[idx]++
    },
    prev(idx) {
        index[idx]--
    }
}

controls.forEach((item, i) => {
    item.addEventListener('click', (e) => {
        let idx = parseInt(i / 2)
        acts[item.id](idx)
        changeState(idx)
    })
})

function changeState(idx) {
    let width = carousel[idx].clientWidth
    let visibleItems = Math.floor(width / (items[0].clientWidth))
    let clicks = (items.length / carousel.length) - visibleItems
    if (index[idx] > clicks) {
        index[idx] = 0
    } else if (index[idx] < 0) {
        index[idx] = clicks
    }
    // console.log(index[idx])
    carousel[idx].scrollLeft = (items[0].clientWidth + 10) * index[idx]
}