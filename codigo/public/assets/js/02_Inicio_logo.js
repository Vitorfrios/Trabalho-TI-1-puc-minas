
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

// Função para deletar o usuário logado
async function deletarUsuarioLogado() {
    try {
        const usuarioLogadoResponse = await fetch('http://localhost:3000/usuario_logado');
        const usuarioLogado = await usuarioLogadoResponse.json();

        if (!usuarioLogadoResponse.ok || usuarioLogado.length === 0) {
            console.log('Nenhum usuário logado encontrado.');
            return;
        }

        const usuarioId = usuarioLogado[0].id;

        const response = await fetch(`http://localhost:3000/usuario_logado/${usuarioId}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Erro ao excluir o usuário logado');
        }

        console.log('Usuário logado excluído com sucesso!');
    } catch (error) {
        console.error('Erro ao tentar deletar o usuário logado:', error);
    }
}

if (!localStorage.getItem('paginaCarregada')) {
    localStorage.setItem('paginaCarregada', 'true');

    window.addEventListener('load', function () {
        deletarUsuarioLogado();
    });
}




