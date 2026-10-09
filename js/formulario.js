// Script formulario.js
// Funcionalidades: Validación de Formularios (JavaScript & jQuery),
// Animación de sacudida (shake) en campo erróneo usando colores de acento (#59c13d),
// y Validación interactiva en tiempo real con manipulación del DOM (parent, siblings, slideDown/slideUp).

// Color de acento según instrucciones del negocio para resaltar errores y estados
const COLOR_ACENTO_ERROR = '#59c13d';

/**
 * Aplica una animacion de sacudida (shake) visual con jQuery sobre el campo con error
 * y muestra la alerta contextual y el mensaje descriptivo.
 * @param {jQuery} $campo - Elemento jQuery del campo con error
 * @param {string} mensaje - Mensaje descriptivo del error
 */
function animarCampoErroneo($campo, mensaje) {
  if (!$campo || $campo.length === 0) return;

  // Enfocar el elemento con error
  $campo.focus();

  // Manipulación DOM: parent() para resaltar borde con color de acento y siblings() para mostrar mensaje
  const $parent = $campo.closest('.form-field');
  $parent.addClass('field-has-error').css('border-left', `4px solid ${COLOR_ACENTO_ERROR}`);
  $parent.find('.field-error-msg').text(mensaje).slideDown(200);

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
 * Valida los 4 campos obligatorios (Nombre, Correo, Asunto, Mensaje) antes de procesar el envío.
 * @param {Event} event - Evento del submit del formulario
 */
function validarFormulario(event) {
  if (event) event.preventDefault();

  const inputNombre = document.getElementById('nombre');
  const inputCorreo = document.getElementById('correo');
  const inputAsunto = document.getElementById('asunto');
  const inputMensaje = document.getElementById('mensaje');

  const nombre = inputNombre ? inputNombre.value.trim() : '';
  const correo = inputCorreo ? inputCorreo.value.trim() : '';
  const asunto = inputAsunto ? inputAsunto.value.trim() : '';
  const mensaje = inputMensaje ? inputMensaje.value.trim() : '';

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

  // 3. Validación de Asunto: obligatorio y mínimo 4 caracteres
  if (!asunto) {
    animarCampoErroneo($('#asunto'), 'Por favor, ingresa el asunto de tu consulta o reservación.');
    return false;
  }
  if (asunto.length < 4) {
    animarCampoErroneo($('#asunto'), 'El asunto es muy corto: debe tener al menos 4 caracteres.');
    return false;
  }

  // 4. Validación de Mensaje: obligatorio y mínimo 10 caracteres
  if (!mensaje) {
    animarCampoErroneo($('#mensaje'), 'Por favor, escribe un mensaje o detalle de tu reservación.');
    return false;
  }
  if (mensaje.length < 10) {
    animarCampoErroneo($('#mensaje'), 'El mensaje es muy breve: debe contener al menos 10 caracteres.');
    return false;
  }

  // Éxito: notificación y reseteo del formulario
  alert('Formulario completado');

  const formElement = (event && event.target) ? event.target : document.querySelector('#formulario form, #formContacto, form');
  if (formElement && typeof formElement.reset === 'function') {
    formElement.reset();
  }

  // Limpiar cualquier estado de error residual en el DOM
  $('input, textarea').removeClass('input-error');
  $('.form-field').removeClass('field-has-error').css('border-left', 'none');
  $('.field-error-msg').slideUp(200);

  return true;
}

// Vinculación de eventos interactivos con jQuery al cargar el documento
$(document).ready(function () {
  const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // 1. Validación interactiva en tiempo real al escribir en Nombre
  $('#nombre').on('keyup input', function () {
    const texto = $(this).val().trim();
    const $parent = $(this).closest('.form-field');
    const $msg = $parent.find('.field-error-msg');

    if (texto.length > 0 && texto.length <= 3) {
      $parent.addClass('field-has-error').css('border-left', `4px solid ${COLOR_ACENTO_ERROR}`);
      $msg.text('El nombre no es válido: debe tener más de 3 caracteres.').slideDown(200);
      $(this).addClass('input-error');
    } else {
      $parent.removeClass('field-has-error').css('border-left', 'none');
      $msg.slideUp(200);
      $(this).removeClass('input-error');
    }
  });

  // 2. Validacion interactiva en tiempo real al escribir en el campo Correo
  $('#correo').on('keyup input', function () {
    const texto = $(this).val().trim();
    const $parent = $(this).closest('.form-field');
    const $msg = $parent.find('.field-error-msg');

    if (texto.length > 0 && !regexCorreo.test(texto)) {
      $parent.addClass('field-has-error').css('border-left', `4px solid ${COLOR_ACENTO_ERROR}`);
      $msg.text('El correo no es válido: ingresa un formato como usuario@dominio.com.').slideDown(200);
      $(this).addClass('input-error');
    } else {
      $parent.removeClass('field-has-error').css('border-left', 'none');
      $msg.slideUp(200);
      $(this).removeClass('input-error');
    }
  });

  // 3. Validación interactiva en tiempo real al escribir en Asunto
  $('#asunto').on('keyup input', function () {
    const texto = $(this).val().trim();
    const $parent = $(this).closest('.form-field');
    const $msg = $parent.find('.field-error-msg');

    if (texto.length > 0 && texto.length < 4) {
      $parent.addClass('field-has-error').css('border-left', `4px solid ${COLOR_ACENTO_ERROR}`);
      $msg.text('El asunto debe tener al menos 4 caracteres.').slideDown(200);
      $(this).addClass('input-error');
    } else {
      $parent.removeClass('field-has-error').css('border-left', 'none');
      $msg.slideUp(200);
      $(this).removeClass('input-error');
    }
  });

  // 4. Validación interactiva en tiempo real al escribir en Mensaje
  $('#mensaje').on('keyup input', function () {
    const texto = $(this).val().trim();
    const $parent = $(this).closest('.form-field');
    const $msg = $parent.find('.field-error-msg');

    if (texto.length > 0 && texto.length < 10) {
      $parent.addClass('field-has-error').css('border-left', `4px solid ${COLOR_ACENTO_ERROR}`);
      $msg.text('El mensaje debe contener al menos 10 caracteres.').slideDown(200);
      $(this).addClass('input-error');
    } else {
      $parent.removeClass('field-has-error').css('border-left', 'none');
      $msg.slideUp(200);
      $(this).removeClass('input-error');
    }
  });

  // Manejador del evento submit en cualquier formulario de contacto
  $('#formulario form, #formContacto, form').on('submit', validarFormulario);
});
