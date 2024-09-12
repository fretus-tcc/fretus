const paste = document.querySelector('.paste-cupon')
const cuponInput = document.querySelector('.paste-input')

paste.addEventListener('click', () => {

    navigator.clipboard.writeText(cuponInput.value)
        .then(() => {
            notify('Cupom copiado', 'Cupom copiado com sucesso', 'success')
        })
        
})