// ============================
// SONIDOS
// ============================
const sounds = {
  hover: new Audio('sounds/hover.mp3'),
  click: new Audio('sounds/click.mp3'),
  success: new Audio('sounds/success.mp3')
};

function playSound(name) {
  const audio = sounds[name];
  if (audio) {
    audio.currentTime = 0;
    audio.play().catch(() => {}); // Evita errores en móviles
  }
}

// ============================
// HOVER EN PRODUCTOS
// ============================
document.querySelectorAll('.product-card').forEach(card => {
  card.addEventListener('mouseenter', () => playSound('hover'));
});

// ============================
// BOTÓN ADD TO CART + PAYPAL
// ============================
document.querySelectorAll('.add-to-cart').forEach(btn => {
  btn.addEventListener('click', function(e) {
    e.stopPropagation();
    playSound('click');

    const card = this.closest('.product-card');
    const productName = card.dataset.name;
    const price = card.dataset.price;

    // Crear contenedor temporal para PayPal
    const container = document.createElement('div');
    container.id = 'paypal-container-' + Date.now();
    document.body.appendChild(container);

    paypal.Buttons({
      createOrder: function() {
        return actions.order.create({
          purchase_units: [{
            description: productName,
            amount: { value: price, currency_code: 'USD' }
          }]
        });
      },
      onApprove: function(data, actions) {
        return actions.order.capture().then(details => {
          playSound('success');
          alert(`¡Compra realizada con éxito!\nProducto: ${productName}\nGracias, ${details.payer.name.given_name}!`);
          container.remove();
        });
      },
      onError: err => {
        console.error(err);
        alert('Error en el pago. Intenta de nuevo.');
        container.remove();
      }
    }).render(container);
  });
});
