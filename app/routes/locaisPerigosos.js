var express = require("express")
var router = express.Router()
var { calcularPrecoEntrega } = require("../util/Funcao")

router.get('/calcular/preco', function(req, res) {
    const { veiculo, distancia } = req.query
    const precoTotal = calcularPrecoEntrega(veiculo, distancia)
    res.json({veiculo, distancia, precoTotal});
})

/* router.get('/calcular/preco/:cidade', async function(req, res) {
// Zonas
    var CidadesOeste = ["Barueri", "Osasco", "Itapevi", "Jandira", "Carapicuíba", "Santana de Parnaíba", "Pirapora"];
    var CidadesSudeste = ["Diadema", "São Bernardo do Campo", "Santo André", "Ribeirão Pires", "Rio Grande da Serra", "Mauá"];
    var CidadeNorte = ["Francisco Morato", "Franco da Rocha", "Cajamar", "Mairiporã", "Caieiras"];
    var CidadesSudoeste = ["Vargem Grande Paulista", "Itapecerica da Serra", "São Lourenço da Serra", "Juquitiba", "Embu-Guaçu", "Embu das Artes", "Cotia", "Taboão da Serra"];
    var CidadeLeste = ["Arujá", "Guarulhos", "Santa Isabel", "Itaquaquecetuba", "Ferraz de Vasconcelos", "Biritiba Mirim", "Salesópolis", "Guararema", "Suzano", "Mogi das Cruzes", "Poá"];

    function identificarZona(cidade) {
        var identificarZona = ""
        if (CidadesOeste.includes(cidade)) {
            identificarZona = "Oeste";
        } else if (CidadesSudeste.includes(cidade)) {
            identificarZona = "Sudeste";
        } else if (CidadeNorte.includes(cidade)) {
            identificarZona = "Norte";
        } else if (CidadesSudoeste.includes(cidade)) {
            identificarZona = "Sudoeste";
        } else if (CidadeLeste.includes(cidade)) {
            identificarZona = "Leste";
        } else {
            identificarZona = "Cidade não encontrada";
        }

        const mediaZonas = 10423;
    
        var meioPerigoso = (0.10*mediaZonas)+mediaZonas
        var perigoso =(0.20*mediaZonas)+mediaZonas
        // var zona = identificarZona(cidade)
        
        var perigoZona
        if (zona != 'Cidade não encontrada') {
            if(zona >= meioPerigoso && zona <= perigoso){
                perigoZona = 'meio'
            }else if(zona >= perigoso){
                perigoZona = 'perigosa'
            }else{
                perigoZona = 'segura'
            }
        }

        return {identificarZona}
    }
    
    var { cidade } = req.params;
    
    
    // Regioes
    const regioesSP = {

        "capital":["São Paulo"],
    
        "Grande São Paulo": [
            "Guarulhos", "Santo André", "Osasco", "São Bernardo do Campo", 
            "Diadema", "Mauá", "Carapicuíba", "Mogi das Cruzes", "Barueri", "Taboão da Serra",
            "Cotia", "Embu das Artes", "Itapecerica da Serra", "Ferraz de Vasconcelos", 
            "Poá", "Suzano", "Itapevi", "Caieiras", "Franco da Rocha", "Francisco Morato"
        ],
        "Campinas": [
            "Campinas", "Piracicaba", "Jundiaí", "Sumaré", "Hortolândia", "Indaiatuba", 
            "Paulínia", "Itatiba", "Amparo", "Bragança Paulista", "Valinhos", "Vinhedo",
            "Louveira", "Mogi Mirim", "Mogi Guaçu", "Pedreira", "Serra Negra"
        ],
        "Sorocaba": [
            "Sorocaba", "Itu", "Jundiaí", "Itapetininga", "Votorantim", "Salto", "Porto Feliz",
            "Piedade", "Tatuí", "Tietê", "Cerquilho", "Boituva", "São Roque", "Araçariguama", 
            "Mairinque"
        ],
        "Bauru": [
            "Bauru", "Marília", "Jaú", "Lins", "Pederneiras", "Lençóis Paulista", 
            "Agudos", "Garça", "Bariri", "Igaraçu do Tietê", "Areiópolis", "Macatuba"
        ],
        "Araçatuba": [
            "Araçatuba", "Birigui", "Penápolis", "Andradina", "Guararapes", "Valparaíso",
            "Coroados", "Bilac", "Glicério", "Piacatu"
        ],
        "Presidente Prudente": [
            "Presidente Prudente", "Adamantina", "Dracena", "Teodoro Sampaio", "Presidente Venceslau",
            "Regente Feijó", "Rancharia", "Martinópolis", "Osvaldo Cruz", "Pacaembu"
        ],
        "São José do Rio Preto": [
            "São José do Rio Preto", "Catanduva", "Votuporanga", "Olímpia", "Mirassol",
            "Tanabi", "José Bonifácio", "Bady Bassitt", "Nova Granada", "Cedral", "Potirendaba"
        ],
        "São José dos Campos": [
            "São José dos Campos", "Taubaté", "Jacareí", "Caçapava", "Pindamonhangaba", 
            "Guaratinguetá", "Lorena", "Cachoeira Paulista", "Cunha", "Campos do Jordão",
            "São Bento do Sapucaí", "Monteiro Lobato"
        ],
        "Santos": [
            "Santos", "São Vicente", "Guarujá", "Praia Grande", "Cubatão", "Bertioga", 
            "Mongaguá", "Itanhaém", "Peruíbe"
        ],
        "Ribeirão Preto": [
            "Ribeirão Preto", "Sertãozinho", "Jaboticabal", "Franca", "Barretos", "Batatais", 
            "Orlândia", "Bebedouro", "Monte Alto", "Jardinópolis", "Cravinhos", "Serrana"
        ],
        "Piracicaba": [
            "Piracicaba", "Limeira", "Rio Claro", "Santa Bárbara d'Oeste", "Americana", 
            "Capivari", "Rafard", "São Pedro", "Charqueada", "Águas de São Pedro", 
            "Araras", "Conchal", "Iracemápolis"
        ]
    };
    
    function identificarRegiao(cidade) {
        for (const regiao in regioesSP) {
            if (regioesSP[regiao].includes(cidade)) {
                return regiao;
            }
        }
        return "Cidade não encontrada";
    }

    // Valor medio da regiao, para ser alterado, conforme o tempo
    const valorAracatuba = 2831
    const valorGrandeS = 60237
    const valorBauru = 7662
    const valorCampinas = 19077
    const valorCapital = 143648
    const valorJoseCampos = 10764
    const valorPiracicaba = 3813
    const valorRiberao = 15695
    const valorPresidente = 3813
    const valorRioPreto = 6401
    const valorSantos = 17499
    const valorSorocaba = 12028

    const mediaRegiao = 10423;
    
    var meioPerigoso = (0.10*mediaRegiao)+mediaRegiao
    var perigoso =(0.20*mediaRegiao)+mediaRegiao

    var regiaoDescoberta = identificarRegiao(cidade)
    if(regiaoDescoberta == "Grande São Paulo"){
        var regiao = valorGrandeS
    }else if(regiaoDescoberta == "Campinas"){
        var regiao = valorCampinas
    
    }else if(regiaoDescoberta == "Araçatuba"){
          var regiao = valorAracatuba
    
    }else if(regiaoDescoberta  == "Sorocaba"){
        var regiao = valorSorocaba
        
    }else if(regiaoDescoberta == "Bauru"){
        var regiao = valorBauru
    
    }else if(regiaoDescoberta == "São José do Rio Preto"){
        regiao = valorRioPreto
    
    }else if(regiaoDescoberta == "Presidente Prudente"){
         regiao = valorPresidente
    
    }else if(regiaoDescoberta == "Ribeirão Preto"){
    
       regiao = valorRiberao
    }else if(regiaoDescoberta == "Santos"){
        regiao = valorSantos
    
    }else if(regiaoDescoberta == "Piracicaba" ){
        regiao = valorPiracicaba
    
    
    }else if(regiaoDescoberta == "São José dos Campos"){
        regiao = valorJoseCampos
    
    }else if(regiaoDescoberta == "capital"){
        regiao = valorCapital
    
    }

    var perigoRegiao
    if(regiao >= meioPerigoso && regiao <= perigoso){
        perigoRegiao = 'meio'
        console.log(" regiao é meio")
    }else if(regiao >= perigoso){
        perigoRegiao = 'perigoso' 
       console.log(" regiao é perigoso")
    }else{
        perigoRegiao = 'seguro'
        console.log(" regiao é seguro")
    }
    //retorna se é perigoso ou não é enviar pro arquivo função
    const { veiculo, distancia } = req.query
    const precoTotal = calcularPrecoEntrega(veiculo, distancia, perigoZona, perigoRegiao)
    res.json({cidade, zona, perigoZona, regiao, perigoRegiao, veiculo, distancia, precoTotal});
}) */

module.exports = router