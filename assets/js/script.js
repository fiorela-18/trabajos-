// ========= Cargar header y footer =========
document.addEventListener('DOMContentLoaded', () => {
  const loadHTML = (elementId, filePath) => {
    fetch(filePath)
      .then(r => {
        if (!r.ok) throw new Error(`Error al cargar ${filePath}: ${r.status} ${r.statusText}`);
        return r.text();
      })
      .then(html => { document.getElementById(elementId).innerHTML = html; })
      .catch(err => console.error('Fetch header/footer:', err));
  };

  // Rutas relativas pensadas para /index.html y /pages/*.html
  loadHTML('header-placeholder', '../componentes/header.html');
  loadHTML('footer-placeholder', '../componentes/footer.html');
});

// ========= WhatsApp con delegación (no rompe si el botón no existe aún) =========
document.addEventListener('click', (e) => {
  const btn = e.target.closest('#whatsapp-btn');
  if (!btn) return;

  e.preventDefault();

  // Toma los campos sólo si existen (si no, no hace nada y no rompe)
  const nombreEl         = document.getElementById('nombre-completo');
  const telefonoEl       = document.getElementById('telefono');
  const fechaEntradaEl   = document.getElementById('fecha-entrada');
  const fechaSalidaEl    = document.getElementById('fecha-salida');
  const tipoHabitacionEl = document.getElementById('tipo-habitacion');
  const mensajeAdicEl    = document.getElementById('mensaje-adicional');

  if (!nombreEl || !telefonoEl || !fechaEntradaEl || !fechaSalidaEl) {
    console.warn('Botón WhatsApp clicado, pero el formulario no está en esta página.');
    return;
  }

  const nombre         = nombreEl.value.trim();
  const telefono       = telefonoEl.value.trim();
  const fechaEntrada   = fechaEntradaEl.value;
  const fechaSalida    = fechaSalidaEl.value;
  const tipoHabitacion = (tipoHabitacionEl && tipoHabitacionEl.value) || 'No especificado';
  const mensajeAdic    = (mensajeAdicEl && mensajeAdicEl.value.trim()) || 'No hay mensaje';

  const mensaje = `¡Hola! Me gustaría hacer una reserva.

*Nombre:* ${nombre}
*Teléfono:* ${telefono}
*Fecha de Entrada:* ${fechaEntrada}
*Fecha de Salida:* ${fechaSalida}
*Tipo de Habitación:* ${tipoHabitacion}
*Mensaje Adicional:* ${mensajeAdic}`;

  const numeroTelefono = '949265128';
  const url = `https://api.whatsapp.com/send?phone=${numeroTelefono}&text=${encodeURIComponent(mensaje)}`;
  window.open(url, '_blank');
});

// ========= Carrusel =========
document.addEventListener('DOMContentLoaded', () => {
  console.log('Script de carrusel cargado. Buscando elementos...');

  const carouselTrack = document.querySelector('.carousel-track');
  const nextButton    = document.querySelector('.carousel-btn.next');
  const prevButton    = document.querySelector('.carousel-btn.prev');

  if (!carouselTrack || !nextButton || !prevButton) {
    console.error('Carrusel: faltan elementos .carousel-track o botones .carousel-btn.next/.prev');
    return;
  }

  const slides = Array.from(carouselTrack.children).filter(el => el.classList.contains('room-showcase'));
  if (!slides.length) {
    console.error('Carrusel: no hay .room-showcase dentro de .carousel-track');
    return;
  }

  let slideWidth = slides[0].getBoundingClientRect().width;
  let currentSlideIndex = 0;

  const updateCarousel = () => {
    carouselTrack.style.transform = `translateX(-${slideWidth * currentSlideIndex}px)`;
  };

  nextButton.addEventListener('click', () => {
    currentSlideIndex = (currentSlideIndex + 1) % slides.length;
    updateCarousel();
  });

  prevButton.addEventListener('click', () => {
    currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
    updateCarousel();
  });

  window.addEventListener('resize', () => {
    slideWidth = slides[0].getBoundingClientRect().width;
    updateCarousel();
  });

  // Posición inicial
  updateCarousel();
  console.log(`Carrusel listo (${slides.length} diapositivas).`);
});

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.btn-outline').forEach(button => {
        button.addEventListener('click', (event) => {
            const targetId = event.target.closest('.btn-outline').dataset.target;
            const detailsElement = document.getElementById(targetId);

            if (detailsElement) {
                detailsElement.classList.add('show');
            }
        });
    });

    document.querySelectorAll('.btn-close-details').forEach(button => {
        button.addEventListener('click', (event) => {
            const detailsElement = event.target.closest('.gallery-details');
            if (detailsElement) {
                detailsElement.classList.remove('show');
            }
        });
    });
});