// ===========================================
// DESPLAZAMIENTO SUAVE AL HACER CLIC EN ENLACES INTERNOS
// ===========================================
document.querySelectorAll('a[href^="#"]').forEach(enlace => {
    enlace.addEventListener('click', function (e) {
        e.preventDefault(); // Evita el salto instantáneo
        const destino = document.querySelector(this.getAttribute('href'));
        if (destino) {
            destino.scrollIntoView({
                behavior: 'smooth' // Hace que el scroll sea suave
            });
        }
    });
});

// ===========================================
// BOTÓN "DONAR AHORA" CON ALERTA SIMULADA
// ===========================================
const botonDonar = document.querySelector('.button[href="#"]');
if (botonDonar) {
    botonDonar.addEventListener('click', function (e) {
        e.preventDefault();
        alert("Gracias por tu interés en donar ❤️. Pronto activaremos este enlace.");
    });
}

// ===========================================
// CAMBIO DE ESTILO AL HACER SCROLL EN HEADER (si tuvieras uno fijo)
// ===========================================
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (header) {
        if (window.scrollY > 80) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
});

// ===========================================
// SECCIÓN INTERACTIVA: APARECER ELEMENTOS AL VERLOS (opcional)
// ===========================================
const observador = new IntersectionObserver(entradas => {
    entradas.forEach(entrada => {
        if (entrada.isIntersecting) {
            entrada.target.classList.add('visible');
        }
    });
});

document.querySelectorAll('.fade-in').forEach(elemento => {
    observador.observe(elemento);
});

// ===========================================
// FORMULARIO DE SUSCRIPCIÓN Y MENSAJE DE ÉXITO
// ===========================================
document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('formulario-unete');
    const mensajeExito = document.getElementById('mensajeExito');

    if (formulario && mensajeExito) {
        formulario.addEventListener('submit', (e) => {
            e.preventDefault();

            // Solo mostramos el mensaje de éxito
            mensajeExito.style.display = 'block';

            // Opcional: Oculta el mensaje y limpia los campos después de un tiempo
            setTimeout(() => {
                mensajeExito.style.display = 'none';
                formulario.reset(); // Aquí se limpian los campos
            }, 3000); // 3 segundos para que el usuario pueda leer el mensaje
        });
    }
});