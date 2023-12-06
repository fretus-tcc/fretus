const payCall = document.querySelectorAll('.pay-call')
const payPopup = document.querySelector('.popup')
const close = document.querySelector('.popup .close')
const inputField = document.querySelectorAll('.input-field:not([readonly])')
const img = document.querySelector('.card-input img')
const payRadio = document.querySelectorAll('.field input[name="pay-method"]')
const cardInput = document.querySelectorAll('.card-info')
let min = [14, 5, 3]

payCall.forEach(item => {
    item.addEventListener('click', () => {
        payPopup.classList.add('show')
    })
})

close.addEventListener('click', () => {
    inputField.forEach(input => input.value = '')
    payPopup.classList.remove('show')
})

payRadio.forEach(item => {
    item.addEventListener('change', () => {
        if (item.id == 'card') {
            cardInput.forEach(item => item.setAttribute('required', 'true'))
        } else {
            cardInput.forEach(item => {
                item.removeAttribute('required')
                item.setCustomValidity('')
            })
        }
    })
})

cardInput.forEach((item, i) => {
    item.addEventListener('input', () => {
        let len = item.value.length
        if (item.id != 'card-name') {
            item.setCustomValidity('Valor inválido!')
        }
        if (len >= min[i]) {
            item.setCustomValidity('')
        }
    })
})

new Cleave('#card-number', {
    creditCard: true,
    onCreditCardTypeChanged: (type) => img.setAttribute('src', `../../imgs/client/card-icons/${type}.svg`)
})

new Cleave('#card-validity', {
    date: true,
    datePattern: ['m', 'y']
})

new Cleave('#card-cvv', {
    blocks: [3],
    numericOnly: true
})