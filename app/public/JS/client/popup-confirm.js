const inputStart = document.querySelector('.start')
const inputEnd = document.querySelector('.end')
const inputDate = document.querySelector('input[name="data_agendamento"]')
const inputTime = document.querySelector('input[name="hora_agendamento"]')
const weight = document.querySelector('input[name="carga"]')
const vehicle = document.querySelector('input[name="veiculo"]')
const submit = document.querySelector('[type="submit"].cta')
const popup = document.querySelector('.popup')
const formContainer = document.querySelector('main > .form')
const mapContainer = document.querySelector('main > .map')
const backForm = document.querySelector('.return-form')
const close = document.querySelector('.close')
const priceContainer = document.querySelector('.price')

submit.addEventListener('click', (e) => {
  checkValidation()
  if (inputStart.validity.valid == true &&
      inputEnd.validity.valid == true &&
      inputDate.validity.valid == true &&
      inputTime.validity.valid == true &&
      vehicle.validity.valid &&
      weight.validity.valid &&
      checkValidation()) {
        e.preventDefault()
        formContainer.classList.add('mobile')
        mapContainer.classList.add('mobile')
        backForm.classList.add('show')
        map.resize()
        setZoomRoute(route)
        setPrice(route.distance / 1000)
        popup.classList.add('show')
    }
})

const setPrice = async (distance) => {
    const typeVehicle = document.querySelector('input[name="veiculo"]:checked').value // pega o tipo do veiculo
    const f = new Intl.NumberFormat('pt-br', {
        currency: 'BRL',
        style: 'currency'
    }) // classe que transforma qualquer valor em reais
    
    /* fazer os calculos aqui */
    const preco = await calcularPreco(distance, typeVehicle);
    
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
async function calcularPreco(distancia,veiculo) {
  const resObj = await fetch(`/locais-perigosos/calcular/preco?veiculo=${veiculo}&distancia=${distancia}`)
  const dataRes = await resObj.json()
  // console.log(dataRes);
  return dataRes.precoTotal
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
  