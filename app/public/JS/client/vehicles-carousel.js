/* 
function selectCard(card) {
    const cards = document.querySelectorAll('.card');
    for (const c of cards) {
        c.classList.remove('selected');
    }
    card.classList.add('selected');
}

function validateForm() {
    const selectedCards = document.querySelectorAll('.selected');
    if (selectedCards.length === 0) {
        const errorMessage = document.getElementById('error-message');
        errorMessage.textContent = 'Selecione pelo menos um tipo de veículo.';
        return false;
    }
    return true;
} */