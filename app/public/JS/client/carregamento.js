const continueButton = document.getElementById('continue-button');
const loaderContainer = document.getElementById('loader-container');
const form = document.querySelector('.form-container')

continueButton.addEventListener('click', (e) => {
    
    form.submit()

    /* document.querySelector('.popup').style.display = 'none';

    loaderContainer.style.display = 'flex';

    setTimeout(() => {

        window.location.href = '/cliente/escolher-entregador';
    }, 4000); */
});

