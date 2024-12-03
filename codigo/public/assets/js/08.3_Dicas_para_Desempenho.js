
/*
DIGITAR npm start NO TERMINAL PARA INICIALIZAR O JSON SERVER
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
        } else if (currentPage === '09_Perfil.html') {
            document.getElementById('perfil').classList.add('active');
        } else if (currentPage === '10_Suporte_Feedback.html') {
            document.getElementById('feedback').classList.add('active');
        }
    }

    highlightActiveItem();
});
// Função para carregar o nome do usuário logado
async function carregarNomeUsuarioLogado() {
    try {
        const usuarioLogadoResponse = await fetch('http://localhost:3000/usuario_logado');
        const usuarioLogado = await usuarioLogadoResponse.json();

        if (!usuarioLogadoResponse.ok || usuarioLogado.length === 0) {
            console.error('Usuário logado não encontrado!');
            return;
        }

        document.querySelector('.name').textContent = usuarioLogado[0].nome || 'Nome não encontrado';
    } catch (error) {
        console.error('Erro ao carregar o nome do usuário logado:', error);
    }
}

carregarNomeUsuarioLogado();


// ------------------- FIM DA SIDE BAR ------------------- //


let data;  
let numerosDisponiveis = [1, 2, 3, 4, 5]; 
let estaGirando = false;  

async function carregarDados() {  
    const response = await fetch('http://localhost:3000/tela3');  
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
    const itemCorrespondente = data.find(item => item.num === num);  

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



//------------ Codigo para contagem de tarefas --------------- //
async function atualizarContagemTarefas() {
    try {
        const respostaAdicionarTarefas = await fetch('http://localhost:4000/adicionarTarefas');
        const respostaListaDeTarefas = await fetch('http://localhost:4000/listaDeTarefas');
        
        const dadosAdicionarTarefas = await respostaAdicionarTarefas.json();
        const dadosListaDeTarefas = await respostaListaDeTarefas.json();

        let contagemTrabalho = 0;
        let contagemLazer = 0;
        let contagemEstudo = 0;

        dadosListaDeTarefas.forEach(tarefa => {
            switch (tarefa.category) {
                case 'Trabalho':
                    contagemTrabalho++;
                    break;
                case 'Lazer':
                    contagemLazer++;
                    break;
                case 'Estudo':
                    contagemEstudo++;
                    break;
            }
        });

        dadosAdicionarTarefas.forEach(tarefa => {
            switch (tarefa.category) {
                case 'Trabalho':
                    contagemTrabalho++;
                    break;
                case 'Lazer':
                    contagemLazer++;
                    break;
                case 'Estudo':
                    contagemEstudo++;
                    break;
            }
        });

        document.getElementById('trabalho').textContent = `Trabalho ${contagemTrabalho}`;
        document.getElementById('lazer').textContent = `Lazer ${contagemLazer}`;
        document.getElementById('estudo').textContent = `Estudo ${contagemEstudo}`;

    } catch (error) {
        console.error('Erro ao atualizar contagem de tarefas:', error);
    }
}


//---------- Codigo para a contagem de tempo --------------- //    
async function atualizarDuracaoEstimadas() {
    try {
        const respostaAdicionarTarefas = await fetch('http://localhost:4000/adicionarTarefas');
        const respostaListaDeTarefas = await fetch('http://localhost:4000/listaDeTarefas');
        
        const dadosAdicionarTarefas = await respostaAdicionarTarefas.json();
        const dadosListaDeTarefas = await respostaListaDeTarefas.json();

        let duracaoTrabalho = 0;
        let duracaoLazer = 0;
        let duracaoEstudo = 0;

        dadosListaDeTarefas.forEach(tarefa => {
            switch (tarefa.category) {
                case 'Trabalho':
                    duracaoTrabalho += tarefa.estimatedDuration;
                    break;
                case 'Lazer':
                    duracaoLazer += tarefa.estimatedDuration;
                    break;
                case 'Estudo':
                    duracaoEstudo += tarefa.estimatedDuration;
                    break;
            }
        });

        dadosAdicionarTarefas.forEach(tarefa => {
            switch (tarefa.category) {
                case 'Trabalho':
                    duracaoTrabalho += tarefa.estimatedDuration;
                    break;
                case 'Lazer':
                    duracaoLazer += tarefa.estimatedDuration;
                    break;
                case 'Estudo':
                    duracaoEstudo += tarefa.estimatedDuration;
                    break;
            }
        });

        function formatarDuracao(minutos) {
            return `${Math.floor(minutos / 60)}h`;
        }

        document.getElementById('trabalhoT').textContent = `Trabalho ${formatarDuracao(duracaoTrabalho)}`;
        document.getElementById('lazerT').textContent = `Lazer ${formatarDuracao(duracaoLazer)}`;
        document.getElementById('estudoT').textContent = `Estudo ${formatarDuracao(duracaoEstudo)}`;

    } catch (error) {
        console.error('Erro ao atualizar duração estimada das tarefas:', error);
    }
}


document.getElementById('atualizarDados').addEventListener('click', () => {
    atualizarContagemTarefas();
    atualizarDuracaoEstimadas();
});