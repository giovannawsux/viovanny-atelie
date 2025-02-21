// Função para adicionar itens ao carrinho
document.querySelectorAll('.adicionar-carrinho').forEach(button => {
    button.addEventListener('click', () => {
        const nome = button.getAttribute('data-nome');
        const preco = parseFloat(button.getAttribute('data-preco'));
        const imagem = button.getAttribute('data-imagem');

        // Recupera o carrinho do localStorage ou cria um novo
        let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

        // Adiciona o item ao carrinho
        carrinho.push({ nome, preco, imagem });

        // Salva o carrinho no localStorage
        localStorage.setItem('carrinho', JSON.stringify(carrinho));

        alert("O produto foi adicionado ao carrinho!");
    });
});

// Função para exibir os itens do carrinho na página do carrinho
function exibirCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const itensCarrinho = document.querySelector('.itens-carrinho');
    const totalCarrinho = document.getElementById('total-carrinho');

    // Limpa o conteúdo atual
    itensCarrinho.innerHTML = '';

    let total = 0;

    // Adiciona cada item ao carrinho
    carrinho.forEach((item, index) => {
        total += item.preco;

        const divItem = document.createElement('div');
        divItem.classList.add('item');

        divItem.innerHTML = `
            <img src="${item.imagem}" alt="${item.nome}" class="item-img">
            <div class="info">
                <h3>${item.nome}</h3>
                <p>R$ ${item.preco.toFixed(2)}</p>
                <button class="remover" data-index="${index}">Remover</button>
            </div>
        `;

        itensCarrinho.appendChild(divItem);
    });

    // Atualiza o total
    totalCarrinho.textContent = total.toFixed(2);

    // Adiciona evento de remoção
    document.querySelectorAll('.remover').forEach(button => {
        button.addEventListener('click', () => {
            const index = button.getAttribute('data-index');
            removerItem(index);
        });
    });
}

// Função para remover itens do carrinho
function removerItem(index) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho.splice(index, 1);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    exibirCarrinho();
}

// Exibe o carrinho ao carregar a página
if (document.querySelector('.carrinho')) {
    exibirCarrinho();
}