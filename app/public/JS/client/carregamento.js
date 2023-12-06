const continueButton = document.getElementById('continue-button');
const loaderContainer = document.getElementById('loader-container');

continueButton.addEventListener('click', () => {

    document.querySelector('.popup').style.display = 'none';

    loaderContainer.style.display = 'flex';

    setTimeout(() => {

        window.location.href = './escolher-entregador.html';
    }, 4000);
});

