function disponivel(){
    var minhaCheckbox = document.getElementById("toggle");

    if (minhaCheckbox.checked) {
        disponibilidade.innerHTML ="Disponível"
    } else {
        disponibilidade.innerHTML ="Não disponível"
    }
}

