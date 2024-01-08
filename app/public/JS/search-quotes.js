const quotes = document.querySelectorAll('.suggestions-options a')
const search = document.querySelector('.search-bar input')

search.addEventListener('focus', () => {
    search.classList.add('border')
    if (!search.value) {
        quotes.forEach(quote => quote.classList.add('show'))
    }
})

search.addEventListener('input', () => {
    const searchText = search.value.toLowerCase()
    quotes.forEach(quote => quote.classList.remove('show'));

    [...quotes].filter(quote => quote.textContent.toLowerCase().includes(searchText))
               .forEach(quote => quote.classList.add('show'))
})

document.addEventListener('click', (e) => {
    if (!search.contains(e.target) && !document.querySelector('.suggestions').contains(e.target)) {
        search.classList.remove('border')
    }
})