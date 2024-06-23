const form = document.querySelectorAll('.form-perfil')
const change = document.querySelectorAll('.changeCall')
const inputContainer = document.querySelectorAll('.input-container')
const input = document.querySelectorAll('.input-container > .input-field')
const confirmCall = document.querySelectorAll('.input-container > .confirm')
const select = document.querySelector('.select-field')
const nasc = document.querySelector('#nasc')
const toggle = document.querySelector('#status')

if (!noPermission) {
    change.forEach((item, i) => {
        item.addEventListener('click', () => {
            const lastValue = input[i].value
            change[i].style.display = 'none'
            inputContainer[i].classList.add('edit')
            input[i].removeAttribute('readonly')
            input[i].focus()
            if (input[i].id != 'nasc') {
                input[i].setSelectionRange(1000,1000) // seta a posiçao do cursor ao fim, apenas se não for um input de data
            }
            const formIndex = [...form].findIndex((item) => item == input[i].form)
            confirmCall[i].addEventListener('mousedown', update.bind(null, formIndex)) // é usado o mousedown, pois ele não gera conflito com o blur
            input[i].addEventListener('keydown', isEnterPressed)
            input[i].addEventListener('blur', cancel.bind(null, lastValue, i))
        })
    
    })
    
    select?.addEventListener('change', () => {
        if (noPermission) return
        select.form.submit()
    })

    toggle?.addEventListener('click', () => {
        // 1 == false, 2 == true
        const checked = toggle.value == '2' ? '1' : '2'
        console.log(checked);
        toggle.value = checked
        const formIndex = [...form].indexOf(toggle.form)
        update(formIndex)
    })
    
    const update = (i) => {
        console.log('update');
        if (noPermission) return
        form[i].submit()
    }
    
    const isEnterPressed = (e) => {
        if (e.key == 'Enter') {
            e.preventDefault()
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
} else {
    form.forEach(item => item.removeAttribute('action')) // removendo action, nos perfis que não possuirem autorizacao
}