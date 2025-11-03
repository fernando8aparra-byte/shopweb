function actualizarHeaderGlobal() {
  const loginBtn = document.getElementById("loginBtn");
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  if (usuario) {
    if (loginBtn) loginBtn.style.display = "none";

    if (!document.getElementById("welcomeUser")) {
      const header = document.querySelector("header");
      header.insertAdjacentHTML("beforeend", `
        <span id="welcomeUser" style="font-weight:600; color:#7c4dff; margin-left:10px;">
          Bienvenido, ${usuario.nombre} 👋
        </span>
      `);
    }
  }
}

function cerrarSesion() {
  localStorage.removeItem("usuario");
  location.reload();
}

function abrirCarrito() {
  window.location.href = "index.html#carrito";
}

document.addEventListener("DOMContentLoaded", actualizarHeaderGlobal);
