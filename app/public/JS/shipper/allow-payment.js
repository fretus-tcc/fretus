const accept = document.querySelectorAll('.msg.payment .yes')
const deny = document.querySelectorAll('.msg.payment .no')

accept.forEach((item, i) => {
    item.addEventListener('click', () => {
        deny[i].remove()
        item.innerText = 'Clique aqui para pagar'
    })
})

deny.forEach((item, i) => {
    item.addEventListener('click', () => {
        accept[i].remove()
        item.innerText = 'Proposta Negada!'
    })
})