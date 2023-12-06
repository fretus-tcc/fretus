const notificationContainer = document.querySelector('.notification-container')

const showAcceptNotification = (m) => {
    if (notificationContainer.innerHTML != '') {
        document.querySelector('.notification').remove()
    }
    
    notificationContainer.classList.add('show')
    
    const notification = document.createElement('div')
    notification.classList.add('notification')

    const msg = document.createElement('p')
    msg.textContent = m
    
    notification.appendChild(msg)
    const loading = document.createElement('div')
    loading.classList.add('loading')
    notification.appendChild(loading)

    notificationContainer.addEventListener('animationend', () => {
        notificationContainer.classList.remove('show')
    })

    notificationContainer.appendChild(notification)
}