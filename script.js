// Função para buscar os notebooks
async function buscarNotebooks() {
  const url = 'https://api.mercadolibre.com/sites/MLB/search?q=notebooks';
  const response = await fetch(url);

  if (response.ok) {
      const data = await response.json();
      exibirNotebooks(data.results); // Exibe os notebooks
  } else {
      console.error('Erro na requisição:', response.status);
  }
}

function exibirNotebooks(notebooks) {
  const cardsContainer = document.getElementById('cards-container');

  for (let i = 0; i < 30; i++) {
      const notebook = notebooks[i]; 
      if (notebook) { // Verifica se o notebook existe
          // Cria um novo elemento <div> para o card
          const card = document.createElement('div');
          card.classList.add('col-md-4', 'mb-4'); 
          card.innerHTML = `
              <div class="card" style="width: 18rem;">
                  <img src="${notebook.thumbnail}" class="card-img-top" alt="Imagem do Notebook">
                  <div class="card-body">
                      <h5 class="card-title">${notebook.title}</h5>
                      <p class="card-text">${notebook.description}</p>
                      <a href="#" class="btn btn-primary">Comprar</a>
                  </div>
              </div>
          `;

          // Adiciona o card ao container
          cardsContainer.appendChild(card);
      }
  }
}

// Chama a função para buscar os notebooks quando a página carregar
window.onload = buscarNotebooks;
// Função para buscar os notebooks
async function buscarNotebooks() {
  const url = 'https://api.mercadolibre.com/sites/MLB/search?q=notebooks';
  const response = await fetch(url);

  if (response.ok) {
    const data = await response.json();
    exibirNotebooks(data.results.slice(0, 30));
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

    const cardText = document.createElement('p');
    cardText.classList.add('card-text');
    cardText.textContent = notebook.description;

    const comprarButton = document.createElement('a');
    comprarButton.classList.add('btn', 'btn-primary');
    comprarButton.textContent = 'Comprar';
    comprarButton.href = '#';

    
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    cardBody.appendChild(comprarButton);
    card.appendChild(cardImg);
    card.appendChild(cardBody);

    // Adiciona o card ao row
    row.appendChild(card);
  }
}
// Chama a função para buscar os notebooks quando a página carregar
window.onload = buscarNotebooks;
