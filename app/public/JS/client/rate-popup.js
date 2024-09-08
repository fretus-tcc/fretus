const rate = document.querySelectorAll('.rate-call')
const popup = document.querySelector('.popup.rate')
const close = document.querySelector('.popup.rate .close')
const form = document.querySelector('.popup.rate form')
const rateField = document.querySelector('.popup.rate .rate-field')
const errorMsg = document.querySelector('.popup.rate .error-container')
let idPedido

rate.forEach((item, i) => {
    item.addEventListener('click', () => {
        popup.classList.add('show')
        form.action = `/cliente/avaliacoes/${item.dataset.idPedido}`
        idPedido = item.dataset.idPedido
    })
})

close.addEventListener('click', () => closePopup())

form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const url = e.target.action
    const avaliacao = rateField.value

    const data = await sendData(url, avaliacao)
    
    if (data.erros != false) {
        errorMsg.classList.add('show')
        rateField.classList.add('error')
        errorMsg.textContent = data.erros.avaliacao.msg
        notify('Algo deu errado', data.erros.avaliacao.msg, 'error')
        return
    }

    closePopup()
    notify('Avaliação enviada', 'Avaliação enviada com sucesso', 'success')
    const removeRate = [...rate].find(item => item.dataset.idPedido == idPedido)
    removeRate.remove()
})

function closePopup() {
    popup.classList.remove('show')
    errorMsg.classList.remove('show')
    rateField.classList.remove('error')
    errorMsg.textContent = ''
    rateField.value = ''
}

async function sendData(url, avaliacao) {
    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ avaliacao })
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