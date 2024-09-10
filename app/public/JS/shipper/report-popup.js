const reportCall = document.querySelectorAll('.report-call')
const reportPopup = document.querySelector('.popup.report')
const closeReport = document.querySelector('.popup.report .close')
const reportForm = document.querySelector('.popup.report form.popup-wrapper')
const inputs = document.querySelectorAll('.report .field')
const inputFile = document.querySelectorAll('.popup.report input[type="file"]')
const labelFile = document.querySelectorAll('.file-field .msg')
const reportSubmit = document.querySelector('.report .cta')
const reportSelect = document.querySelector('.report select')
const reportReason = document.querySelector('.report-reason')
const outros_motivos = document.querySelector('.popup.report [name="outros_motivos"]')
const data_ocorrido = document.querySelector('.popup.report [name="data_ocorrido"]')
const descricao_ocorrido = document.querySelector('.popup.report [name="descricao_ocorrido"]')
let clicked

reportCall.forEach((item, i) => {
    item.addEventListener('click', () => {
        reportPopup.classList.add('show')
        reportForm.action = `/cliente/denuncias/${item.dataset.idEntregador}`
        clicked = i
    })
})

closeReport.addEventListener('click', () => {
    closeReportPopup()
})

reportForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    const url = e.target.action

    var formData = formatData()

    const data = await sendDenunciaData(url, formData)
    console.log(data)
    
    if (data.erros != false) {
        return
    }
    
    closeReportPopup()
    reportCall[clicked].remove()
    notify('Denúncia enviada', 'Denúncia enviada com sucesso', 'success')
})

function formatData() {

    const data = {
        // foto_denuncia: null,
        motivo_denuncia: reportSelect.value,
        outros_motivos: outros_motivos.value,
        data_denuncia: data_ocorrido.value,
        descricao_denuncia: descricao_ocorrido.value,
    }

    // let file = inputFile[0].files[0]
    // if (file) {
    //     const reader = new FileReader()
    //     reader.readAsText(file)
    //     reader.onload = () => {
    //         data.foto_denuncia = reader.result
    //         console.log(data.foto_denuncia)
    //     }
    // }

    return data
}

async function sendDenunciaData(url, formData) {
    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        const data = await res.json()

        if (!res.ok) {
            console.log(res)
            return
        }

        return data

    } catch (error) {
        console.log(error)
        return error
    }
}

function closeReportPopup() {
    reportPopup.classList.remove('show')
    inputs.forEach(input => input.value = '')
    // labelFile[0].textContent = 'Foto do Ocorrido (Opcional)'
    reportReason.classList.remove('show')
    reportReason.removeAttribute('required')
}

// Exibir nome do arquivo
inputFile.forEach((input, i) => {
    input.addEventListener('change', () => {
        if (input.files[0]) {
            labelFile[i].textContent = `${input.files[0].name}`
        } else {
            labelFile[i].textContent = `Nenhum arquivo enviado!`
        }
    })
})

// Exibir outro motivo denuncia
reportSelect.addEventListener('change', () => {
    if (reportSelect.value == 'Outros') {
        reportReason.classList.add('show')
        reportReason.setAttribute('required', 'true')
    } else {
        reportReason.classList.remove('show')
        reportReason.removeAttribute('required')
    }
})