const form = document.querySelector('form.accept')
const socket = io()

form.addEventListener('submit', (e) => {
    e.preventDefault()
 
    const url = form.action.split('/')
    const resposta = url[url.length - 1] // ultimo elemento do array url
    const id_pedido = url[url.length - 2] // penultimo elemento do array url
        
    // Envia evento de pedido aceito apenas se a resposta for ACEITO
    if (resposta.toUpperCase() == 'ACEITO') {
        socket.emit('pedido aceito', { id_pedido })
    }

    form.submit()
})