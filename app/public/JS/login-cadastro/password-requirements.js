const password = document.querySelector('.input__field')
const requirements = document.querySelectorAll('.requirements-item')

const rules = [
    { regex: /.{8,}/, index: 0 }, // 8 caracteres
    { regex: /[A-Za-z]/, index: 1 }, // 1 letra
    { regex: /[0-9]/, index: 2 }, // 1 numero
    { regex: /[^A-Za-z0-9]/, index: 3 }, // 1 caractere especial
]

const checkPassword = () => {
    rules.forEach(rule => {
        const isValid = rule.regex.test(password.value)
        const validRequirement = requirements[rule.index]

        if (isValid) {
            validRequirement.firstElementChild.className = 'fa-solid fa-check'
            validRequirement.classList.add('active')
        } else {
            validRequirement.firstElementChild.className = 'fa-solid fa-circle'
            validRequirement.classList.remove('active')
        }
    })
}

// Checa a senha ao iniciar a página
checkPassword()

// Checa a senha ao digitar no input
password.addEventListener('input', checkPassword)