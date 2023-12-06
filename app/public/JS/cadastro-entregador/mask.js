$('#tel').mask('(00) 00000-0000')
$('#placa').mask('ZZZ-0A00', {
    translation: {
        'A': {
            pattern: /[a-zA-Z0-9]/
        },
        'Z': {
            pattern: /[a-zA-Z]/
        }
    }
})

const tel = document.querySelector('#tel')
tel.addEventListener('input', () => {
    tel.setCustomValidity('')
    if (tel.value.length < 15) {
        tel.setCustomValidity('Campo Incompleto!')
    }
})

const placa = document.querySelector('#placa')
placa.addEventListener('input', () => {
    placa.setCustomValidity('')
    if (placa.value.length < 8) {
        placa.setCustomValidity('Campo Incompleto!')
    }
})