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
            if (index == 2) {
                const stepFields = [...form[index].children[1].children]
                const fieldErrors = stepFields.filter((item) => item.classList.contains('show'))
                if (fieldErrors.length >= 2) {
                    form[index].classList.add('translate')
                }
                console.log(fieldErrors);
                // container.scrollLeft = 1080
            }
            console.log((form[index].clientWidth + 7) * index)
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
        item.classList.remove('translate')
    })
}

const isChecked = (i) => {
    let valid = true
    const allFields = document.querySelector('.popup-wrapper').elements
    // console.log(allFields);
    const currentFields = [...allFields].filter((field) => field.offsetParent == form[i])
    // console.log(currentFields);
    currentFields.forEach(field => {
        if (field.validity.valid == false) {
            valid = false
        }
    })
    return valid
}

const goTo = (firstError) => {
    const errorContainer = document.querySelector(`[name="${firstError}"]`).offsetParent
    const containerIndex = [...form].findIndex((item) => item == errorContainer)

    index = containerIndex
    console.log('index goTo()', index)
    removeClass()
    form[index].classList.add('active')

    /* container.classList.add('scrolling')
    container.addEventListener('scrollend', scrolling) */

    container.style = 'scroll-behavior: auto;'
    form[index].style = containerIndex != 0 ? 'transition: none;' : ''
    container.scrollLeft = (form[index].clientWidth + 7) * index
    container.style = 'scroll-behavior: smooth;'
    container.addEventListener('scrollend', () => {
        form[index].style = 'transition: max-height .7s;'
        /* container.style = 'scroll-behavior: smooth;' */
    })
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