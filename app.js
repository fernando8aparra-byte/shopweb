let efectoEspacial;

window.addEventListener("DOMContentLoaded", () => {
  efectoEspacial = VANTA.STARS({
    el: "#vanta-bg",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    backgroundColor: 0x000000,
    color: 0xffffff,
    size: 1.2,         // Tamaño de las estrellas
    speed: 0.40,       // Velocidad de movimiento
    twinkle: 1.0,      // Nivel de parpadeo
    quantity: 4.0,     // Densidad del campo de estrellas
  });
});

window.addEventListener("beforeunload", () => {
  if (efectoEspacial) efectoEspacial.destroy();
});
