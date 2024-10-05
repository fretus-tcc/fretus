const loader = document.querySelector('.loader-container')
const closeLoader = document.querySelector('.loader-container .close')

closeLoader.addEventListener('click', () => {
    window.location.href = `/cliente/solicitar-entrega`
})

socket.on('pedido recebido', (data) => {
    // console.log(data)
    setTimeout(() => {
        if (data.agendamento == 0) {
            window.location.href = `/cliente/pagamento/${data.id_pedido}`
        } else {
            window.location.href = `/cliente/escolher-entregador/${data.id_pedido}`
        }
    }, 2000)
})