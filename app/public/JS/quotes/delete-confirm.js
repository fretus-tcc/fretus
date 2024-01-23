const del = document.querySelectorAll('.delete')
const form = document.querySelectorAll('.delete-form')

del.forEach((item, i) => {
    item.addEventListener('click', (e) => {
        e.preventDefault()
        if (confirm('Tem certeza que deseja deletar?')) {
            form[i].submit()
        }
    })
})