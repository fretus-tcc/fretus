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
                msgs.push({status, text})
            })
        })
    }
    return msgs
}

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

exports.validaCPF = validaCPF;
exports.notifyMessages = notifyMessages;