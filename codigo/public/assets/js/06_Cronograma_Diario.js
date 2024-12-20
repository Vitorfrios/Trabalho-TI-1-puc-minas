
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

// ------------- FILTRO MENU --------------------- //

document.addEventListener('click', (event) => {
    if (!modalFiltro.contains(event.target) && event.target !== botaoFiltro) {
        modalFiltro.style.display = 'none';
    }
});
// ------------- FILTRO MENU --------------------- //
const botaoFiltro = document.getElementById('botaoFiltro');
const modalFiltro = document.getElementById('modalFiltro');
const aplicarFiltro = document.getElementById('aplicarFiltro');


botaoFiltro.addEventListener('click', (event) => {
    event.stopPropagation();
    modalFiltro.style.display = 'block';
    
    const rect = botaoFiltro.getBoundingClientRect();
    modalFiltro.style.left = `${rect.left + rect.width / 2 - modalFiltro.offsetWidth / 2}px`;
    modalFiltro.style.top = `${rect.top - modalFiltro.offsetHeight - 10}px`;
});


aplicarFiltro.addEventListener('click', async () => {
    const mesF = document.getElementById('meses').value;
    let anoF = document.getElementById('ano').value;
    
    
    if (!anoF) {
        anoF = new Date().getFullYear();
    }
    
    console.log("Mês selecionado:", mesF);
    console.log("Ano selecionado:", anoF);
    
    
    if (!mesF || !anoF) {
        alert("Por favor, selecione um mês e ano.");
        return;
    }
    
    try {
        
        const updatedData = {
            id: 2686,           
            value: parseInt(mesF),  
            year: parseInt(anoF)    
        };

        
        const response = await fetch('http://localhost:4000/mes_calendar/2686', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
        });

        
        if (response.ok) {
            console.log("Dados atualizados com sucesso!");
            alert("Filtro aplicado com sucesso!");
            modalFiltro.style.display = 'none';
        } else {
            console.error("Erro ao atualizar os dados:", response.statusText);
            alert("Erro ao atualizar os dados no servidor. Tente novamente.");
        }
    } catch (error) {
        console.error('Erro ao aplicar o filtro:', error);
        alert("Erro ao conectar ao servidor. Tente novamente.");
    }
});







// ------------- NAVEGAÇÃO SEMANAS DO MÊS ------------ //

let selectedMonth = new Date().getMonth(); 
let selectedYear = new Date().getFullYear();
let dataAtual = new Date(selectedYear, selectedMonth, 1); 

const diasDaSemana = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'];  

document.addEventListener('DOMContentLoaded', async () => {
    document.getElementById('meses').value = selectedMonth + 1;
    document.getElementById('ano').value = selectedYear; 
    await loadMonthYearFromServer(); 
    desenharCalendario(); 
});
// Função para navegar o ano
function navegarSemana(direcao) {  
    
    dataAtual.setDate(dataAtual.getDate() + (direcao * 7));  
    desenharCalendario();  
}  
function navegarMes(direcao) {  
   
    dataAtual.setMonth(dataAtual.getMonth() + direcao);  
    desenharCalendario();  
}  
desenharCalendario();  

// Inicializar  
document.getElementById("prevSemana").onclick = () => navegarSemana(-1);  
document.getElementById("nextSemana").onclick = () => navegarSemana(1);  
document.getElementById("prev").onclick = () => navegarMes(-1);  
document.getElementById("next").onclick = () => navegarMes(1);  


// Função para carregar o mês e ano do servidor
async function loadMonthYearFromServer() {
    try {
        const response = await fetch('http://localhost:4000/mes_calendar');
        if (response.ok) {
            const data = await response.json();
            const calendarData = data[0];
            selectedMonth = calendarData.value - 1;  
            selectedYear = calendarData.year;
            dataAtual = new Date(selectedYear, selectedMonth, 1); 
            desenharCalendario(); 
        } else {
            console.error("Erro ao carregar os dados do servidor:", response.statusText);
        }
    } catch (error) {
        console.error("Erro ao conectar ao servidor:", error);
    }
}

