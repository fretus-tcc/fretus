var express = require("express")
var router = express.Router()
var { calcularPrecoEntrega } = require("../util/Funcao")
var { identificarZona, identificarDadosRegiao, identificarCidade } = require('../util/identificar-locais-perigosos')

router.get('/calcular/preco', function(req, res) {
    const { veiculo, distancia, lat, lng } = req.query
    const precoTotal = calcularPrecoEntrega(veiculo, distancia, lat, lng)
    res.json({veiculo, distancia, lat, lng, precoTotal});
})

router.get('/cidades/:lat/:lng', async function(req, res) {
    // URL's TESTE
    // localhost:3001/locais-perigosos/cidades/-23.51221435/-46.89020982176999 - Barueri
    // localhost:3001/locais-perigosos/cidades/-23.365011615628166/-46.86314063504268 - Cajamar
    // localhost:3001/locais-perigosos/cidades/-23.54383009950868/-46.58485460960013 - São Paulo
    // localhost:3001/locais-perigosos/cidades/-23.687991967561917/-46.62497540489161 - Diadema
    // localhost:3001/locais-perigosos/cidades/-23.45920797225602, -46.52633359985868 - Guarulhos

    const { lat, lng } = req.params

    // Cidade
    const cidade = await identificarCidade(lat, lng)

    // Zonas
    const { zona, perigoZona } = identificarZona(cidade)

    // Regioes
    const { regiaoDescoberta, dadosRegiao, perigoRegiao } = identificarDadosRegiao(cidade)

    res.json({cidade, zona, perigoZona, regiaoDescoberta, dadosRegiao, perigoRegiao});
})

module.exports = router