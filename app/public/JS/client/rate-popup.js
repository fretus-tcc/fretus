const rate = document.querySelectorAll('.rate')
const popup = document.querySelector('.popup')
const close = document.querySelector('.close')
const stars = document.querySelectorAll('.star')
const submit = document.querySelector('button.cta')
const error = document.querySelector('.popup span')
const cardBottom = document.querySelectorAll('.card .bottom')
const rateField = document.querySelector('.rate-field')
let main = document.querySelector('main')

rate.forEach((item, i) => {
    item.addEventListener('click', () => {
        popup.classList.add('show')
        popup.dataset.shipper = i
    })
})

close.addEventListener('click', closePopup)

stars.forEach((star, i) => {
    star.addEventListener('click', () => {
        removeClass(stars, 'checked')
        addClass(stars, i)
    })
})

submit.addEventListener('click', () => {
    let hasChecked = false
    stars.forEach(star => {
        if (star.classList.contains('checked')) {
            hasChecked = true
        }
    })

    if (hasChecked) {
        error.classList.remove('error')
        rate[popup.dataset.shipper].remove()
        closePopup()
        showModal()
    } else {
        error.classList.add('error')
    }
})

function closePopup() {
    popup.classList.remove('show')
    removeClass(stars, 'checked')
    rateField.value = ''
}

function removeClass(el, className) {
    el.forEach(item => {
        if (item.classList.contains(className)) {
            item.classList.remove(className)
        }
    })
}

function addClass(el, i) {
    for (let j = el.length - 1; j >= i; j--) {
        el[j].classList.add('checked')
    }
}

function showModal() {
    if (main.children.length > 3) {
        main.children[3].remove()
    }
    let modal = document.createElement('div')
    modal.innerHTML = `<p>Avaliação enviada com sucesso!</p>
    <div class="loading"></div>`
    modal.classList.add('modal', 'active')
    main.appendChild(modal)
}