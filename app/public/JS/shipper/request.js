const container = document.querySelector('.requests-container')
const cards = document.querySelectorAll('.card')
const btns = document.querySelectorAll('.card .btn')
// const notificationContainer = document.querySelector('.notification-container')

btns.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
        const removed = cards[parseInt(idx / 2)]
        removed.remove()
        showNotification(removed, parseInt(idx / 2), btn.classList.contains('accept') ? 'Entrega Aceita! ' : 'Entrega Negada! ')
    })
})

function showNotification(r, i, m) {
    if (notificationContainer.innerHTML != '') {
        document.querySelector('.notification').remove()
    }
    
    notificationContainer.classList.add('show')
    
    const notification = document.createElement('div')
    notification.classList.add('notification')

    const msg = document.createElement('p')
    msg.textContent = m
    const undo = document.createElement('span')
    undo.textContent = 'Desfazer'
    msg.appendChild(undo)
    notification.appendChild(msg)
    const loading = document.createElement('div')
    loading.classList.add('loading')
    notification.appendChild(loading)

    undo.addEventListener('click', () => {
        const position = container.children[i]
        container.insertBefore(r, position)
        notificationContainer.classList.remove('show')
    })

    notificationContainer.addEventListener('animationend', () => {
        notificationContainer.classList.remove('show')
    })

    notificationContainer.appendChild(notification)
}