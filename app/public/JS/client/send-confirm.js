const confirmShip = document.querySelector('.confirm-ship')

confirmShip.addEventListener('click', () => {
    chat.innerHTML +=
    `<article class="row my-msg">
        <article class="user-icon rounded-icon">
            <img src="/imgs/client/user-icon.svg" alt="">
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