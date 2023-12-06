const burguer = document.querySelectorAll('.burguer')
const menu = document.querySelector('.menu-burguer')

burguer.forEach(item => {
    item.addEventListener('click', () => {
        menu.classList.toggle('active')
    })
})