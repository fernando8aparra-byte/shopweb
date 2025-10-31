const canvas = document.getElementById("space");
const ctx = canvas.getContext("2d");
let stars = [];
let w, h, ratio = window.devicePixelRatio || 1;

function resize() {
  w = window.innerWidth;
  h = window.innerHeight;
  canvas.width = w * ratio;
  canvas.height = h * ratio;
  ctx.scale(ratio, ratio);
  generateStars();
}
window.addEventListener("resize", resize);

function generateStars() {
  stars = [];
  const layers = [
    { count: 800, depth: 0.3 },
    { count: 400, depth: 0.6 },
    { count: 200, depth: 1.0 }
  ];
  
  layers.forEach(layer => {
    for (let i = 0; i < layer.count; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        z: layer.depth,
        size: (Math.random() * 0.5 + 0.1) * layer.depth,
        brightness: Math.random() * 0.5 + 0.3,
        hue: 210 + Math.random() * 8
      });
    }
  });
}

function drawStars(mouseX = 0, mouseY = 0) {
  ctx.fillStyle = "#010104";
  ctx.fillRect(0, 0, w, h);

  stars.forEach(star => {
    const offsetX = (mouseX - w/2) * (1 - star.z) * 0.004;
    const offsetY = (mouseY - h/2) * (1 - star.z) * 0.004;
    const x = star.x + offsetX;
    const y = star.y + offsetY;

    const grad = ctx.createRadialGradient(x, y, 0, x, y, star.size * 2.2);
    grad.addColorStop(0, `hsl(${star.hue}, 40%, 96%)`);
    grad.addColorStop(0.4, `hsla(${star.hue}, 70%, 85%, 0.7)`);
    grad.addColorStop(1, "transparent");

    ctx.globalAlpha = star.brightness;
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, y, star.size * 2.2, 0, Math.PI * 2);
    ctx.fill();
  });
}

let mouse = { x: 0, y: 0 };
window.addEventListener("mousemove", e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

function animate() {
  drawStars(mouse.x, mouse.y);
  requestAnimationFrame(animate);
}

resize();
animate();
