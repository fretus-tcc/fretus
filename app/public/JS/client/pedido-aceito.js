socket.on('pedido recebido', (data) => {    
    // console.log(data)
    window.location.href = `/cliente/escolher-entregador/${data.id_pedido}`;
});