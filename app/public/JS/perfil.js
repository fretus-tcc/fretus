// Foto de Perfil
const inputFile = document.querySelector('.input-foto')

inputFile.addEventListener('change', () => {
  // console.log(inputFile.form);
  inputFile.form.submit()
})

// Mascara Telefone 
const telefoneInput = document.getElementById('number');

telefoneInput.addEventListener('input', function (e) {

  const numeroTelefone = e.target.value.replace(/\D/g, '');

  if (e.inputType === 'deleteContentBackward') {
  
    e.target.value = numeroTelefone.replace(/(\d{2})[^\d]?(\d{0,5})[^\d]?(\d{0,4})/, '($1) $2-$3');
  } else {

    if (numeroTelefone.length <= 10) {
      e.target.value = numeroTelefone.replace(/(\d{0,2})(\d{0,4})(\d{0,4})/, '($1) $2-$3');
    } else {
      e.target.value = numeroTelefone.replace(/(\d{0,2})(\d{0,5})(\d{0,4})/, '($1) $2-$3');
    }
  }
});