/*
DIGITAR npm start NO TERMINAL PARA INICIALIZAR O JSON SERVER
npm start 
*/

//Rolagem da tela
const navContainer = document.querySelector('.nav-container');
const navContainer2 = document.querySelector('.nav-container2');
const header = document.querySelector('header');
const navLinks = document.querySelectorAll('.nav-container ul li a');
navLinks.forEach(link => {
    link.addEventListener('click', scrollToSection); 
});
let lastClickedLink = null; 

function applyFinalPageTranslation(scrollY) {
    const pageHeight = document.documentElement.scrollHeight; 
    const windowHeight = window.innerHeight; 

    
    if (scrollY + windowHeight >= pageHeight) {
        navContainer.style.transform = 'translateY(-8%)'; 
    } else {
        
        navContainer.style.transform = 'translateY(-50%)'; 
    }
}

function updateNavPosition() {
    const scrollY = window.scrollY;

    
    if (scrollY > header.offsetHeight) {
        navContainer.classList.add('scrolled1');
    } else {
        
        navContainer.classList.remove('scrolled1');
    }

    
    const pageHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    if (scrollY + windowHeight >= pageHeight) {
        navContainer.classList.remove('scrolled');
        navContainer2.classList.add('scrolled'); 
    } else {
        
        navContainer.classList.add('scrolled');
        navContainer2.classList.remove('scrolled');
    }
}


navLinks.forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault(); 

        
        const targetId = this.getAttribute('href'); 
        const targetElement = document.querySelector(targetId);

        
        if (targetElement && targetElement.getBoundingClientRect().top === 0) {
            return; 
        }

        
        targetElement.scrollIntoView({
            behavior: 'smooth', 
            block: 'start' 
        });
    });
});


window.addEventListener('scroll', function() {
    requestAnimationFrame(updateNavPosition);
});


function scrollToSection(event) {
    event.preventDefault(); 

    const targetId = this.getAttribute('href');  
    const targetElement = document.querySelector(targetId);  

    
    targetElement.scrollIntoView({
        behavior: 'smooth', 
        block: 'start' 
    });
}

