document.addEventListener('DOMContentLoaded', function() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    displayCartItems(cart);

    document.getElementById('checkout-button').addEventListener('click', encerrarCompra);
});

function displayCartItems(cart) {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = ''; // Limpa o conteúdo anterior

    let total = 0;

    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('col-md-4', 'mb-4', 'cart-item');

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
    localStorage.removeItem('cart');
    displayCartItems([]);
    alert('Compra encerrada com sucesso!');
}
