const quotes = document.querySelectorAll('.suggestions-options a')
const search = document.querySelector('.search-bar input')

search.addEventListener('focus', () => {
    console.log(1);
    quotes.forEach(quote => quote.classList.add('show'))
})

search.addEventListener('input', () => {
    search.classList.add('border')
    const searchText = search.value.toLowerCase()
    quotes.forEach(quote => quote.classList.remove('show'));

    [...quotes].filter(quote => quote.textContent.toLowerCase().includes(searchText)).forEach(item => {
        item.classList.add('show')
    })
})

document.addEventListener('click', (e) => {
    if (!search.contains(e.target) && !document.querySelector('.suggestions').contains(e.target)) {
        search.classList.remove('border')
    }
})