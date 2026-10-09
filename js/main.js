// Script main.js
// Funcionalidades: Reloj digital con fecha y hora actual (DD/MM/YYYY HH:MM:SS),
// Conmutador de Modo Oscuro con persistencia (localStorage) y Botón "Ir arriba" (jQuery scroll animado).

/**
 * Inicializa el reloj digital en tiempo real con fecha y hora completa.
 * Formato requerido: DD/MM/YYYY HH:MM:SS
 * Actualiza cada segundo.
 */
function iniciarReloj() {
  const relojElemento = document.getElementById('reloj');
  if (!relojElemento) return;

  function actualizar() {
    const ahora = new Date();
    const dia = String(ahora.getDate()).padStart(2, '0');
    const mes = String(ahora.getMonth() + 1).padStart(2, '0');
    const anio = ahora.getFullYear();
    const horas = String(ahora.getHours()).padStart(2, '0');
    const minutos = String(ahora.getMinutes()).padStart(2, '0');
    const segundos = String(ahora.getSeconds()).padStart(2, '0');

    relojElemento.textContent = `${dia}/${mes}/${anio} ${horas}:${minutos}:${segundos}`;
  }

  // Ejecución inmediata e intervalo continuo cada segundo
  actualizar();
  setInterval(actualizar, 1000);
}

/**
 * Inicializa el conmutador de Modo Oscuro con persistencia en localStorage.
 */
function inicializarModoOscuro() {
  const btnToggle = document.getElementById('theme-toggle');
  const temaGuardado = localStorage.getItem('tema_blume') || localStorage.getItem('tema_portafolio');

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
      localStorage.setItem('tema_blume', esOscuro ? 'dark' : 'light');
      localStorage.setItem('tema_portafolio', esOscuro ? 'dark' : 'light');
      btnToggle.textContent = esOscuro ? 'Modo Claro' : 'Modo Oscuro';
      btnToggle.setAttribute('aria-label', esOscuro ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
    });
  }
}

/**
 * Inicializa el comportamiento del botón "Ir arriba" (#irArriba / .scrollup).
 * Muestra u oculta el botón según el scroll (> 100px) y anima el retorno al inicio en 600 ms.
 */
function inicializarBotonIrArriba() {
  if (typeof $ !== 'undefined') {
    // Mostrar u ocultar el botón según el scroll
    $(window).scroll(function () {
      if ($(this).scrollTop() > 100) {
        $('.scrollup').fadeIn();
      } else {
        $('.scrollup').fadeOut();
      }
    });

    // Animación para ir arriba al hacer clic
    $('.scrollup, #irArriba').off('click').on('click', function (e) {
      e.preventDefault();
      $('html, body').animate({ scrollTop: 0 }, 600); // 600 milisegundos de duración
    });
  } else {
    // Fallback con API nativa
    const btnSubir = document.querySelector('.scrollup') || document.getElementById('irArriba');
    if (!btnSubir) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        btnSubir.style.display = 'block';
      } else {
        btnSubir.style.display = 'none';
      }
    });

    btnSubir.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

// Inicializar scripts globales al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
  iniciarReloj();
  inicializarModoOscuro();
  inicializarBotonIrArriba();
});

// Soporte complementario para ejecución tras carga completa de jQuery
if (typeof $ !== 'undefined') {
  $(document).ready(function () {
    inicializarBotonIrArriba();
  });
}
