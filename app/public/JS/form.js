const cep = document.querySelector('input#cep')
const estados = document.querySelector('select#estado')
const cidade = document.querySelector('input#cidade')

window.addEventListener('load', async () => {
    const url = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados/'
    const res = await fetch(url)
    const dataRes = await res.json()
    dataRes.forEach(estado => {
        estados.innerHTML += `<option>${estado.sigla}</option>`
    })
})

cep.addEventListener('input', async () => {
    let validate = /^[0-9]{8}$/
    if (validate.test(cep.value)) {
        const url = `https://viacep.com.br/ws/${cep.value}/json/`
        const res = await fetch(url)
        const dataRes = await res.json()
        if (dataRes.erro) {
            cep.classList.add('error')
        } else {
            cep.classList.remove('error')
            estados.value = dataRes.uf
            cidade.value = dataRes.localidade
        }
    } else {
        cep.classList.add('error')
    }
})