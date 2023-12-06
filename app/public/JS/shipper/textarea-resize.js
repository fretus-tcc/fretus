const textarea = document.querySelector('textarea')

textarea.addEventListener('input', resize)

function resize() {
    textarea.style = `height: 24px;`
    let height = textarea.scrollHeight
    textarea.style = `height: ${height}px;`
    if (height > 100) {
        textarea.style = `height: 120px;`
    }
}