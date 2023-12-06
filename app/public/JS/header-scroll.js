const header = document.querySelector('header')
const limit = document.children[0].scrollHeight / 2 - 250
let lastScroll = 0

window.addEventListener('scroll', () => {
    const scrollHeight = window.scrollY
        
    if (scrollHeight == 0) {
        header.classList.remove('resized')
    } else if (scrollHeight <= limit) {
        header.classList.add('resized')
        header.classList.remove('hide')
    } else {
        header.classList.add('hide')
        if (scrollHeight < lastScroll) {
            header.classList.add('resized')
            header.classList.remove('hide')
        }
    }

    lastScroll = scrollHeight
})