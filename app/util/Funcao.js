function validaCPF(cpf) {

    cpf = cpf.replace(/\D+/g, '');
    if (cpf.length !== 11) return false;

    let soma = 0;
    let resto;
    if (/^(\d)\1{10}$/.test(cpf)) return false; // Verifica sequências iguais

    for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;

    soma = 0;
    for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return false;

    return true;
}

function notifyMessages(req, res) {
    const flash = req.flash()
    const statusMsgs = Object.keys(flash)
    const msgs = []
    if (statusMsgs.length > 0) { 
        statusMsgs.forEach(status => {
            const texts = [...flash[status]]
            texts.forEach(text => {
                const [title, description] = text.split(' ; ')
                msgs.push({status, title, description})
            })
        })
    }
    return msgs
}

function sendEmail(to, subject, text) {
    return new Promise((resolve, reject) => {
        const nodemailer = require('nodemailer')
        const transporter = nodemailer.createTransport({
            service: "gmail",
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        })

        const options = {
            from: {
                name: 'Fretus',
                address: process.env.EMAIL_USER
            },
            to,
            subject,
            text
        }

        transporter.sendMail(options, function (error, info) {
            if (error) {
                console.log(error);
                return reject({ message: 'Ocorreu um erro' })
            }
            return resolve({ message: 'Email enviado com sucesso' })
        })
    })
}

var { identificarZona, identificarDadosRegiao, identificarCidade, calcularTaxa } = require('../util/identificar-locais-perigosos')

async function calcularPrecoEntrega(veiculo, distancia, lat=30, lng=30) {
    
    // Cidade
    const cidade = await identificarCidade(lat, lng)
    
    // Zonas
    const { zona, perigoZona } = identificarZona(cidade)
    
    // Regioes
    const { regiaoDescoberta, dadosRegiao, perigoRegiao } = identificarDadosRegiao(cidade)
    
    // Taxa baseada na zona e regiao
    const taxa = calcularTaxa(perigoZona, perigoRegiao)
    // console.log(cidade, zona, perigoZona, regiaoDescoberta, dadosRegiao, perigoRegiao)

    let precoPorKm;

    if (veiculo === 'moto') {
        precoPorKm = 2;
    } else if (veiculo === 'carro') {
        precoPorKm = 4;
    } else if (veiculo === 'caminhao') {
        precoPorKm = 15;
    } else if (veiculo === 'van') {
        precoPorKm = 9;
    } else {
        return 'ERRO: veiculo não encontrado'
    }

    var precoTotal = distancia * precoPorKm;
    return precoTotal
}

exports.validaCPF = validaCPF;
exports.notifyMessages = notifyMessages;
exports.sendEmail = sendEmail;
exports.calcularPrecoEntrega = calcularPrecoEntrega;

/* function ZeroEsqueda (num){
    return num >=10 ? num : `0${num}`;
}

function age(data){
    const ano = ZeroEsqueda(data.getFullYear());
    
    idade = ano - data(req.body.nasc) 

    if(idade > 18){
        return true
    }else{
        return error
    }

} */