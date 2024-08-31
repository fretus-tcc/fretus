const send = document.querySelector('.send')
const chat = document.querySelector('.msgs-content')
const chatContainer = document.querySelector('.chat-msgs')

const socket = io()
socket.emit('connect new user', { id_usuario })

scrollBottom()
send.addEventListener('click', sendMsg)

textarea.addEventListener('keydown', e => {
    if (e.key == 'Enter') {
        e.preventDefault()
        sendMsg()
    }
})

// Envia mensagem
function sendMsg() {
    let msg = DOMPurify.sanitize(textarea.value)
    if (msg != '') {
        createMsg(msg, 'my-msg')
        scrollBottom()
        textarea.value = ''
        textarea.style = 'height: 24px;'

        socket.emit('chat message', { id_conversa, id_usuario, id_destinatario, msg })
    }
}

// Recebe mensagem
socket.on('receive message', (data) => {
    // Verifica se a mensagem pertence a conversa
    if (data.id_conversa == id_conversa) {
        createMsg(data.mensagem, 'other-msg')
        scrollBottom()
    }
})

function createMsg(msg, className) {
    const newRow = document.createElement('div')
    newRow.classList.add('row', className)
    chat.appendChild(newRow)

    /* const userIcon = document.createElement('div')
    userIcon.classList.add('user-icon', 'rounded-icon')
    newRow.appendChild(userIcon) */

    /* const iconImg = document.createElement('img')
    iconImg.setAttribute('src', '/imgs/client/user-icon.svg')
    userIcon.appendChild(iconImg) */
    
    const msgContainer = document.createElement('div')
    msgContainer.classList.add('msg')
    newRow.appendChild(msgContainer)

    const msgContent = document.createElement('p')
    msgContent.textContent = msg
    msgContainer.appendChild(msgContent)
}

function scrollBottom() {
    chatContainer.scrollTop = chatContainer.scrollHeight
}