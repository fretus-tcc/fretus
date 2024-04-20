const accept = document.querySelectorAll('.msg.payment .yes')
const deny = document.querySelectorAll('.msg.payment .no')

accept.forEach((item, i) => {
    item.addEventListener('click', (e) => {
        e.preventDefault()
        deny[i].remove()
        item.innerText = 'Entrega confirmada'
        setTimeout(() => item.form.submit(), 1000)
    })
})

deny.forEach((item, i) => {
    item.addEventListener('click', (e) => {
        e.preventDefault()
        accept[i].remove()
        item.innerText = 'Entrega Negada!'
    })
})