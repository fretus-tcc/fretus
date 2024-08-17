const fetch = require('node-fetch')
const https = require('https')

const agent = new https.Agent({
    rejectUnauthorized: false
})

async function identificarCidade(lat, lng) {
    const resObj = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&email=gabrioviski@gmail.com&lat=${lat}&lon=${lng}`, { agent })
    const dataRes = await resObj.text()
    const data = JSON.parse(dataRes)
    // console.log('dataRes', dataRes)
    // console.log('resObj', resObj, 'dataRes', dataRes, 'data', data)

    // Caso não estiver especificado a propriedade "city" na API, use a propriedade "town"
    if (data.address.city == undefined) {
        return data.address.town
    }

    return data.address.city
}

function identificarZona(cidade) {
    // Todas cidades das zonas
    var cidadesOeste = ["Barueri", "Osasco", "Itapevi", "Jandira", "Carapicuíba", "Santana de Parnaíba", "Pirapora"];
    var cidadesSudeste = ["Diadema", "São Bernardo do Campo", "Santo André", "Ribeirão Pires", "Rio Grande da Serra", "Mauá"];
    var cidadeNorte = ["Francisco Morato", "Franco da Rocha", "Cajamar", "Mairiporã", "Caieiras"];
    var cidadesSudoeste = ["Vargem Grande Paulista", "Itapecerica da Serra", "São Lourenço da Serra", "Juquitiba", "Embu-Guaçu", "Embu das Artes", "Cotia", "Taboão da Serra"];
    var cidadeLeste = ["Arujá", "Guarulhos", "Santa Isabel", "Itaquaquecetuba", "Ferraz de Vasconcelos", "Biritiba Mirim", "Salesópolis", "Guararema", "Suzano", "Mogi das Cruzes", "Poá"];

    var zona = ""
    if (cidadesOeste.includes(cidade)) {
        zona = "Oeste";
    } else if (cidadesSudeste.includes(cidade)) {
        zona = "Sudeste";
    } else if (cidadeNorte.includes(cidade)) {
        zona = "Norte";
    } else if (cidadesSudoeste.includes(cidade)) {
        zona = "Sudoeste";
    } else if (cidadeLeste.includes(cidade)) {
        zona = "Leste";
    } else {
        zona = "Cidade não encontrada";
    }

    var indicador = 0
    if (zona === "Oeste") {
        indicador = 1
    } else if (zona === "Leste") {
        indicador = 2
    } else if (zona === "Norte") {
        indicador = 3
    } else if (zona === "Sudeste") {
        indicador = 4
    } else if (zona === "Sudoeste") {
        indicador = 5
    }
    
    // Dados zonas fixos
    const oeste = 9550;
    const norte = 2662;
    const sudeste = 15272;
    const leste = 17283;
    const sudoeste = 7349;
    const mediaZonas = 10423;

    var zonaDados
    if (indicador == 1) {
        zonaDados = oeste
    } else if (indicador == 2) {
        zonaDados = leste
    } else if (indicador == 3) {
        zonaDados = norte
    } else if (indicador == 4) {
        zonaDados = sudeste
    } else if (indicador == 5) {
        zonaDados = sudoeste
    }

    const meioPerigoso = (0.10 * mediaZonas) + mediaZonas
    const perigoso = (0.20 * mediaZonas) + mediaZonas

    var perigoZona
    if (zona != 'Cidade não encontrada') {
        if (zonaDados >= meioPerigoso && zonaDados <= perigoso) {
            perigoZona = 'meio'
        } else if (zonaDados >= perigoso) {
            perigoZona = 'perigosa'
        } else {
            perigoZona = 'segura'
        }
    }

    return { zona, zonaDados, perigoZona }
}

function identificarDadosRegiao(cidade) {
    // Todas cidades das regiões
    const regioesSP = {

        "capital": ["São Paulo"],

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

    var meioPerigoso = (0.10 * mediaRegiao) + mediaRegiao
    var perigoso = (0.20 * mediaRegiao) + mediaRegiao

    function identificarRegiao(cidade) {
        for (const regiao in regioesSP) {
            if (regioesSP[regiao].includes(cidade)) {
                return regiao;
            }
        }
        return "Cidade não encontrada";
    }

    var regiaoDescoberta = identificarRegiao(cidade)

    var dadosRegiao
    if (regiaoDescoberta == "Grande São Paulo") {
        dadosRegiao = valorGrandeS
    } else if (regiaoDescoberta == "Campinas") {
        dadosRegiao = valorCampinas
    } else if (regiaoDescoberta == "Araçatuba") {
        dadosRegiao = valorAracatuba
    } else if (regiaoDescoberta == "Sorocaba") {
        dadosRegiao = valorSorocaba
    } else if (regiaoDescoberta == "Bauru") {
        dadosRegiao = valorBauru
    } else if (regiaoDescoberta == "São José do Rio Preto") {
        dadosRegiao = valorRioPreto
    } else if (regiaoDescoberta == "Presidente Prudente") {
        dadosRegiao = valorPresidente
    } else if (regiaoDescoberta == "Ribeirão Preto") {
        dadosRegiao = valorRiberao
    } else if (regiaoDescoberta == "Santos") {
        dadosRegiao = valorSantos
    } else if (regiaoDescoberta == "Piracicaba") {
        dadosRegiao = valorPiracicaba
    } else if (regiaoDescoberta == "São José dos Campos") {
        dadosRegiao = valorJoseCampos
    } else if (regiaoDescoberta == "capital") {
        dadosRegiao = valorCapital
    }

    var perigoRegiao
    if (regiaoDescoberta != 'Cidade não encontrada') {
        if (dadosRegiao >= meioPerigoso && dadosRegiao <= perigoso) {
            perigoRegiao = 'meio'
        } else if (dadosRegiao >= perigoso) {
            perigoRegiao = 'perigosa'
        } else {
            perigoRegiao = 'segura'
        }
    }

    return { regiaoDescoberta, dadosRegiao, perigoRegiao }

}

function calcularTaxa(zona, regiao) {

    // Se zona ou regiao nao estiverem definidas, elas serao consideradas como meio perigosas
    const perigoZona = zona == undefined ? 'meio' : zona
    const perigoRegiao = regiao == undefined ? 'meio' : regiao

    // console.log(zona, regiao);
    // console.log(perigoZona, perigoRegiao);
    
    let taxa
    if (perigoRegiao == 'segura' && perigoZona == 'perigosa') {
        // preco aumenta 20%
        taxa = 20
    } else if (perigoRegiao == 'segura' && perigoZona == 'segura') {
        // preco aumenta 0%
        taxa = 0
    } else if (perigoRegiao == 'segura' && perigoZona == 'meio') {
        // 10%
        taxa = 10     
    } else if (perigoRegiao == 'perigosa' && perigoZona == 'meio') {
        // 16%
        taxa = 16
    } else if (perigoRegiao == 'perigosa' && perigoZona == 'perigosa') {
        // 20%
        taxa = 20
    } else if (perigoRegiao == 'perigosa' && perigoZona == 'segura') {
        // 15%
        taxa = 15
    } else if (perigoRegiao == 'meio' && perigoZona == 'segura') {
        // 5%
        taxa = 5
    } else if (perigoRegiao == 'meio' && perigoZona == 'meio') {
        // 10%
        taxa = 10
    } else if (perigoRegiao == 'meio' && perigoZona == 'perigosa') {
        // 15%
        taxa = 15
    }

    return taxa
}

async function calcularLocaisPerigosos(lat, lng) {
    // Cidade
    const cidade = await identificarCidade(lat, lng)
    
    // Zonas
    const { zona, perigoZona } = identificarZona(cidade)
    
    // Regioes
    const { regiaoDescoberta, dadosRegiao, perigoRegiao } = identificarDadosRegiao(cidade)
    
    // Taxa baseada na zona e regiao
    const taxa = calcularTaxa(perigoZona, perigoRegiao)

    return taxa
}

exports.identificarZona = identificarZona;
exports.identificarDadosRegiao = identificarDadosRegiao;
exports.identificarCidade = identificarCidade;
exports.calcularTaxa = calcularTaxa;
exports.calcularLocaisPerigosos = calcularLocaisPerigosos;