document.addEventListener('DOMContentLoaded', function() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    displayCartItems(cart);

    document.getElementById('checkout-button').addEventListener('click', encerrarCompra);
    document.getElementById('back-button').addEventListener('click', () => {
        window.location.href = 'index.html';
    });
});

function displayCartItems(cart) {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = ''; // Limpa o conteúdo anterior

    let total = 0;

    cart.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('col-md-4', 'mb-4', 'cart-item');

        const itemImg = document.createElement('img');
        itemImg.classList.add('card-img-top');
        itemImg.src = item.thumbnail;
        itemImg.alt = "Imagem do Produto";

        const itemBody = document.createElement('div');
        itemBody.classList.add('card-body');

        const itemTitle = document.createElement('h5');
        itemTitle.textContent = item.title;

        const itemPrice = document.createElement('p');
        itemPrice.textContent = `Preço: R$ ${item.price.toFixed(2)}`;

        const removeButton = document.createElement('button');
        removeButton.classList.add('btn', 'btn-danger');
        removeButton.textContent = 'Remover';
        removeButton.onclick = () => removeFromCart(index);

        itemBody.appendChild(itemTitle);
        itemBody.appendChild(itemPrice);
        itemBody.appendChild(removeButton);
        itemElement.appendChild(itemImg);
        itemElement.appendChild(itemBody);
        cartItemsContainer.appendChild(itemElement);

        total += item.price;
    });

    const cartTotal = document.getElementById('cart-total');
    cartTotal.textContent = `Total: R$ ${total.toFixed(2)}`;
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems(cart);
}

function encerrarCompra() {
    localStorage.removeItem('cart');
    displayCartItems([]);
    alert('Compra encerrada com sucesso!');
}
