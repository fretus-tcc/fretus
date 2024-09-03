const loader = document.querySelector('.loader-container')
const closeLoader = document.querySelector('.loader-container .close')

closeLoader.addEventListener('click', () => {
    window.location.href = `/cliente/solicitar-entrega`
})

socket.on('pedido recebido', (data) => {    
    window.location.href = `/cliente/escolher-entregador/${data.id_pedido}`
})