var inputEmail = document.getElementById("inputEmail");
var emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
var messageEmail = document.getElementById("messageEmail");
var messageCpf = document.getElementById("messageCpf");
var cpf =document.getElementById("cpf");
var password = document.getElementById("password");
var messageSenha = document.getElementById("messageSenha");
var verificar = document.getElementById("verificar");
var nome = document.getElementById("nome");
var messageNome = document.getElementById("messageNome");



messageEmail.style.marginLeft = "12px";
messageNome.style.marginLeft = "12px";
messageSenha.style.marginLeft = "12px";
messageCpf.style.marginLeft = "12px";


messageEmail.style.marginTop = "-10px";
messageNome.style.marginTop = "-10px";
messageSenha.style.marginTop = "-10px";
messageCpf.style.marginTop = "-10px";




function emailValido() {
    var email = inputEmail.value;

    if (emailRegex.test(email)) {

        messageEmail.textContent = "";
        messageEmail.style.color = "";
        messageEmail.style.fontSize = "";  
        inputEmail.style.border = "";
        return "valido"
    } else {

        messageEmail.textContent = "E-mail inválido";
        messageEmail.style.color = "red";
        messageEmail.style.fontSize = "12px";
        inputEmail.style.border = "1px solid red";
        return "invalido"
    }
}


function cpfValido(){

    if (cpf.value.length < 14) {

        messageCpf.textContent = "cpf inválido";
        messageCpf.style.color = "red";
        messageCpf.style.fontSize = "12px";
        cpf.style.border = "1px solid red";
        return "invalido"

    }else{
        messageCpf.textContent = "";
        messageCpf.style.color = "";
        messageCpf.style.fontSize = "";
        cpf.style.border = "";
        return "valido"

    }
}

verificar.addEventListener("click", function senhaValida() {

    if (password.value.length < 8) {

        messageSenha.textContent = "Senha deve ter pelo menos 8 caracteres";
        messageSenha.style.color = "red";
        messageSenha.style.fontSize = "12px";
        password.style.border = "1px solid red";

      
    }else{
        messageSenha.textContent = "";
        messageSenha.style.color = "";
        messageSenha.style.fontSize = "";
        password.style.border = "";

    }

    if(emailValido() === "invalido"){
        messageEmail.textContent = "E-mail inválido";
        messageEmail.style.color = "red";
        messageEmail.style.fontSize = "12px";
        inputEmail.style.border = "1px solid red";
        }

        if(cpfValido() === "invalido"){
            messageCpf.textContent = "cpf inválido";
            messageCpf.style.color = "red";
            messageCpf.style.fontSize = "12px";
            cpf.style.border = "1px solid red";
        }

        if(nomeValido() === "invalido"){
            messageNome.textContent = "nome inválido";
            messageNome.style.color = "red";
            nome.style.border = "1px solid red";
        }
});



function senhaValidada(){

    if(password.value.length >=8){

        messageSenha.textContent = "";
        messageSenha.style.color = "";
        messageSenha.style.fontSize = "";
        password.style.border = "";
        }else{
            password.style.border = "solid 1px red";
            messageSenha.textContent = "senha deve ter pelo menos 8 caracteres";
            messageSenha.style.color = "red";
            messageSenha.style.fontSize = "12px"
        }
}


function Letras(nome) {
    const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/; 
    return regex.test(nome);
  }


function nomeValido(){
    var name = nome.value;
    if (Letras(name) && nome.value.length >= 3) {
       
        nome.style.border = "";
        messageNome.textContent = "";
        return "valido"

      } else if(nome.value.length <= 3){

        messageNome.textContent = "Nome deve ter pelo menos 3 caracteres ";
        messageNome.style.color = "red";
        messageNome.style.fontSize = "12px";
        nome.style.border = "1px solid red";
        return "invalido"

      }else {
        messageNome.textContent = "nome inválido";
        messageNome.style.color = "red";
        nome.style.border = "1px solid red";
        return "invalido"
      }

}

