const reportCall = document.querySelectorAll('.report-call')
const reportPopup = document.querySelector('.popup.report')
const closeReport = document.querySelector('.popup.report .close')
const inputs = document.querySelectorAll('.report .field')
const inputFile = document.querySelectorAll('input[type="file"]')
const labelFile = document.querySelectorAll('.file-field .msg')
const reportSubmit = document.querySelector('.report .cta')
// const notificationContainer = document.querySelector('.notification-container')
const reportSelect = document.querySelector('.report select')
const reportReason = document.querySelector('.form .report-reason')
let clicked

reportCall.forEach((item, i) => {
    item.addEventListener('click', () => {
        reportPopup.classList.add('show')
        clicked = i
    })
})

const closeReportPopup = () => {
    reportPopup.classList.remove('show')
    inputs.forEach(input => input.value = '')
    labelFile[0].textContent = 'Foto do Ocorrido'
    reportReason.classList.remove('show')
    reportReason.removeAttribute('required')
}

closeReport.addEventListener('click', () => {
    closeReportPopup()
})

reportSubmit.addEventListener('click', (e) => {
    if (isValid()) { 
        e.preventDefault()
        closeReportPopup()
        showReportNotification('Denúncia Enviada! ')
        reportCall[clicked].remove()
    }
})

inputFile.forEach((input, i) => {
    input.addEventListener('change', () => {
        if (input.files[0]) {
            labelFile[i].textContent = `${input.files[0].name}`
        } else {
            labelFile[i].textContent = `Nenhum arquivo enviado!`
        }
    })
})

reportSelect.addEventListener('change', () => {
    if (reportSelect.value == 'Outros') {
        reportReason.classList.add('show')
        reportReason.setAttribute('required', 'true')
    } else {
        reportReason.classList.remove('show')
        reportReason.removeAttribute('required')
    }
})


function showReportNotification(m) {
    if (document.querySelector('.notification-container').innerHTML != '') {
        document.querySelector('.notification').remove()
    }
    
    document.querySelector('.notification-container').classList.add('show')
    
    const notification = document.createElement('div')
    notification.classList.add('notification')

    const msg = document.createElement('p')
    msg.textContent = m
    
    notification.appendChild(msg)
    const loading = document.createElement('div')
    loading.classList.add('loading')
    notification.appendChild(loading)

    document.querySelector('.notification-container').addEventListener('animationend', () => {
        document.querySelector('.notification-container').classList.remove('show')
    })

    document.querySelector('.notification-container').appendChild(notification)
}

const isValid = () => {
    let valid = true
    inputs.forEach(item => {
        if (item.validity.valid == false) {
            valid = false
        }
    })
    return valid
}