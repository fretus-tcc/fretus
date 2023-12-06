var inputEmail = document.getElementById("inputEmail");
var emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
var messageEmail = document.getElementById("messageEmail");
var messageCpf = document.getElementById("messageCpf");
var cpf =document.getElementById("cpf");
var password = document.getElementById("password");
var messageSenha = document.getElementById("messageSenha");
var criar1 = document.getElementById("criar1");
var nome = document.getElementById("nome");
var messageNome = document.getElementById("messageNome");

messageEmail.style.marginLeft = "12px";
messageNome.style.marginLeft = "12px";
messageSenha.style.marginLeft = "12px";
messageCpf.style.marginLeft = "12px";

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

criar1.addEventListener("click", function senhaValida() {

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

//ENTRAGADORES 

var inputEmail2 = document.getElementById("inputEmail2");
var messageEmail2 = document.getElementById("messageEmail2");
var messageCpf2 = document.getElementById("messageCpf2");
var cpf2 =document.getElementById("cpf2");
var password2 = document.getElementById("password2");
var messageSenha2 = document.getElementById("messageSenha2");
var criar2 = document.getElementById("criar2");
var nome2 = document.getElementById("nome2");
var messageNome2 = document.getElementById("messageNome2");

messageEmail2.style.marginLeft = "12px";
messageNome2.style.marginLeft = "12px";
messageSenha2.style.marginLeft = "12px";
messageCpf2.style.marginLeft = "12px";

function emailValido2() {
    var email2 = inputEmail2.value;

    if (emailRegex.test(email2)) {

        messageEmail2.textContent = "";
        messageEmail2.style.color = "";
        messageEmail2.style.fontSize = "";  
        inputEmail2.style.border = "";
        return "valido2"
    } else {

        messageEmail2.textContent = "E-mail inválido";
        messageEmail2.style.color = "red";
        messageEmail2.style.fontSize = "12px";
        inputEmail2.style.border = "solid 1px red";
        return "invalido2"
    }
}

function cpfValido2(){

    if (cpf2.value.length < 14) {

        messageCpf2.textContent = "cpf inválido";
        messageCpf2.style.color = "red";
        messageCpf2.style.fontSize = "12px";
        cpf2.style.border = "1px solid red";
        return "invalido2"

    }else{
        messageCpf2.textContent = "";
        messageCpf2.style.color = "";
        messageCpf2.style.fontSize = "";
        cpf2.style.border = "";
        return "valido2"

    }
}

function senhaValidada2(){

    if(password2.value.length >= 8){

        messageSenha2.textContent = "";
        messageSenha2.style.color = "";
        messageSenha2.style.fontSize = "";
        password2.style.border = "";
        }else{
            password2.style.border = "solid 1px red";
            messageSenha2.textContent = "senha deve ter pelo menos 8 caracteres";
            messageSenha2.style.color = "red";
            messageSenha2.style.fontSize = "12px"
        }
}


function Letras2(nome2) {
    const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/; 
    return regex.test(nome2);
  }


function nomeValido2(){
    var name = nome2.value;
    if (Letras2(name) && nome2.value.length >= 3) {
       
        nome2.style.border = "";
        messageNome2.textContent = "";
        return "valido2"

      } else if(nome2.value.length <= 3){

        messageNome2.textContent = "Nome deve ter pelo menos 3 caracteres ";
        messageNome2.style.color = "red";
        messageNome2.style.fontSize = "12px";
        nome2.style.border = "1px solid red";
        return "invalido2"

      }else {
        messageNome2.textContent = "nome inválido";
        messageNome2.style.color = "red";
        nome2.style.border = "1px solid red";
        return "invalido2"
      }

}

criar2.addEventListener("click", function senhaValida2() {
 
    if(password2.value.length >= 8){

        messageSenha2.textContent = "";
        messageSenha2.style.color = "";
        messageSenha2.style.fontSize = "";
        password2.style.border = "";
        }else{
            password2.style.border = "solid 1px red";
            messageSenha2.textContent = "senha deve ter pelo menos 8 caracteres";
            messageSenha2.style.color = "red";
            messageSenha2.style.fontSize = "12px"
        }

var name = nome2.value;
if (Letras2(name) && nome2.value.length >= 3) {
   
    nome2.style.border = "";
    messageNome2.textContent = "";
   

  } else if(nome2.value.length <= 3){

    messageNome2.textContent = "Nome deve ter pelo menos 3 caracteres ";
    messageNome2.style.color = "red";
    messageNome2.style.fontSize = "12px";
    nome2.style.border = "1px solid red";
    

  }else {
    messageNome2.textContent = "nome inválido";
    messageNome2.style.color = "red";
    nome2.style.border = "1px solid red";
    
  }

  if (cpf2.value.length < 14) {

    messageCpf2.textContent = "cpf inválido";
    messageCpf2.style.color = "red";
    messageCpf2.style.fontSize = "12px";
    cpf2.style.border = "1px solid red";
   

}else{
    messageCpf2.textContent = "";
    messageCpf2.style.color = "";
    messageCpf2.style.fontSize = "";
    cpf2.style.border = "";
  
}


var email2 = inputEmail2.value;

if (emailRegex.test(email2) && email2.value.length > 0) {

    messageEmail2.textContent = "";
    messageEmail2.style.color = "";
    messageEmail2.style.fontSize = "";  
    inputEmail2.style.border = "";
   
} else {

    messageEmail2.textContent = "E-mail inválido";
    messageEmail2.style.color = "red";
    messageEmail2.style.fontSize = "12px";
    inputEmail2.style.border = "1px solid red";
    
}

});
