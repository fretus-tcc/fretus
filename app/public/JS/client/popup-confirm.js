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
const loadPrice = document.querySelector('.load-price')

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
        
        // exibe o loading enquanto o preco nao é exibido
        priceContainer.textContent = ''
        loadPrice.classList.remove('hidden')
        setPrice(route.distance / 1000)

        popup.classList.add('show')
    }
})

const setPrice = async (distance) => {
    const typeVehicle = document.querySelector('input[name="veiculo"]:checked').value // pega o tipo do veiculo
    const cupom = document.querySelector('.select-cupon')
    const porcentagem = (porcentagens[cupom.selectedIndex])
    // console.log(porcentagens, porcentagem)

    const f = new Intl.NumberFormat('pt-br', {
        currency: 'BRL',
        style: 'currency'
    }) // classe que transforma qualquer valor em reais
    
    /* fazer os calculos aqui */
    const preco = await calcularPreco(distance, typeVehicle);
    let price = f.format(preco) // linha que transforma qualquer valor em reais
    
    // tira o loading antes do preco ser exibido
    loadPrice.classList.add('hidden')
    
    priceContainer.innerHTML = price // coloca o preco no popup

    // muda o preco caso tenha cupom
    if (porcentagem != undefined) {
      const novoPreco = preco - ((porcentagem / 100) * preco)
      const newPrice = f.format(novoPreco)
      priceContainer.innerHTML = `<strike>${price}</strike> ${newPrice}`
    }
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
  const destino_coords_preco = end._lngLat
  const resObj = await fetch(`/locais-perigosos/calcular/preco?veiculo=${veiculo}&distancia=${distancia}&lat=${destino_coords_preco.lat}&lng=${destino_coords_preco.lng}`)
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
  

// function precoPeculiaridade() {
//   // recebe se é perigoso

//   if (/* se regiao é segura  && zona é perigosa */) {
//     // preco aumenta 20%
//   } else if (/* se região é segura && zona é segura */) {
//     // preco aumenta 0%
//   } else if (/* se regiao é segura && zona é meio */) {
//     // 10%      
//   } else if (/* se regiao e perigosa && zona é meio */) {
//     // 16%
//   } else if (/* se regiao é perigosa && zona é perigosa */) {
//     // 20%
//   } else if (/* se regiao é perigosa && zona é segura */ ) {
//     // 15%
//   } else if (/* se regiao é meio && zona é segura */) {
//     // 5%
//   } else if (/* se regiao é meio && zona é meio */) {
//     // 10%
//   } else if (/* se regiao é meio && zona é perigosa */) {
//     // 15%
//   }

// }