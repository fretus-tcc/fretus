const fav = document.querySelectorAll('.fav-call')

fav.forEach(item => {
    item.addEventListener('click', showAcceptNotification.bind(null, 'Entregador Favoritado! '))
})