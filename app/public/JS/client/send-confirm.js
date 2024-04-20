const confirmShip = document.querySelector('.confirm-ship')

confirmShip.addEventListener('click', () => {
    chat.innerHTML +=
    `<article class="row my-msg">
        <article class="user-icon rounded-icon">
            <img src="https://files.axshare.com/gsc/NW3CCE/d7/2e/63/d72e6396c33043df9eca85714bda96d5/images/area_do_cliente__desktop_/u195.svg?pageId=a1cd8bfa-51f9-4251-8edd-b9adceed65b6" alt="">
        </article>
        <article class="msg payment">
            <h1>Você enviou uma confirmação de entrega</h1>
            <span>Deseja confirmar?</span>
            <form class="btn-container">
                <button class="no">Aguarde a confirmação...</button>
            </form>
        </article>
    </article>`
})

console.log(confirmShip)