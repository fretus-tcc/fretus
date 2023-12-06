const cuponCall = document.querySelector('.action > span')
const cuponNum = document.querySelector('.card-cupon .money')
const cuponPopup = document.querySelector('.popup.cupon')
const cuponClose = document.querySelector('.popup.cupon .close')

const showCuponPopup = () => {
    cuponPopup.classList.add('show')
}

const changeInfo = () => {
    cuponCall.textContent = 'Consultar'
    cuponNum.textContent = '1 Cupom'
    showAcceptNotification('Cupom Ativado!')
    cuponCall.removeEventListener('click', changeInfo)
    cuponCall.addEventListener('click', showCuponPopup)
}

cuponCall.addEventListener('click', changeInfo)

cuponClose.addEventListener('click', () => cuponPopup.classList.remove('show'))

var ctx = document.querySelector('.chart-cupon').getContext('2d')

var cuponsData = {
    labels: ['Dom' ,'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
    datasets: [{
        label: 'Cupom Usado no dia',
        // data: [0, 0, 0, 0, 0, 0, 0],
        data: [12, 8, 15, 10, 20, 18, 17],
        backgroundColor: 'rgba(239, 150, 82, 1)',
        borderColor: 'rgba(239, 150, 82, 1)',
        borderWidth: 1
    }]
}

var options = {
    scales: {
        y: {
            beginAtZero: false
        }
    }
}

var cuponsChart = new Chart(ctx, {
    type: 'line',
    data: cuponsData,
    options: options
})