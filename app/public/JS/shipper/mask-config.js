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