function desenharCalendario() {
    const ano = dataAtual.getFullYear();
    const mes = dataAtual.getMonth();
    const primeiroDiaDaSemana = new Date(ano, mes, dataAtual.getDate() - (dataAtual.getDay() === 0 ? 6 : dataAtual.getDay() - 1));
    const nomeMes = primeiroDiaDaSemana.toLocaleString('pt-BR', { month: 'long' });
    
    document.getElementById("month-year").innerText = nomeMes.charAt(0).toUpperCase() + nomeMes.slice(1);
    
    const primeiraData = primeiroDiaDaSemana.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const ultimaData = new Date(primeiroDiaDaSemana);
    ultimaData.setDate(primeiroDiaDaSemana.getDate() + 6);
    const ultimaDataFormatada = ultimaData.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });

    document.getElementById("semana").innerText = `Semana de ${primeiraData} a ${ultimaDataFormatada}`;
    
    
    for (let i = 0; i < 7; i++) {
        const diaSpan = document.querySelector(`.dia${diasDaSemana[i]}`);
        diaSpan.innerText = ""; 
    }  
    
    for (let i = 0; i < 7; i++) {  
        const diaAtual = new Date(primeiroDiaDaSemana);  
        diaAtual.setDate(primeiroDiaDaSemana.getDate() + i);  
        
        const diaSpan = document.querySelector(`.dia${diasDaSemana[i]}`); 
        const dia = String(diaAtual.getDate()).padStart(2, '0'); 
        const mes = String(diaAtual.getMonth() + 1).padStart(2, '0');  

        diaSpan.innerText = ` ${dia}/${mes} `; 
    }
    
    
    const tbody = document.getElementById("linhas_calendario");
    tbody.innerHTML = "";

    
    for (let hora = 0; hora < 24; hora++) {
        for (let minuto = 0; minuto < 60; minuto += 15) {
            const tr = document.createElement("tr");

            
            const tdHora = document.createElement("td");
            tdHora.id = "HOUR";
            tdHora.innerText = `${String(hora).padStart(2, '0')}:${String(minuto).padStart(2, '0')}`;
            tr.appendChild(tdHora);

            
            for (let dia = 0; dia < 7; dia++) {
                const tdDia = document.createElement("td");
                tr.appendChild(tdDia);
            }
            
            
            tbody.appendChild(tr);
        }
    }

    carregarTarefas();
}




function carregarTarefas() {  
    Promise.all([
        fetch('http://localhost:4000/listaDeTarefas'),
        fetch('http://localhost:4000/adicionarTarefas')
    ])
    .then(([responseListaDeTarefas, responseAdicionarTarefas]) => {
        if (!responseListaDeTarefas.ok) {
            throw new Error(`Erro ao carregar 'listaDeTarefas': ${responseListaDeTarefas.status}`);
        }
        if (!responseAdicionarTarefas.ok) {
            throw new Error(`Erro ao carregar 'adicionarTarefas': ${responseAdicionarTarefas.status}`);
        }

        return Promise.all([
            responseListaDeTarefas.json(),
            responseAdicionarTarefas.json()
        ]);
    })
    .then(([dataListaDeTarefas, dataAdicionarTarefas]) => {
        const tarefas = [...dataListaDeTarefas, ...dataAdicionarTarefas];
        const horas = document.querySelectorAll('#linhas_calendario tr');

        horas.forEach(hora => {
            for (let i = 1; i < hora.children.length; i++) { 
                hora.children[i].innerHTML = ''; 
            }
        });

        for (let dia = 0; dia < 7; dia++) {  
            tarefas.forEach(tarefa => {
                if (tarefa.date.includes(dia + 1)) {  
                    const horarioInicial = arredondarHorarioPara15Minutos(tarefa.time);  
                    let horaIndex = Array.from(horas).findIndex(row => row.firstChild.innerText === horarioInicial);  

                    if (horaIndex === -1) { 
                        horaIndex = criarLinhaHorario(horarioInicial);
                    }

                    const duracaoMinutos = Math.min(parseInt(tarefa.estimatedDuration), 1440);
                    const intervalos = Math.ceil(duracaoMinutos / 15);
                    const ultimoIntervaloIndex = horaIndex + intervalos - 1;

                    const cellInicio = horas[horaIndex].children[dia + 1];
                    cellInicio.classList.add('cursor-pointer');
                    const tarefaDiv = document.createElement('div');
                    tarefaDiv.classList.add('tarefa');
                    tarefaDiv.style.color = getColorForPriority(tarefa.priority);
                    tarefaDiv.innerText = tarefa.name;
                    cellInicio.appendChild(tarefaDiv);

                    tarefaDiv.addEventListener('click', () => {
                        abrirModalEdicao(tarefa);
                    });

                    let atualIndex = (horaIndex + intervalos - 1) % horas.length;
                    let atualDia = dia;

                    if (horaIndex + intervalos - 1 >= horas.length) {
                        atualDia = (dia + 1) % 7;
                    }

                    const cellFim = horas[atualIndex].children[atualDia + 1];
                    cellFim.classList.add('cursor-pointer');
                    const fimDiv = document.createElement('div');
                    fimDiv.classList.add('tarefa');
                    fimDiv.style.color = 'gray';
                    fimDiv.innerText = `${tarefa.name} - fim da tarefa`;
                    cellFim.appendChild(fimDiv);

                    fimDiv.addEventListener('click', () => {
                        abrirModalEdicao(tarefa);
                    });
                }
            });
        }
    })
    .catch(error => console.error('Erro ao carregar tarefas:', error));  
}


