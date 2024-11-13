
/*
COPIAR CODIGO NO TERMINAL PARA INICIALIZAR O JSON SERVER
npx json-server --watch codigo/db/db.json --port 3000
*/

const hourHand = document.querySelector('.hour-hand');
const minuteHand = document.querySelector('.minute-hand');
const secondHand = document.querySelector('.second-hand');

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








function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomElement(arr) {
    return arr[getRandomInt(0, arr.length - 1)];
}

function generateRandomTasks(numTasks) {
    const categories = ["Lazer", "Estudo", "Trabalho"]; // Categorias limitadas
    const priorities = ["Alta", "Média", "Baixa"]; // Prioridades limitadas

    // Lista de nomes de tarefas relevantes para cada categoria
    const taskNames = {
        "Lazer": [
            "Assistir a um Filme",
            "Ler um Livro",
            "Fazer um Passeio",
            "Jogar um Jogo de Tabuleiro",
            "Praticar Esportes",
            "Fazer Meditação",
            "Assistir a uma Série",
            "Cozinhar um Novo Prato",
            "Visitar um Amigo",
            "Fazer um Trabalho Voluntário"
        ],
        "Estudo": [
            "Estudar Matemática",
            "Revisar Notas",
            "Fazer um Projeto",
            "Ler um Artigo Científico",
            "Participar de um Workshop",
            "Fazer um Curso Online",
            "Escrever um Artigo",
            "Planejar a Semana",
            "Fazer Exercícios",
            "Estudar História"
        ],
        "Trabalho": [
            "Preparar o Almoço",
            "Fazer Compras",
            "Organizar a Casa",
            "Participar de uma Reunião",
            "Enviar Relatório",
            "Fazer uma Apresentação",
            "Revisar Documentos",
            "Atender Clientes",
            "Desenvolver um Projeto",
            "Planejar uma Campanha"
        ]
    };

    const tasks = [];
    const scheduledTimes = new Set(); // Para armazenar horários já agendados

    for (let i = 0; i < numTasks; i++) {
        const category = getRandomElement(categories); // Categoria aleatória
        let time;
        
        // Gerar um horário único
        do {
            time = `${getRandomInt(0, 23).toString().padStart(2, '0')}:${getRandomInt(0, 59).toString().padStart(2, '0')}`; // Hora aleatória
        } while (scheduledTimes.has(time)); // Verifica se o horário já está agendado

        scheduledTimes.add(time); // Adiciona o horário agendado

        const id = 1 + tasks.length; // ID começa em 205
        const task = {
            id: id.toString(), // ID como string
            name: getRandomElement(taskNames[category]), // Nome aleatório da lista da categoria
            time: time, // Hora única
            category: category, // Categoria aleatória
            priority: getRandomElement(priorities), // Prioridade aleatória
            Udate: new Date().toISOString().split('T')[0], // Data de atualização (data atual)
            date: Array.from(new Set(Array.from({ length: getRandomInt(1, 3) }, () => getRandomInt(1, 7)))), // Dias aleatórios da semana (1 a 7), máximo 3
            estimatedDuration: getRandomInt(30, 120) // Duração estimada entre 30 e 120 minutos
        };

        // Garantir que todos os campos tenham valores
        if (!task.name) task.name = getRandomElement(taskNames[category]); // Nome padrão
        if (!task.category) task.category = "Não definida"; // Categoria padrão
        if (!task.priority) task.priority = "Não definida"; // Prioridade padrão
        if (!task.Udate) task.Udate = new Date().toISOString().split('T')[0]; // Data padrão
        if (task.date.length === 0) task.date = [1]; // Garantir que haja pelo menos um dia
        if (task.estimatedDuration <= 0) task.estimatedDuration = 30; // Duração mínima

        tasks.push(task);
    }

    return tasks;
}

// Gerar 20 tarefas aleatórias
const randomTasks = generateRandomTasks(30);

// Exibir as tarefas geradas
console.log(JSON.stringify(randomTasks, null, 2));