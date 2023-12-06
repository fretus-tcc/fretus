const yes = document.querySelectorAll('.yes')
const no = document.querySelectorAll('.no')
const form = document.querySelectorAll('.form')
const container = document.querySelector('.popup-wrapper')
const inputFile = document.querySelectorAll('input[type="file"]')
const labelFile = document.querySelectorAll('.file-field .msg')
let index = 0

yes.forEach((item, i) => {
    item.addEventListener('click', (e) => {
        if (isChecked(i) && index < 2) {
            e.preventDefault()
            removeClass()
            index >= 2 ? index = 2 : index++
            form[index].classList.add('active')
            container.classList.add('scrolling')
            container.addEventListener('scrollend', scrolling)
            container.scrollLeft = (form[index].clientWidth + 7) * index
        }
    })
})
    
no.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault()
        removeClass()
        index <= 0 ? index = 0 : index--
        form[index].classList.add('active')
        container.classList.add('scrolling')
        container.addEventListener('scrollend', scrolling)
        container.scrollLeft = (form[index].clientWidth + 7) * index
    })
})

const scrolling = () => {
    container.classList.remove('scrolling')
    container.removeEventListener('scrollend', scrolling)
}

window.addEventListener('resize', () => {
    container.classList.add('scrolling')
    container.addEventListener('scrollend', scrolling)
    container.scrollLeft = (form[index].clientWidth + 7) * index
})

const removeClass = () => {
    form.forEach(item => {
        item.classList.remove('active')
    })
}

const isChecked = (i) => {
    let valid = true
    Array.from(form[i].elements).forEach(field => {
        if (field.validity.valid == false) {
            valid = false
        }
    })
    return valid
}

inputFile.forEach((input, i) => {
    input.addEventListener('change', () => {
        if (input.files[0]) {
            labelFile[i].textContent = `${input.files[0].name}`
        } else {
            labelFile[i].textContent = `Nenhum arquivo enviado!`
        }
    })
})