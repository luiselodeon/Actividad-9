// Script main.js
// Funcionalidades: Reloj digital en tiempo real y Modo Oscuro con persistencia

/**
 * Inicializa el reloj digital en tiempo real.
 * Actualiza hora, minutos y segundos cada segundo.
 */
function iniciarReloj() {
  const relojElemento = document.getElementById('reloj');
  if (!relojElemento) return;

  function actualizar() {
    const ahora = new Date();
    const horas = String(ahora.getHours()).padStart(2, '0');
    const minutos = String(ahora.getMinutes()).padStart(2, '0');
    const segundos = String(ahora.getSeconds()).padStart(2, '0');
    relojElemento.textContent = `${horas}:${minutos}:${segundos}`;
  }

  // Ejecucion inicial inmediata y posterior intervalo cada segundo
  actualizar();
  setInterval(actualizar, 1000);
}

/**
 * Inicializa el conmutador de Modo Oscuro con persistencia en localStorage.
 */
function inicializarModoOscuro() {
  const btnToggle = document.getElementById('theme-toggle');
  const temaGuardado = localStorage.getItem('tema_portafolio');

  // Aplicar tema previo guardado si existe
  if (temaGuardado === 'dark') {
    document.body.classList.add('dark-mode');
    if (btnToggle) {
      btnToggle.textContent = 'Modo Claro';
      btnToggle.setAttribute('aria-label', 'Cambiar a modo claro');
    }
  } else if (btnToggle) {
    btnToggle.textContent = 'Modo Oscuro';
    btnToggle.setAttribute('aria-label', 'Cambiar a modo oscuro');
  }

  // Manejador del evento clic para alternar tema
  if (btnToggle) {
    btnToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const esOscuro = document.body.classList.contains('dark-mode');
      localStorage.setItem('tema_portafolio', esOscuro ? 'dark' : 'light');
      btnToggle.textContent = esOscuro ? 'Modo Claro' : 'Modo Oscuro';
      btnToggle.setAttribute('aria-label', esOscuro ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
    });
  }
}

// Inicializar scripts globales al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
  iniciarReloj();
  inicializarModoOscuro();
});