function arredondarHorarioPara15Minutos(horario) {
    let [hora, minuto] = horario.split(':').map(Number);
    minuto = Math.ceil(minuto / 15) * 15;
    if (minuto === 60) {
        minuto = 0;
        hora += 1;
    }
    return `${hora.toString().padStart(2, '0')}:${minuto.toString().padStart(2, '0')}`;
}

function criarLinhaHorario(horario) {
    const tbody = document.getElementById("linhas_calendario");
    const tr = document.createElement("tr");
    const tdHora = document.createElement("td");
    tdHora.id = "HOUR";
    tdHora.innerText = horario;
    tr.appendChild(tdHora);

    for (let dia = 0; dia < 7; dia++) {
        const tdDia = document.createElement("td");
        tr.appendChild(tdDia);
    }

    tbody.appendChild(tr);

    const linhas = Array.from(tbody.children);
    linhas.sort((a, b) => a.firstChild.innerText.localeCompare(b.firstChild.innerText));
    tbody.innerHTML = "";
    linhas.forEach(linha => tbody.appendChild(linha));

    return Array.from(tbody.children).findIndex(row => row.firstChild.innerText === horario);
}






function getColorForPriority(priority) {
    let color;
    switch (priority.toLowerCase()) {
        case 'alta': color = 'red'; break;
        case 'média': color = 'darkgoldenrod'; break;
        case 'baixa': color = 'darkgreen'; break;
        default: color = 'gray'; break;
    }
    return color;
}
// Função para abrir o modal de edição
function abrirModalEdicao(tarefa) {
    document.getElementById('modal-editar-tarefa').style.display = 'flex';
    document.getElementById('modal-overlay').style.display = 'block';

    document.getElementById('edit-nome').value = tarefa.name;
    document.getElementById('edit-time').value = tarefa.time;
    document.getElementById('edit-descricao').value = tarefa.description;
    document.getElementById('edit-prioridade').value = tarefa.priority;
    document.getElementById('edit-categoria').value = tarefa.category;
    document.getElementById('edit-estimated-duration').value = tarefa.estimatedDuration;

    const diasSelecionados = tarefa.date;
    for (let i = 1; i <= 7; i++) {
        const checkbox = document.getElementById(`edit-dias-${diasDaSemana[i - 1].toLowerCase()}`);
        checkbox.checked = diasSelecionados.includes(i);
    }

    tarefaEditando = tarefa;
    console.log('ID da tarefa:', tarefaEditando.id);
}

// Função para fechar o modal
function fecharModal() {
    document.getElementById('modal-editar-tarefa').style.display = 'none';
    document.getElementById('modal-overlay').style.display = 'none';  
}

// Função para salvar os dados editados
async function salvarDadosEditados() {
    if (!tarefaEditando) {
        console.error('Tarefa não encontrada.');
        alert('Erro: Tarefa não encontrada.');
        return;
    }

    const nome = document.getElementById('edit-nome').value;
    const time = document.getElementById('edit-time').value;
    const descricao = document.getElementById('edit-descricao').value;
    const prioridade = document.getElementById('edit-prioridade').value;
    const categoria = document.getElementById('edit-categoria').value;
    let duracao = parseInt(document.getElementById('edit-estimated-duration').value, 10);

    // Validação do limite de duração para 1440 minutos
    if (isNaN(duracao) || duracao < 0) {
        alert("A duração estimada deve ser um número válido.");
        return;
    }
    if (duracao > 1440) {
        alert("A duração estimada não pode ultrapassar 1440 minutos (24 horas).");
        return;
    }

    const diasSelecionados = [];
    for (let i = 1; i <= 7; i++) {
        const checkbox = document.getElementById(`edit-dias-${diasDaSemana[i - 1].toLowerCase()}`);
        if (checkbox.checked) {
            diasSelecionados.push(i);
        }
    }

    const dadosAtualizados = {
        name: nome,
        time: time,
        description: descricao,
        priority: prioridade,
        category: categoria,
        date: diasSelecionados,
        estimatedDuration: duracao
    };

    try {
        let response;
        
        
        const diferencaDuracao = duracao - tarefaEditando.estimatedDuration;

        
        const endpoint = tarefaEditando.id < 205 ? 'listaDeTarefas' : 'adicionarTarefas';
        const url = `http://localhost:4000/${endpoint}/${tarefaEditando.id}`;

        response = await fetch(url, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dadosAtualizados)
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Erro ao salvar dados:', errorText);
            throw new Error(`Erro ao salvar dados: ${errorText}`);
        }

        
        if (diferencaDuracao !== 0) {
            await atualizarGrafico(categoria, diferencaDuracao);
        }

        alert('Tarefa salva com sucesso!');
        fecharModal();
        desenharCalendario();
    } catch (error) {
        console.error('Erro ao salvar a tarefa:', error.message);
        alert(`Erro ao salvar a tarefa: ${error.message}`);
    }
}

