'use strict';

const fr = new FileReader();
const fileField = document.querySelector('.js__profile-upload-btn');
const profileImage = document.querySelector('.js__profile-image');
const profilePreview = document.querySelector('.js__profile-preview');

/**
    @param {evento} e 
 */
function getImage(e){
  const myFile = e.currentTarget.files[0];
  fr.addEventListener('load', writeImage);
  fr.readAsDataURL(myFile);
}
function writeImage() {

  profileImage.style.backgroundImage = `url(${fr.result})`;
  profilePreview.style.backgroundImage = `url(${fr.result})`;
}

fileField.addEventListener('change', getImage);

// ! MAscara Telefone 

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