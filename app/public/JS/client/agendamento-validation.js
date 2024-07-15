const toggle = document.querySelector('[name="agendamento"]')
const inputsSchedule = document.querySelectorAll('.date-time')

toggle.addEventListener('change', () => {
    inputsSchedule.forEach(item => {
        item.setAttribute('required', 'true')
        if (!toggle.checked) {
            item.removeAttribute('required')
        }
    })
})