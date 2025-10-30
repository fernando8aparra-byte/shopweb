// ============================
// SONIDOS
// ============================
const sounds = {
  click: new Audio('sounds/click.mp3'),
  hover: new Audio('sounds/hover.mp3'),
  success: new Audio('sounds/success.mp3')
};

// Reproducir sonido (evita errores si no está cargado)
function playSound(key) {
  const audio = sounds[key];
  if (audio) {
    audio.currentTime = 0;
    audio.play().catch(() => {}); // Silencia errores en móviles
  }
}

// ============================
// HOVER SOBRE PRODUCTOS
// ============================
document.querySelectorAll('.product-card').forEach(card => {
  card.addEventListener('mouseenter', () => playSound('hover'));
});

// ============================
// PAYPAL INTEGRACIÓN
// ============================
paypal.Buttons({
  createOrder: function(data, actions) {
    // Obtiene el botón pulsado
    const btn = data.trigger || document.activeElement;
    const product = btn.dataset.product;
    const price = btn.dataset.price;

    return actions.order.create({
      purchase_units: [{
        description: product,
        amount: { value: price, currency_code: 'USD' }
      }]
    });
  },

  onApprove: function(data, actions) {
    return actions.order.capture().then(details => {
      // ¡Pago exitoso!
      playSound('success');
      alert(`¡Pago completado con éxito! Gracias, ${details.payer.name.given_name}.`);
    });
  },

  onError: err => {
    console.error('Error en PayPal:', err);
    alert('Hubo un error al procesar el pago. Intenta de nuevo.');
  }

}).render('#paypal-button-container'); // Se renderiza globalmente

// ============================
// CLIC EN BOTONES DE COMPRA
// ============================
document.querySelectorAll('.buy-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    playSound('click');

    // Simula el trigger para PayPal
    const tempContainer = document.createElement('div');
    tempContainer.id = 'paypal-button-container';
    document.body.appendChild(tempContainer);

    // Renderiza PayPal con los datos del botón
    paypal.Buttons({
      createOrder: () => {
        return fetch('https://api-m.sandbox.paypal.com/v2/checkout/orders', { // sandbox URL
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            intent: 'CAPTURE',
            purchase_units: [{
              amount: { value: btn.dataset.price, currency_code: 'USD' },
              description: btn.dataset.product
            }]
          })
        }).then(res => res.json()).then(data => data.id);
      },
      onApprove: (data) => {
        playSound('success');
        alert(`¡Pago completado! Producto: ${btn.dataset.product}`);
        tempContainer.remove();
      }
    }).render(tempContainer);
  });
});
