const nav = document.querySelector('nav')
const resizeButton = document.querySelector('.footer > .row:nth-child(2)')
const showBtn = document.querySelector('#show')
const sidebarMenu = document.querySelector('.sidebar')

resizeButton.addEventListener('click', () => {
    nav.classList.toggle('resized')
})

showBtn.addEventListener('click', () => {
    sidebarMenu.classList.toggle('active')
})