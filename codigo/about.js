
/*
COPIAR CODIGO NO TERMINAL PARA INICIALIZAR O JSON SERVER
npm start 
*/

const hourHand = document.querySelector('.hour-hand');
const minuteHand = document.querySelector('.minute-hand');
const secondHand = document.querySelector('.second-hand');

// ------------- FUNÇÂO PARA O RELÓGIO ------------- //
function setClock() {
    const now = new Date();
    const seconds = now.getSeconds() + now.getMilliseconds() / 1000;
    const minutes = now.getMinutes() + seconds / 60;

    const secondsDegrees = ((seconds / 60) * 360*20) + 90;
    const minutesDegrees = ((minutes / 60) * 360*500) + 90;

    secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
    minuteHand.style.transform = `rotate(${minutesDegrees}deg)`;

    requestAnimationFrame(setClock); 
}

setClock(); 





const navContainer = document.querySelector('.nav-container');
const header = document.querySelector('header');
const navLinks = document.querySelectorAll('.nav-container ul li a');

function updateNavPosition() {
    const scrollY = window.scrollY;

    // Verifica se o topo do cabeçalho está completamente fora da tela
    if (scrollY > header.offsetHeight) {
        navContainer.classList.add('scrolled');
    } else {
        navContainer.classList.remove('scrolled');
    }
}

// Adiciona evento de rolagem
window.addEventListener('scroll', function() {
    requestAnimationFrame(updateNavPosition);
});

// Adiciona evento de clique a todos os links dentro do nav-container
navLinks.forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault(); // Previne o comportamento padrão do link

        const targetId = this.getAttribute('href'); // Obtém o ID do alvo
        const targetElement = document.querySelector(targetId); // Seleciona o elemento alvo

        // Rola suavemente até o elemento alvo
        targetElement.scrollIntoView({
            behavior: 'smooth', // Rolagem suave
            block: 'start' // Alinha o topo do elemento ao topo da janela
        });

        // Opcional: Adiciona a classe 'scrolled' ao nav-container
        navContainer.classList.add('scrolled');
    });
});