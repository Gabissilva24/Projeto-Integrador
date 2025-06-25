    document.getElementById('abrir-carrinho').addEventListener('click', () => {
    document.getElementById('carrinho').classList.toggle('escondido');
});

document.getElementById('fechar-carrinho').addEventListener('click', () => {
    document.getElementById('carrinho').classList.toggle('escondido');
});

document.querySelectorAll('#menu .box .btn').forEach(btn => {
    btn.addEventListener('click', function () {
        const parent = this.parentElement;
        const nome = parent.querySelector('h3').innerText;
        const preco = parent.querySelector('.price').innerText;
        const imagemUrl = parent.querySelector('img').src;

        adicionarAoCarrinho(nome, preco, imagemUrl);
    });
});


function adicionarAoCarrinho(nome, preco, imagemUrl) {
    const lista = document.getElementById('itens-carrinho');

    const li = document.createElement('li');

    const img = document.createElement('img');
    img.src = imagemUrl;
    img.alt = nome;


    const span = document.createElement('span');
    span.textContent = `${nome} - ${preco}`;

    li.appendChild(img);
    li.appendChild(span);
    lista.appendChild(li);

    atualizarTotal();
}


function atualizarTotal() {
    const itens = document.querySelectorAll('#itens-carrinho li');
    let total = 0;

    itens.forEach(item => {
        const texto = item.textContent;
        const valorTexto = texto.split('R$')[1];
        const valor = parseFloat(valorTexto.replace(',', '.'));
        total += valor;
    });

    document.getElementById('total').innerText = `Total: R$ ${total.toFixed(2).replace('.', ',')}`;
}