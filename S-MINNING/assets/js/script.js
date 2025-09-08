// Detecta si la página actual está dentro de la carpeta "pages"
const basePath = window.location.pathname.includes('/pages/')
    ? '../components/' // Si está en /pages/, sube un nivel y entra a /components/
    : 'components/';   // Si está en la raíz, usa la carpeta directamente

// Cargar el Header
fetch(basePath + 'header.html')
    .then(response => {
        if (!response.ok) {
            throw new Error('No se pudo cargar el header');
        }
        return response.text();
    })
    .then(data => {
        document.getElementById('header').innerHTML = data;
    })
    .catch(error => console.error(error));

// Cargar el Footer
fetch(basePath + 'footer.html')
    .then(response => {
        if (!response.ok) {
            throw new Error('No se pudo cargar el footer');
        }
        return response.text();
    })
    .then(data => {
        document.getElementById('footer').innerHTML = data;
    })
    .catch(error => console.error(error));
    

    

    // Lógica para el formulario de contacto
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');

    if (contactForm && successMessage) {
        contactForm.addEventListener('submit', function(event) {
            // Previene el envío del formulario y la recarga de la página
            event.preventDefault();

            // Oculta el formulario
            contactForm.style.display = 'none';

            // Muestra el mensaje de éxito
            successMessage.style.display = 'block';

            // Opcional: restablecer y mostrar el formulario nuevamente después de 5 segundos
            setTimeout(() => {
                contactForm.reset();
                successMessage.style.display = 'none';
                contactForm.style.display = 'flex'; // Ajusta esto según tu CSS para mostrarlo de nuevo
            }, 5000); // 5000 milisegundos = 5 segundos
        });
    }
