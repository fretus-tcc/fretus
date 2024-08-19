document.getElementById('generate-coupon').addEventListener('click', async function() {
    const userId = 1; // Substitua pelo ID real do usuário
    const couponCode = 'MEUCUPOM2024'; // Gere ou obtenha o código do cupom dinamicamente
    const discountPercentage = 10; // Defina a porcentagem de desconto

    try {
        const response = await fetch('/generate-coupon', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId, couponCode, discountPercentage })
        });

        const result = await response.json();

        if (response.ok) {
            alert(result.message);
            // Atualize a UI conforme necessário
        } else {
            alert('Erro ao gerar o cupom: ' + result.message);
        }
    } catch (err) {
        console.error('Erro na requisição:', err);
        alert('Erro ao comunicar com o servidor.');
    }
});