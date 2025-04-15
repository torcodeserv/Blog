// Script para resaltar la sección actual al desplazarse
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.sidebar a');
    
    function highlightCurrentSection() {
        let currentSectionId = '';
        let minDistance = Infinity;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const distance = Math.abs(sectionTop - window.scrollY - 100);
            
            if (distance < minDistance) {
                minDistance = distance;
                currentSectionId = section.id;
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentSectionId) {
                link.classList.add('active');
            }
        });
    }
    
    // Añadir comportamiento de desplazamiento suave al hacer clic en los enlaces
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 20,
                behavior: 'smooth'
            });
            
            // Actualizar la URL con el hash
            history.pushState(null, null, targetId);
        });
    });
    
    window.addEventListener('scroll', highlightCurrentSection);
    highlightCurrentSection(); // Llamar al inicio para establecer el estado inicial
});