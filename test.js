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

console.log(validaCPF('475.399.900-90'))


function ZeroEsqueda (num){
    return num >=10 ? num : `0${num}`;
}

function FormatandoData(data){

    //Dia
    const dia = ZeroEsqueda(data.getDate());
    const mes = ZeroEsqueda(data.getMonth() + 1);
    const ano = ZeroEsqueda(data.getFullYear());

    //Horas 
    const horas = ZeroEsqueda(data.getHours());
    const min = ZeroEsqueda(data.getMinutes());
    const segundos = ZeroEsqueda(data.getSeconds());


    return `${dia}/${mes}/${ano}  ${horas}:${min}:${segundos} `

}

const data = new Date(); 
const dataBrasil = FormatandoData(data); 

console.log(dataBrasil)