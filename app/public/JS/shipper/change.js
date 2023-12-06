const change = document.querySelectorAll('.edit-row span')
const main = document.querySelector('main')
let changed
let cancel
let input
let inputContainer
let inputValue

change.forEach(item => {
    item.addEventListener('click', () => {
        changed = item
        changed.style = 'display: none;'
        inputContainer = item.previousElementSibling
        cancel = inputContainer.children[1]
        input = inputContainer.firstElementChild
        inputValue = input.value
        input.removeAttribute('readonly')
        if (input.id == 'password') {
            input.type = 'text'
        }
        inputContainer.classList.add('edit')
        input.focus()
        input.addEventListener('blur', resetInput)
        input.addEventListener('keydown', isEnterPressed)
        cancel.addEventListener('mousedown', () => {
            input.value = inputValue
        })
    })
})

function isEnterPressed(e) {
    if (e.key == 'Enter') resetInput()
}

function resetInput() {
    if (input.value == '') { 
        showModal('ERRO: Campo não preenchido')
        input.value = inputValue
    } else if (input.value != inputValue) {
        showModal('Alteração realizada com sucesso!')
    }
    changed.style = 'display: block;'
    input.setAttribute('readonly', 'true')
    if (input.id == 'password') {
        input.type = 'password'
    }
    inputContainer.classList.remove('edit')
    removeEvents()
}

function showModal(msg) {
    if (main.childElementCount > 2) {
        main.children[2].remove()
    }
    let modal = document.createElement('div')
    modal.innerHTML = `<p>${msg}</p>
                       <div class="loading"></div>`
    modal.classList.add('modal', 'active')
    main.appendChild(modal)
}

function removeEvents() {
    input.removeEventListener('blur', resetInput)
    input.removeEventListener('keydown', isEnterPressed)
}