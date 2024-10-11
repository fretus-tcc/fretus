const notifyCall = document.querySelectorAll('.notify-call')
const notifyPopup = document.querySelector('.notify')
const notifyForm = document.querySelector('.notify .notify-form')
const close = document.querySelector('.notify .close')
const inputs = document.querySelectorAll('.notify .field')
const errors = document.querySelectorAll('.notify .error')

notifyCall.forEach(item => {
    item.addEventListener('click', () => {
        notifyPopup.classList.add('show')
        notifyForm.action = `/entregador/panel/impeditivo/${item.dataset.idPedido}`
    })
})

notifyForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const url = e.target.action
    const formData = { 
        motivo_impeditivo: inputs[0].value,
        descricao_impeditivo: inputs[1].value,
    }
    const data = await sendNotifyData(url, formData)
    console.log(url, formData, data)
    
    clearError()
    if (data.erros != false) {
        data.erros.forEach(erro => {
            // console.log(erro)
            notify('Algo deu errado', erro.msg, 'error')
            if (erro.path != 'id_pedido') {
                const element = document.querySelector(`.error.${erro.path}`)
                element.textContent = erro.msg
                element.classList.add('show')
            }
        })
        return
    }
    
    closeNotifyPopup()
    notify('Impeditivo enviado', 'Impeditivo enviado com sucesso', 'success')
})

async function sendNotifyData(url, formData) {
    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        const data = await res.json()
        if (!res.ok) {
            console.log(res)
            return
        }
        return data
    } catch (error) {
        console.log(error)
        return error
    }
}

close.addEventListener('click', closeNotifyPopup)

function closeNotifyPopup() {
    notifyPopup.classList.remove('show')
    inputs.forEach(input => input.value = '')
    clearError()
}

function clearError() {
    errors.forEach(error => {
        error.textContent = ''
        error.classList.remove('show')
    })
}