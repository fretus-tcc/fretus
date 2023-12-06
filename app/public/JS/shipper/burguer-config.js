const burger = document.querySelector('main .sidebar-burguer')
const container = document.querySelector('main')
const sidebar = document.querySelector('.sidebar')

burger.addEventListener('click', (e) => {
    container.addEventListener('click', closeMenu)
    sidebar.classList.toggle('show')
    if (!sidebar.classList.contains('show')) {
        closeMenu(e)
    }
})

function closeMenu(e) {
    if (!sidebar.contains(e.target) && !burger.contains(e.target)) {
        sidebar.classList.remove('show')
        container.removeEventListener('click', closeMenu)
    }
}

/* e.target != sidebar && !(e.target == burger || e.target == burger.children[0]) */