let cart = [];

// Função para buscar os notebooks
async function buscarNotebooks() {
  const url = 'https://api.mercadolibre.com/sites/MLB/search?q=notebooks';
  const response = await fetch(url);

  if (response.ok) {
    const data = await response.json();
    exibirNotebooks(data.results.slice(0, 30)); // Exibe os notebooks
  } else {
    console.error('Erro na requisição:', response.status);
  }
}

function exibirNotebooks(notebooks) {
  const row = document.querySelector('.row');
  row.innerHTML = ''; // Limpa o conteúdo anterior

  notebooks.forEach(notebook => {
    // Cria o card para cada notebook
    const card = document.createElement('div');
    card.classList.add('col-md-4', 'mb-4'); // Define a largura do card (col-md-4) e espaçamento (mb-4)

    // Cria os elementos do card
    const cardImg = document.createElement('img');
    cardImg.classList.add('card-img-top');
    cardImg.src = notebook.thumbnail;
    cardImg.alt = "Imagem do Notebook";

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    const cardTitle = document.createElement('h5');
    cardTitle.classList.add('card-title');
    cardTitle.textContent = notebook.title;

    const cardPrice = document.createElement('p');
    cardPrice.classList.add('card-text');
    cardPrice.textContent = `Preço: R$ ${notebook.price.toFixed(2)}`;

    const comprarButton = document.createElement('button');
    comprarButton.classList.add('btn', 'btn-primary');
    comprarButton.textContent = 'Adicionar ao Carrinho';
    comprarButton.onclick = () => adicionarAoCarrinho(notebook);

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardPrice);
    cardBody.appendChild(comprarButton);
    card.appendChild(cardImg);
    card.appendChild(cardBody);

    // Adiciona o card ao row
    row.appendChild(card);
  });
}

function adicionarAoCarrinho(notebook) {
  cart.push(notebook);
  displayCartItems();
}

function displayCartItems() {
  const cartItemsContainer = document.getElementById('cart-items');
  cartItemsContainer.innerHTML = ''; // Limpa o conteúdo anterior

  let total = 0;

  cart.forEach(item => {
    const itemElement = document.createElement('div');
    itemElement.classList.add('cart-item');

    const itemTitle = document.createElement('h5');
    itemTitle.textContent = item.title;

    const itemPrice = document.createElement('p');
    itemPrice.textContent = `Preço: R$ ${item.price.toFixed(2)}`;

    itemElement.appendChild(itemTitle);
    itemElement.appendChild(itemPrice);
    cartItemsContainer.appendChild(itemElement);

    total += item.price;
  });

  const cartTotal = document.getElementById('cart-total');
  cartTotal.textContent = `Total: R$ ${total.toFixed(2)}`;
}

function encerrarCompra() {
  cart = [];
  displayCartItems();
  alert('Compra encerrada com sucesso!');
}

// Chama a função para buscar os notebooks quando a página carregar
window.onload = buscarNotebooks;

// Adiciona o evento ao botão "Encerrar Compra"
document.getElementById('checkout-button').addEventListener('click', encerrarCompra);
