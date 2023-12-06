const toggle = document.querySelectorAll('.switch > input[name="change"]')
const span = document.querySelector('.switch > span')
const section = document.querySelectorAll('main > *')

toggle.forEach((item, i, arr) => {
    item.addEventListener('click', () => {
        span.style = `transform: translateX(${span.clientWidth * i}px)`
        removeClassOfSection()
        document.querySelector(`.${arr[i].id}`).classList.add('show')
    })
})

function removeClassOfSection() {
    section.forEach(item => {
        if (item.classList.contains('show')) {
            item.classList.remove('show')
        }
    })
}