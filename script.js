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

  for (let i = 0; i < notebooks.length; i++) {
    const notebook = notebooks[i];
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

    const comprarButton = document.createElement('a');
    comprarButton.classList.add('btn', 'btn-primary');
    comprarButton.textContent = 'Comprar';
    comprarButton.href = '#';

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    cardBody.appendChild(cardPrice);
    cardBody.appendChild(comprarButton);
    card.appendChild(cardImg);
    card.appendChild(cardBody);

    // Adiciona o card ao row
    row.appendChild(card);
  }
}

// Chama a função para buscar os notebooks quando a página carregar
window.onload = buscarNotebooks;
