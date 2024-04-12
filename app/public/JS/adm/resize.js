const nav = document.querySelector('nav')
const resizeButton = document.querySelector('.footer > .row:nth-child(2)')

resizeButton.addEventListener('click', () => {
    nav.classList.toggle('resized')
})