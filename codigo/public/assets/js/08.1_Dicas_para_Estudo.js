
/*
COPIAR CODIGO NO TERMINAL PARA INICIALIZAR O JSON SERVER
npm start 
*/


document.addEventListener("DOMContentLoaded", function() {
    function highlightActiveItem() {
        const currentPage = window.location.pathname.split("/").pop(); 

        const items = document.querySelectorAll('.sidebar ul li, .sub-itens li');
        items.forEach(item => {
            item.classList.remove('active');
        });

        if (currentPage === '05_Dashboard.html') {
            document.getElementById('dashboard').classList.add('active');
        } else if (currentPage === '06_Cronograma_Diario.html') {
            document.getElementById('cronograma').classList.add('active');
        } else if (currentPage === '07_Criacao_Tarefas.html') {
            document.getElementById('tarefas').classList.add('active');
        } else if (currentPage === '07_Progresso.html') {
            document.getElementById('progresso').classList.add('active');
        } else if (currentPage === '08_Sugestao.html') {
            document.getElementById('sugestao').classList.add('active');
        } else if (currentPage === '08.1_Dicas_para_Estudo.html') {
            document.getElementById('dicas-estudo').classList.add('active');
            document.getElementById('sugestao').classList.add('active'); 
        } else if (currentPage === '08.2_Dicas_para_Dormir.html') {
            document.getElementById('dicas-dormir').classList.add('active');
            document.getElementById('sugestao').classList.add('active'); 
        } else if (currentPage === '08.3_Dicas_para_Desempenho.html') {
            document.getElementById('dicas-desempenho').classList.add('active');
            document.getElementById('sugestao').classList.add('active'); 
        } else if (currentPage === '10_Perfil.html') {
            document.getElementById('perfil').classList.add('active');
        } else if (currentPage === '11_Suporte_Feedback.html') {
            document.getElementById('feedback').classList.add('active');
        }
    }

    highlightActiveItem();
});
// Função para buscar o nome do último usuário cadastrado no arquivo db.json
fetch('/codigo/db/db.json')
  .then(response => response.json())
  .then(data => {
    if (data.usuarios && data.usuarios.length > 0) {
      const ultimoUsuario = data.usuarios[data.usuarios.length - 1];
      document.querySelector('.name').textContent = ultimoUsuario.nome;
    } else {
      console.error('Nenhum usuário encontrado no arquivo JSON.');
    }
  })
  .catch(error => console.error('Erro ao carregar o arquivo JSON:', error));

// ------------------- FIM DA SIDE BAR ------------------- //


{// ------------- Codigo para a roleta ------------- //
    let data;  
    let numerosDisponiveis = [1, 2, 3, 4, 5]; 
    let estaGirando = false;  

    async function carregarDados() {  
        const response = await fetch('/codigo/db/db.json');  
        data = await response.json();  
    }  

    carregarDados(); 

    function girarRoleta() {
        if (estaGirando) {
            return;  
        }

        if (!data) {  
            alert("Os dados ainda estão sendo carregados. Tente novamente mais tarde.");  
            return;  
        }  

        if (numerosDisponiveis.length === 0) {
            numerosDisponiveis = [1, 2, 3, 4, 5];
        }

        estaGirando = true;  

        const randomIndex = Math.floor(Math.random() * numerosDisponiveis.length); 
        const randomNum = numerosDisponiveis[randomIndex]; 

        numerosDisponiveis.splice(randomIndex, 1); 

        const roleta = document.getElementById("roleta-g");  
        const rotacao = randomNum * 72 + 720; 
        
        roleta.style.transition = "transform 2s ease-out";
        roleta.style.transform = `rotate(${rotacao}deg)`; 

        setTimeout(() => {  
            roleta.style.transition = "transform 1s ease-in";  
            roleta.style.transform = "rotate(0deg)";  
            mostrarResultado(randomNum);  
            estaGirando = false; 
        }, 2000);  
    }

    document.getElementById("roleta-g").addEventListener("click", girarRoleta);  

    document.getElementById("girar").addEventListener("click", girarRoleta);  

    function mostrarResultado(num) {  
        const resultadoDiv = document.getElementById("resultado");  
        const mostrarDicasDiv = document.querySelector(".mostrar-dicas"); 
        const itemCorrespondente = data.telas.tela2.find(item => item.num === num);  

        const titulo = itemCorrespondente.titulo || `Número ${num}`;
        document.getElementById("num-sorteado").innerText = titulo;  

        resultadoDiv.innerHTML = ''; 
        for (let i = 1; i <= 5; i++) {
            const texto = itemCorrespondente[`text${i}`];
            if (texto) {
                const li = document.createElement("li");
                li.textContent = texto;
                li.style.marginBottom = "10px"; 
                resultadoDiv.appendChild(li);
            }
        }

        const lastLi = resultadoDiv.lastElementChild;
        if (lastLi) {
            lastLi.style.marginBottom = "10px";
        }

        resultadoDiv.style.display = "block"; 
        mostrarDicasDiv.style.border = "2px solid #00a4cc"; 
        mostrarDicasDiv.style.borderRadius = "30px"; 



    }
} 


// ------------- CODIGO DO POMODORO ------------- //
let timerInterval;
let timeLeft;
let isRunning = false;

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
    const seconds = (timeLeft % 60).toString().padStart(2, '0');
    document.getElementById("timer").textContent = `${minutes}:${seconds}`;
}

function startTimer() {
    if (isRunning) return; 

    const timeInput = document.getElementById("timeInput").value;
    if (!isRunning && !timeLeft) {
        timeLeft = parseInt(timeInput) * 60;
    }

    if (timeLeft > 0) {
        isRunning = true;
        document.getElementById("pomodoroIconLeft").classList.add('rotating');
        document.getElementById("pomodoroIconRight").classList.add('rotating');

        timerInterval = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateTimerDisplay();
            } else {
                clearInterval(timerInterval);
                isRunning = false;
                document.getElementById("pomodoroIconLeft").classList.remove('rotating');
                document.getElementById("pomodoroIconRight").classList.remove('rotating');
                alert("Pomodoro finalizado! Hora de fazer uma pausa.");
            }
        }, 1000);
    }
}

function pauseTimer() {
    if (!isRunning) {
        startTimer();
    } else {
        clearInterval(timerInterval);
        isRunning = false;
        document.getElementById("pomodoroIconLeft").classList.remove('rotating');
        document.getElementById("pomodoroIconRight").classList.remove('rotating');
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    document.getElementById("timeInput").value = '';
    document.getElementById("timer").textContent = '00:00';
    document.getElementById("timeInput").disabled = false;
    document.getElementById("pomodoroIconLeft").classList.remove('rotating');
    document.getElementById("pomodoroIconRight").classList.remove('rotating');
}

document.getElementById("start").addEventListener("click", startTimer);
document.getElementById("pause").addEventListener("click", pauseTimer);
document.getElementById("reset").addEventListener("click", resetTimer);

document.getElementById("timeInput").addEventListener("input", () => {
    const timeInput = document.getElementById("timeInput").value;
    timeLeft = parseInt(timeInput) * 60;
    updateTimerDisplay();
});

timeLeft = 25 * 60;
updateTimerDisplay();
