const container = document.querySelector('.carousel .content')
const unfav = document.querySelectorAll('.unfav-call')
const fav = document.querySelectorAll('.fav-call')
let shippers = document.querySelectorAll('.carousel .products')
// const notificationContainer = document.querySelector('.notification-container')
const names = ['Davi', 'Samuel', 'Gabriel', 'Gustavo']

fav.forEach((item, i) => {
    item.addEventListener('click', () => {
        const add = document.createElement('div')
        addShipper(add, item, i)
        showNotification(add, 0, 'Entregador Favoritado! ')
    })
})

const addShipper = (add, item, i) => {
    add.classList.add('products')
    add.innerHTML = `<img src="../../imgs/historico/${i + 6}.jpg" alt="" class="photo">
                            <h1>${names[i]}</h1>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>`
        
    const act = document.createElement('div')
    act.classList.add('actions')
    const unfavEl = document.createElement('img')
    unfavEl.setAttribute('src', '../../imgs/client/unfav-icon.svg')
    unfavEl.classList.add('unfav-call')
    unfavEl.addEventListener('click', () => {
        shippers = document.querySelectorAll('.carousel .products')
        let idx = Array.from(shippers).indexOf(add)
        const removed = shippers[idx]
        removed.remove()
        index[0]--
        items = document.querySelectorAll('.content > .products')
        showNotification(removed, idx, 'Entregador Desfavoritado! ')
    })

    const chatEl = document.createElement('a')
    chatEl.href = './chat.html'
    chatEl.innerHTML = `<img src="../../imgs/home/client/card-icon-2.svg">`

    act.appendChild(unfavEl)
    act.appendChild(chatEl)
    add.appendChild(act)

    container.insertBefore(add, content[0].children[0])
    items = document.querySelectorAll('.content > .products')
    item.remove()
}

unfav.forEach((item, idx) => {
    item.addEventListener('click', () => {
        const removed = shippers[idx]
        removed.remove()
        index[0]--
        items = document.querySelectorAll('.content > .products')
        showNotification(removed, idx, 'Entregador Desfavoritado! ')
    })
})

function showNotification(r, i, m) {
    if (document.querySelector('.notification-container').innerHTML != '') {
        document.querySelector('.notification').remove()
    }
    
    document.querySelector('.notification-container').classList.add('show')
    
    const notification = document.createElement('div')
    notification.classList.add('notification')

    const msg = document.createElement('p')
    msg.textContent = m

    if (m == 'Entregador Desfavoritado! ') {
        const undo = document.createElement('span')
        undo.textContent = 'Desfazer'

        undo.addEventListener('click', () => {
            const position = container.children[i]
            container.insertBefore(r, position)
            document.querySelector('.notification-container').classList.remove('show')
            items = document.querySelectorAll('.content > .products')
        })
        msg.appendChild(undo)
    }
    
    notification.appendChild(msg)
    const loading = document.createElement('div')
    loading.classList.add('loading')
    notification.appendChild(loading)

    document.querySelector('.notification-container').addEventListener('animationend', () => {
        document.querySelector('.notification-container').classList.remove('show')
    })

    document.querySelector('.notification-container').appendChild(notification)
}