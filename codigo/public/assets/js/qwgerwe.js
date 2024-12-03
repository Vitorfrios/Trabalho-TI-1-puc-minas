async function loadTasks(dayOfWeek) {
    try {
        // Realiza as duas chamadas fetch para carregar os dados dos dois endpoints
        const [responseListaDeTarefas, responseAdicionarTarefas] = await Promise.all([
            fetch('http://localhost:4000/listaDeTarefas'),
            fetch('http://localhost:4000/adicionarTarefas')
        ]);

        // Verifica se as respostas das requisições são válidas
        if (!responseListaDeTarefas.ok) throw new Error(`Erro ao carregar 'listaDeTarefas': status ${responseListaDeTarefas.status}`);
        if (!responseAdicionarTarefas.ok) throw new Error(`Erro ao carregar 'adicionarTarefas': status ${responseAdicionarTarefas.status}`);

        // Converte as respostas para JSON
        const dataListaDeTarefas = await responseListaDeTarefas.json();
        const dataAdicionarTarefas = await responseAdicionarTarefas.json();

        // Verifica se os dados foram carregados corretamente
        if (!dataListaDeTarefas || !dataAdicionarTarefas) {
            throw new Error("Estruturas de dados 'listaDeTarefas' ou 'adicionarTarefas' não encontradas no JSON.");
        }

        const taskList = document.querySelector(".task-list");
        const notice = document.querySelector('.empty');

        taskList.innerHTML = '';
        notice.innerHTML = '';  

        let tasksFound = false;
        let tasksForTheDay = [];
        let categoryDurations = {
            Lazer: 0,
            Estudo: 0,
            Trabalho: 0,
        };

        // Carrega as tarefas de 'listaDeTarefas'
        if (Array.isArray(dataListaDeTarefas)) {
            dataListaDeTarefas.forEach(task => {
                if (task.date.includes(dayOfWeek + 1)) {
                    tasksForTheDay.push(task);
                    tasksFound = true;
                    categoryDurations[task.category] += task.estimatedDuration;
                }
            });
        }

        // Carrega as tarefas de 'adicionarTarefas'
        if (Array.isArray(dataAdicionarTarefas)) {
            dataAdicionarTarefas.forEach(task => {
                // Não há lógica de data ou recursão aqui, apenas carregando as tarefas
                tasksForTheDay.push(task);
                tasksFound = true;
                categoryDurations[task.category] += task.estimatedDuration;
            });
        }

        // Ordena as tarefas pela hora
        tasksForTheDay.sort((a, b) => convertTimeToNumber(a.time) - convertTimeToNumber(b.time));

        // Adiciona as tarefas na lista
        tasksForTheDay.forEach(task => {
            taskList.appendChild(createTaskRow(task)); 
        });

        // Caso não haja tarefas
        if (!tasksFound) {
            notice.innerHTML = 'Nenhuma tarefa para este dia.';
        }

        // Atualiza o gráfico com a duração das categorias
        updateChart(categoryDurations);

    } catch (error) {
        document.querySelector('.empty').innerHTML = 'Erro ao carregar tarefas. Tente novamente mais tarde.';
        console.error(error);
    }
}
