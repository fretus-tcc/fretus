const fetch = require('node-fetch')

async function identificarCidade(lat, lng) {
    const resObj = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
    const dataRes = await resObj.text()
    console.log('dataRes', dataRes)
    const data = JSON.parse(dataRes)
    console.log('resObj', resObj, 'dataRes', dataRes, 'data', data)

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

    const mediaZonas = 10423;

    const meioPerigoso = (0.10 * mediaZonas) + mediaZonas
    const perigoso = (0.20 * mediaZonas) + mediaZonas

    var perigoZona
    if (zona != 'Cidade não encontrada') {
        if (zona >= meioPerigoso && zona <= perigoso) {
            perigoZona = 'meio'
        } else if (zona >= perigoso) {
            perigoZona = 'perigosa'
        } else {
            perigoZona = 'segura'
        }
    }

    return { zona, perigoZona }
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
            perigoRegiao = 'perigoso'
        } else {
            perigoRegiao = 'seguro'
        }
    }

    return { regiaoDescoberta, dadosRegiao, perigoRegiao }

}

exports.identificarZona = identificarZona;
exports.identificarDadosRegiao = identificarDadosRegiao;
exports.identificarCidade = identificarCidade;