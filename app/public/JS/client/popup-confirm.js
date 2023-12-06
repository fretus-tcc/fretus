const inputStart = document.querySelector('.start')
const inputEnd = document.querySelector('.end')
const weight = document.querySelector('input[name="weight"]')
const vehicle = document.querySelector('input[name="vehicles"]')
const submit = document.querySelector('[type="submit"].cta')
const popup = document.querySelector('.popup')
const formContainer = document.querySelector('main > .form')
const mapContainer = document.querySelector('main > .map')
const backForm = document.querySelector('.return-form')
const close = document.querySelector('.close')
const priceContainer = document.querySelector('.price')

submit.addEventListener('click', e => {
  checkValidation()  
  if (inputStart.validity.valid == true && inputEnd.validity.valid == true && vehicle.validity.valid && weight.validity.valid && checkValidation()) {
        e.preventDefault()
        popup.classList.add('show')
        formContainer.classList.add('mobile')
        mapContainer.classList.add('mobile')
        backForm.classList.add('show')
        map.resize()
        setZoomRoute(route)
        setPrice(route.distance / 1000)
    }
})

const setPrice = distance => {
    const typeVehicle = document.querySelector('input[name="vehicles"]:checked').id // pega o tipo do veiculo
    const f = new Intl.NumberFormat('pt-br', {
        currency: 'BRL',
        style: 'currency'
    }) // classe que transforma qualquer valor em reais
    
    /* fazer os calculos aqui */
    const preco = calcularPreco(distance, typeVehicle);

    
    let price = f.format(preco) // linha que transforma qualquer valor em reais
    priceContainer.textContent = price // coloca o preco no popup
}
    
backForm.addEventListener('click', () => {
    formContainer.classList.toggle('mobile')
})

close.addEventListener('click', () => {
    popup.classList.remove('show')
})


//PREÇOS

//var distancia = (route.distance/1000)
//typeVehicle = document.querySelector('input[name="vehicles"]:checked').id
function calcularPreco(distancia,veiculo) {
    let precoPorKm;

    if (veiculo=== 'bike') {
      precoPorKm = 2;
    } else if (veiculo=== 'car') {
      precoPorKm = 4;
    } else if (veiculo === 'truck') {
      precoPorKm = 15;
    } else if(veiculo === 'van'){
      precoPorKm = 9; 
      
    }
  
    var precoTotal = distancia * precoPorKm;

    return precoTotal;
  }
 
  // DIMENSÃO DO ENTREGA MAIS KILOMETRAGEM

  function valorMinimo(){
    const precoDaRota = calcularPreco(distance, typeVehicle);
    var porcentagem = ( precoDaRota*15)/100
    var precoMinimo= precoDaRota - porcentagem

    return precoMinimo
  }
 
  function valorMaximo(){
    const precoDaRota = calcularPreco(distance, typeVehicle);
    var porcentagem = ( precoDaRota*15)/100
    var precoMaximo= precoDaRota + porcentagem

    return precoMaximo
  }
  