const cards = Array.from(document.querySelectorAll('.vehicle-row > .card'))
const cardsDescription = Array.from(document.querySelectorAll('.vehicle-description > .card-description'))

cards.forEach(item => {
    item.addEventListener('click', () => {
        let index = cards.indexOf(item)
        remove(cardsDescription)
        remove(cards)
        item.classList.add('show')
        cardsDescription[index].classList.add('show')
    })
})

function remove(element) {
    element.forEach(item => {
        if (item.classList.contains('show')) {
            item.classList.remove('show')
        }
    })
}