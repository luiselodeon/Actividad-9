// Script formulario.js
// Funcionalidades: Validacion de Formularios (JavaScript), Animacion de campo erroneo (jQuery)
// y Validacion interactiva en tiempo real con manipulacion DOM (jQuery parent y slideDown/slideUp)

/**
 * Aplica una animacion de sacudida (shake) visual con jQuery sobre el campo con error
 * y muestra la alerta contextual.
 * @param {jQuery} $campo - Elemento jQuery del campo con error
 * @param {string} mensaje - Mensaje descriptivo del error
 */
function animarCampoErroneo($campo, mensaje) {
  // Enfocar el elemento con error
  $campo.focus();

  // Manipulacion DOM: parent() para resaltar borde y siblings() para mostrar mensaje descriptivo
  $campo.parent('.form-field').css('border-left', '4px solid #B81424');
  $campo.siblings('.field-error-msg').text(mensaje).slideDown(200);

  // Animacion visual de sacudida (shake) mediante jQuery y resalte de borde
  $campo
    .addClass('input-error')
    .stop(true, true)
    .animate({ marginLeft: '-12px' }, 70)
    .animate({ marginLeft: '12px' }, 70)
    .animate({ marginLeft: '-8px' }, 70)
    .animate({ marginLeft: '8px' }, 70)
    .animate({ marginLeft: '0px' }, 70);

  // Notificar al usuario mediante alerta
  alert(mensaje);
}

/**
 * Valida los campos requeridos y formatos antes de procesar el formulario.
 * @param {Event} event - Evento del submit del formulario
 */
function validarFormulario(event) {
  if (event) event.preventDefault();

  const inputNombre = document.getElementById('nombre');
  const inputCorreo = document.getElementById('correo');
  const inputEdad = document.getElementById('mensaje'); // Campo de edad (id="mensaje")
  const inputEstado = document.getElementById('estado');

  const nombre = inputNombre ? inputNombre.value.trim() : '';
  const correo = inputCorreo ? inputCorreo.value.trim() : '';
  const edadValor = inputEdad ? inputEdad.value.trim() : '';
  const edad = Number(edadValor);
  const estado = inputEstado ? inputEstado.value : '';
  const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // 1. Validacion de Nombre: obligatorio y mayor a 3 caracteres
  if (!nombre) {
    animarCampoErroneo($('#nombre'), 'Por favor, ingresa tu nombre completo.');
    return false;
  }
  if (nombre.length <= 3) {
    animarCampoErroneo($('#nombre'), 'El nombre no es válido: debe tener más de 3 caracteres.');
    return false;
  }

  // 2. Validacion de Correo: obligatorio y formato valido
  if (!correo) {
    animarCampoErroneo($('#correo'), 'Por favor, ingresa tu correo electrónico.');
    return false;
  }
  if (!regexCorreo.test(correo)) {
    animarCampoErroneo($('#correo'), 'El correo no es válido: ingresa un formato como usuario@dominio.com.');
    return false;
  }

  // 3. Validacion de Edad: obligatoria, numerica, mayor a 15 y menor a 100 anos
  if (!edadValor) {
    animarCampoErroneo($('#mensaje'), 'Por favor, ingresa tu edad.');
    return false;
  }
  if (isNaN(edad) || edad <= 15 || edad >= 100) {
    animarCampoErroneo($('#mensaje'), 'La edad no es válida: debe ser mayor a 15 y menor a 100 años.');
    return false;
  }

  // 4. Validacion de Lista desplegable: seleccion obligatoria
  if (!estado) {
    animarCampoErroneo($('#estado'), 'Por favor, selecciona a qué te dedicas actualmente.');
    return false;
  }

  // Exito: alerta requerida y reseteo del formulario
  alert('Formulario completado');

  const formElement = document.querySelector('#formulario form');
  if (formElement) formElement.reset();

  // Limpiar cualquier estado de error residual
  $('input, select').removeClass('input-error');
  $('.form-field').css('border-left', 'none');
  $('.field-error-msg').slideUp(200);

  return true;
}

// Vinculacion de eventos con jQuery al cargar el documento
$(document).ready(function () {
  const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // 1. Validacion interactiva en tiempo real al escribir en el campo Nombre
  $('#nombre').on('keyup input', function () {
    let texto = $(this).val().trim();
    let $mensaje = $('#msg-nombre');

    if (texto.length > 0 && texto.length <= 3) {
      // Manipulacion DOM: parent()
      $(this).parent('.form-field').css('border-left', '4px solid #B81424');
      $mensaje.text('El nombre no es válido: debe tener más de 3 caracteres.').slideDown(200);
    } else {
      $(this).parent('.form-field').css('border-left', 'none');
      $mensaje.slideUp(200);
      $(this).removeClass('input-error');
    }
  });

  // 2. Validacion interactiva en tiempo real al escribir en el campo Correo
  $('#correo').on('keyup input', function () {
    let texto = $(this).val().trim();
    let $mensaje = $('#msg-correo');

    if (texto.length > 0 && !regexCorreo.test(texto)) {
      // Manipulacion DOM: parent()
      $(this).parent('.form-field').css('border-left', '4px solid #B81424');
      $mensaje.text('El correo no es válido: ingresa un formato como usuario@dominio.com.').slideDown(200);
    } else {
      $(this).parent('.form-field').css('border-left', 'none');
      $mensaje.slideUp(200);
      $(this).removeClass('input-error');
    }
  });

  // 3. Validacion interactiva en tiempo real al escribir en el campo Edad
  $('#mensaje').on('keyup input', function () {
    let texto = $(this).val().trim();
    let $mensaje = $('#msg-mensaje');
    let edad = Number(texto);

    if (texto.length > 0 && (isNaN(edad) || edad <= 15 || edad >= 100)) {
      // Manipulacion DOM: parent()
      $(this).parent('.form-field').css('border-left', '4px solid #B81424');
      $mensaje.text('La edad no es válida: debe ser un número mayor a 15 y menor a 100 años.').slideDown(200);
    } else {
      $(this).parent('.form-field').css('border-left', 'none');
      $mensaje.slideUp(200);
      $(this).removeClass('input-error');
    }
  });

  // 4. Validacion interactiva al cambiar la opcion en la lista desplegable
  $('#estado').on('change', function () {
    let valor = $(this).val();
    let $mensaje = $('#msg-estado');

    if (!valor) {
      // Manipulacion DOM: parent()
      $(this).parent('.form-field').css('border-left', '4px solid #B81424');
      $mensaje.text('Por favor, selecciona a qué te dedicas actualmente.').slideDown(200);
    } else {
      $(this).parent('.form-field').css('border-left', 'none');
      $mensaje.slideUp(200);
      $(this).removeClass('input-error');
    }
  });

  // Manejador del evento submit en el formulario
  $('#formulario form').on('submit', validarFormulario);
});
