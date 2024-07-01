let c = 0;
let names = ['João', 'Miguel', 'Arthur', 'Heitor', 'Theo', 'Davi', 'Samuel', 'Gabriel', 'Gustavo', 'Enzo'];

setInterval(() => {
    c++;
    if (c < 10) {
        content.forEach((item, i) => {
            const shipper = document.createElement('div');
            shipper.classList.add('products');
            shipper.innerHTML = `
                <img src="/imgs/historico/${c + 1}.jpg" alt="" class="photo">
                <h1>${names[c]}</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            `;

            const act = document.createElement('div');
            act.classList.add('actions');

            const infoIcon = document.createElement('img');
            infoIcon.setAttribute('src', '/imgs/client/info.svg');
            infoIcon.setAttribute('alt', 'indicator');
            infoIcon.classList.add('indicator');

            const favIcon = document.createElement('img');
            favIcon.setAttribute('src', '/imgs/client/fav-icon.svg');
            favIcon.addEventListener('click', showAcceptNotification.bind(null, 'Entregador Favoritado! '));

            const paymentCall = document.createElement('img');
            paymentCall.classList.add('pay-call');
            paymentCall.setAttribute('src', '/imgs/client/pay-icon.svg');
            paymentCall.addEventListener('click', () => {
                payPopup.classList.add('show');
            });

            act.appendChild(infoIcon);
            act.appendChild(favIcon);
            act.appendChild(paymentCall);
            shipper.appendChild(act);

            const pos = content[i].children[0];
            item.insertBefore(shipper, pos);
            items = document.querySelectorAll('.content > .products');
        });


        initializeInfoIcons();
    }
}, 1000);
