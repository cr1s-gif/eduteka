document.addEventListener('DOMContentLoaded', () => {
  const acceptButton = document.getElementById('accept-cookies'); // Botón en el banner
  const banner = document.getElementById('cookie-banner'); // Banner de cookies

  if (acceptButton) {
    acceptButton.addEventListener('click', () => {
      fetch('/accept-cookies') // Envía una solicitud al backend para aceptar las cookies
        .then((response) => {
          if (response.ok) {
            // Oculta el banner una vez aceptadas las cookies
            banner.style.display = 'none';
          } else {
            console.error('Error al aceptar las cookies.');
          }
        })
        .catch((error) => {
          console.error('Error al comunicarse con el servidor:', error);
        });
    });
  }
});
