const vehiclesInput = document.querySelectorAll('input[name="vehicles"]')
const weightInput = document.querySelectorAll('input[name="weight"]')

vehiclesInput.forEach(item => {
    item.addEventListener('change', () => {
        vehiclesInput.forEach(i => i.setCustomValidity(''))
    })
})

const checkValidation = () => {
    const selectWeight = document.querySelector('input[name="weight"]:checked')
    const selectVehicle = document.querySelector('input[name="vehicles"]:checked')

    if ((selectVehicle && selectWeight) && (inputStart.validity.valid == true && inputEnd.validity.valid == true)) {
        if ((selectWeight.id == 'm' && selectVehicle.dataset.index < 1) || (selectWeight.id == 'l' && selectVehicle.dataset.index < 2)) {
            selectVehicle.setCustomValidity('O veículo selecionado não suporta esse tipo de carga')
            return false
        } else {
            selectVehicle.setCustomValidity('')
            return true
        }
    }

}