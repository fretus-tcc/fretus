const editar = document.querySelectorAll('.editar')
const form = document.querySelectorAll('.formEdite')

editar.forEach((item, i) => {
    item.addEventListener('click', (e) => {
        e.preventDefault()
        if (confirm('Tem certeza que deseja Editar?')) {
            form[i].submit()
        }
    })
}) 