// Função para atualizar o gráfico de tempo com a diferença de duração
async function atualizarGrafico(category, diferenca) {
    try {
        
        const response = await fetch("http://localhost:4000/grafico");
        if (!response.ok) {
            throw new Error(`Erro ao buscar gráfico de tempo: ${response.statusText}`);
        }
        
        const grafico = await response.json();

        
        if (grafico.hasOwnProperty(category)) {
            grafico[category] += diferenca;
            
            
            const updateResponse = await fetch("http://localhost:4000/grafico", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(grafico)
            });

            if (!updateResponse.ok) {
                throw new Error(`Erro ao atualizar gráfico de tempo: ${updateResponse.statusText}`);
            }

            console.log("Gráfico de tempo atualizado com a nova duração.");
        } else {
            throw new Error(`Categoria "${category}" não encontrada no gráfico.`);
        }
    } catch (error) {
        
        console.error("Erro ao atualizar gráfico de tempo:", error);
        alert(`Erro ao atualizar gráfico de tempo: ${error.message}`);
    }
}

// Função para remover a tarefa do servidor
async function removeTaskFromServer(taskId) {
    try {
        const normalizedTaskId = typeof taskId === 'number' ? taskId.toString() : taskId;
        const endpoint = parseInt(normalizedTaskId, 10) >= 205 ? 'adicionarTarefas' : 'listaDeTarefas';
        const url = `http://localhost:4000/${endpoint}/${normalizedTaskId}`;

        const response = await fetch(url, { method: 'DELETE', headers: { 'Content-Type': 'application/json' } });
        if (response.ok) {
            console.log(`Tarefa com ID ${normalizedTaskId} removida de ${url}`);
        } else {
            console.error(`Erro ao remover tarefa de ${url}:`, response.statusText);
        }
    } catch (error) {
        console.error('Erro ao remover a tarefa:', error);
    }
}

// Função para atualizar o gráfico de tempo após remoção
async function atualizarGraficoRemocao(category, estimatedDuration) {
    try {
        const response = await fetch("http://localhost:4000/grafico");
        const grafico = await response.json();

        if (grafico[category] !== undefined) {
            grafico[category] = Math.max(0, grafico[category] - estimatedDuration);

            await fetch("http://localhost:4000/grafico", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(grafico)
            });
            console.log("Gráfico de tempo atualizado após remoção.");
        }
    } catch (error) {
        console.error("Erro ao atualizar gráfico de tempo após remoção:", error);
    }
}

// Event listener para salvar os dados editados
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('btn-salvar').addEventListener('click', salvarDadosEditados);
});

// Função para fechar o modal ao clicar fora
document.getElementById("modal-overlay").onclick = fecharModal;
document.getElementById("fechar-modal").onclick = fecharModal;

// Adiciona um evento ao botão de remover
document.getElementById('btn-remover').addEventListener('click', async function() {
    if (!tarefaEditando) {
        console.error('Tarefa não encontrada.');
        alert('Erro: Tarefa não encontrada.');
        return;
    }

    const confirmarRemocao = confirm("Tem certeza que deseja remover esta tarefa?");
    if (!confirmarRemocao) return;

    try {
        
        await removeTaskFromServer(tarefaEditando.id);

        
        await atualizarGraficoRemocao(tarefaEditando.category, tarefaEditando.estimatedDuration);

        alert('Tarefa removida com sucesso!');
        fecharModal();
        desenharCalendario(); 
    } catch (error) {
        console.error('Erro ao remover a tarefa:', error.message);
        alert(`Erro ao remover a tarefa: ${error.message}`);
    }
});