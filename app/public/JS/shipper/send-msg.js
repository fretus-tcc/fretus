const send = document.querySelector('.send')
const chat = document.querySelector('.msgs-content')
const chatContainer = document.querySelector('.chat-msgs')

send.addEventListener('click', sendMsg)

textarea.addEventListener('keydown', e => {
    if (e.key == 'Enter') {
        e.preventDefault()
        sendMsg()
    }
})

function sendMsg() {
    let msg = DOMPurify.sanitize(textarea.value)
    if (msg != '') {
        const newRow = document.createElement('div')
        newRow.classList.add('row', 'my-msg')
        chat.appendChild(newRow)

        const userIcon = document.createElement('div')
        userIcon.classList.add('user-icon', 'rounded-icon')
        newRow.appendChild(userIcon)

        const iconImg = document.createElement('img')
        iconImg.setAttribute('src', '/imgs/client/user-icon.svg')
        userIcon.appendChild(iconImg)
        
        const msgContainer = document.createElement('div')
        msgContainer.classList.add('msg')
        newRow.appendChild(msgContainer)

        const msgContent = document.createElement('p')
        msgContent.textContent = msg
        msgContainer.appendChild(msgContent)

        textarea.value = ''
        textarea.style = `height: 24px;`
        chatContainer.scrollTop = chatContainer.scrollHeight
    }
}