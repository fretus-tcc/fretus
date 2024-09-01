const socket = io()
socket.emit('connect new user', { id_usuario })

// Recebe mensagem
socket.on('receive message', (data) => {
    changeSidebar(data)
})

function changeSidebar(message) {
    const contact = document.querySelector(`[data-id-conversa="${message.id_conversa}"]`)
    const msg = contact.querySelector('.contact-msg > .msg-text')
    const sent = contact.querySelector('.contact-time > .time-text')

    msg.textContent = message.msg
    sent.textContent = 'há poucos segundos'

    // deixa o contato no topo da sidebar
    contact.style = `order: -1`
}