/* const textarea = document.querySelectorAll('textarea')
const count = document.querySelector('.count')

textarea.forEach((item, i) => {
    item.addEventListener('input', resize)
    count.innerText = `${textarea[0].value.length}/200`
})

window.addEventListener('resize', resize)

function resize(e) {
    textarea.forEach(item => {
        item.style = `height: 48px;`
        let height = item.scrollHeight
        let value = textarea[0].value
        item.style = `height: ${height}px;`
        count.innerText = `${value.length}/200`
        count.style = 'color: #333;'
        if (value.length >= 199) {
            textarea[0].value = textarea[0].value.substring(0, 200)
            count.style = 'color: red;'
            return
        }
    })
} */