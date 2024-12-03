
/*
DIGITAR npm start NO TERMINAL PARA INICIALIZAR O JSON SERVER
npm start 
*/

// ------------------- SIDE BAR CODIGO ------------------- //

// Marcar a aba ativa na sidebar
document.addEventListener("DOMContentLoaded", function() {
    function highlightActiveItem() {
        const currentPage = window.location.pathname.split("/").pop(); 

        const items = document.querySelectorAll('.sidebar ul li');
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
// ------------------- CODIGO DO SUPORTE -----------------//
let lastFeedbackId = 0;
let lastSuporteId = 0;

// Verifica os IDs existentes no servidor ao carregar a página
async function initializeIds() {
    try {
        const response = await fetch('http://localhost:3000/feedback');
        const feedbacks = await response.json();

        
        const feedbackIds = feedbacks
            .filter(f => f.tipo === "feedback")
            .map(f => parseInt(f.id.replace("feedback", "")));
        const suporteIds = feedbacks
            .filter(f => f.tipo === "suporte")
            .map(f => parseInt(f.id.replace("suporte", "")));

        
        lastFeedbackId = feedbackIds.length > 0 ? Math.max(...feedbackIds) : 0;
        lastSuporteId = suporteIds.length > 0 ? Math.max(...suporteIds) : 0;

        
        localStorage.setItem('lastFeedbackId', lastFeedbackId);
        localStorage.setItem('lastSuporteId', lastSuporteId);
    } catch (error) {
        console.error("Erro ao inicializar os IDs:", error);
    }
}

// Função de envio
function enviarFeedback() {
    const tipo = document.getElementById('tipo').value;
    const mensagem = document.getElementById('mensagem').value;

    if (!mensagem) {
        alert("Por favor, escreva sua mensagem antes de enviar.");
        return;
    }

    let id;
    if (tipo === "feedback") {
        lastFeedbackId++; 
        id = `feedback${lastFeedbackId}`;
        localStorage.setItem('lastFeedbackId', lastFeedbackId); 
    } else if (tipo === "suporte") {
        lastSuporteId++; 
        id = `suporte${lastSuporteId}`;
        localStorage.setItem('lastSuporteId', lastSuporteId); 
    } else {
        alert("Selecione um tipo de feedback antes de enviar.");
        return;
    }

    const feedbackData = {
        id,
        tipo,
        mensagem,
        data: new Date().toISOString()
    };

    fetch('http://localhost:3000/feedback', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(feedbackData)
    })
    .then(response => response.json())
    .then(data => {
        // Alerta com mensagem personalizada dependendo do tipo
        if (tipo === "feedback") {
            alert("Seu feedback foi enviado com sucesso!");
        } else if (tipo === "suporte") {
            alert("Seu pedido de suporte foi enviado com sucesso!");
        }
        document.getElementById('suporteForm').reset();
    })
    .catch(error => {
        console.error("Erro ao enviar feedback:", error);
        alert("Erro ao enviar feedback. Tente novamente.");
    });
}


// Inicializa os IDs ao carregar a página
initializeIds();


// -------------- CODIGO DAS SOLUÇÕES RAPIDAS -------------- //
function exibirConteudo() {
    const opcaoSelecionada = document.getElementById('opcoes').value.trim();  
    console.log('Opção selecionada:', opcaoSelecionada); 

    if (!opcaoSelecionada) {
        document.getElementById('conteudo-exibicao').innerHTML = '';
        document.getElementById('conteudo-exibicao').style.border = 'none';
        return;
    }

    fetch('http://localhost:3000/conteudo')  
        .then(response => response.json())
        .then(data => {
            console.log('Dados recebidos:', data); 

            const conteudoExibicao = document.getElementById('conteudo-exibicao');
            conteudoExibicao.innerHTML = '';

            
            if (data && data[opcaoSelecionada]) {
                const conteudo = data[opcaoSelecionada];

               
                if (conteudo.topicos && Array.isArray(conteudo.topicos)) {
                    conteudoExibicao.style.border = '3px solid #210af3';
                    conteudo.topicos.forEach(topico => {
                        const p = document.createElement('p');
                        p.textContent = "• " + topico;
                        conteudoExibicao.appendChild(p);
                    });
                } else {
                    conteudoExibicao.style.border = 'none';
                }
            } else {
                
                conteudoExibicao.innerHTML = '<p>Conteúdo não encontrado.</p>';
                conteudoExibicao.style.border = 'none';
            }

            conteudoExibicao.style.maxWidth = '100%';
        })
        .catch(error => {
            console.error('Erro ao carregar o conteúdo:', error);
            document.getElementById('conteudo-exibicao').style.border = 'none';
        });
}




