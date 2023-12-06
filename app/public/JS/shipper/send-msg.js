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
        iconImg.setAttribute('src', 'https://files.axshare.com/gsc/NW3CCE/d7/2e/63/d72e6396c33043df9eca85714bda96d5/images/area_do_cliente__desktop_/u195.svg?pageId=a1cd8bfa-51f9-4251-8edd-b9adceed65b6')
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