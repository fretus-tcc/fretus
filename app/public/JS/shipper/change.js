const form = document.querySelectorAll('.form-perfil')
const change = document.querySelectorAll('.changeCall')
const inputContainer = document.querySelectorAll('.input-container')
const input = document.querySelectorAll('.input-container > .input-field')
const confirmCall = document.querySelectorAll('.input-container > .confirm')
const select = document.querySelector('.select-field')

change.forEach((item, i) => {
    item.addEventListener('click', () => {
        const lastValue = input[i].value
        change[i].style.display = 'none'
        inputContainer[i].classList.add('edit')
        input[i].removeAttribute('readonly')
        input[i].focus()
        input[i].setSelectionRange(1000,1000) // seta a posiçao do cursor ao fim
        const formIndex = [...form].findIndex((item) => item == input[i].form)
        confirmCall[i].addEventListener('mousedown', update.bind(null, formIndex)) // é usado o mousedown, pois ele não gera conflito com o blur
        input[i].addEventListener('keydown', isEnterPressed)
        input[i].addEventListener('blur', cancel.bind(null, lastValue, i))
    })

})

select?.addEventListener('change', () => {
    select.form.submit()
})

const update = (i) => {
    console.log('update');
    form[i].submit()
}

const isEnterPressed = (e) => {
    if (e.key == 'Enter') {
        const formIndex = [...form].findIndex((item) => item == e.target.form)
        update(formIndex)
    }
}

const cancel = (lastValue, idx) => {
    input[idx].value = lastValue
    input[idx].setAttribute('readonly', 'true')
    inputContainer[idx].classList.remove('edit')
    change[idx].style.display = 'block'
}