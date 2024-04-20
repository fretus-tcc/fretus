const pay = document.querySelector('.pay')
const payModal = document.querySelector('.pay-modal')
const yes = document.querySelector('.modal-content .yes')
const no = document.querySelector('.modal-content .no')
const input = document.querySelector('.modal-content .money')

new Cleave('.money', {
    prefix: 'R$',
    numericOnly: true,
    numeralPositiveOnly: true,
});

pay.addEventListener('click', () => {
    payModal.showModal()
})

yes.addEventListener('click', () => {
    const f = new Intl.NumberFormat('pt-br', {
        currency: 'BRL',
        style: 'currency'
    })
    let price = input.value.slice(2)
    if (price != '') {
        payModal.close()
        let msgPayment = document.createElement('div')
        msgPayment.classList.add('row', 'my-msg')
        msgPayment.innerHTML += `<div class="user-icon rounded-icon">
                                    <img src="/imgs/client/user-icon.svg" alt="">
                                </div>
                                <div class="msg payment">
                                    <h1>Você enviou uma proposta!</h1>
                                    <span>${f.format(price)}</span>
                                    <div class="btn-container">
                                        <button class="no" onclick="this.parentElement.parentElement.parentElement.remove()">Cancelar proposta</button>
                                    </div>
                                </div>`
        chat.appendChild(msgPayment)
        chatContainer.scrollTop = chatContainer.scrollHeight
        input.value = ''
        new Cleave('.money', {
            prefix: 'R$',
            numericOnly: true,
            numeralPositiveOnly: true,
        });
    }
})

no.addEventListener('click', () => {
    payModal.close()
})