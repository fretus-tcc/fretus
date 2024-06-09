const form = document.querySelector('.form-perfil')
const change = document.querySelectorAll('.changeCall')
const inputContainer = document.querySelectorAll('.input-container')
const input = document.querySelectorAll('.input-container > input.input-field')
const confirmCall = document.querySelectorAll('.input-container > .confirm')

change.forEach((item, i) => {
    item.addEventListener('click', () => {
        const lastValue = input[i].value
        change[i].style.display = 'none'
        inputContainer[i].classList.add('edit')
        input[i].removeAttribute('readonly')
        input[i].focus()
        input[i].setSelectionRange(1000,1000) // seta a posiçao do cursor ao fim
        confirmCall[i].addEventListener('mousedown', update) // é usado o mousedown, pois ele não gera conflito com o blur
        input[i].addEventListener('keydown', isEnterPressed)
        input[i].addEventListener('blur', cancel.bind(null, lastValue, i))
    })

})

const update = (e) => {
    console.log('update');
    form.submit()
}

const isEnterPressed = (e) => {
    if (e.key == 'Enter') update()
}

const cancel = (lastValue, idx) => {
    input[idx].value = lastValue
    inputContainer[idx].classList.remove('edit')
    change[idx].style.display = 'block'
}