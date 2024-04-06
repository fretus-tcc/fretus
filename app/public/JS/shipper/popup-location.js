document.addEventListener("DOMContentLoaded", function() {
    const locationImage = document.querySelector('.location');
    const popup = document.querySelector('.locationBox');
    const closeButton = document.querySelector('.locationBox .close');

    locationImage.addEventListener('click', function() {
      popup.style.display = 'flex';
    });

    closeButton.addEventListener('click', function() {
      popup.style.display = 'none';
    });
  });