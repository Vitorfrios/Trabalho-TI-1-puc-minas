
/*
COPIAR CODIGO NO TERMINAL PARA INICIALIZAR O JSON SERVER
npx json-server --watch codigo/db/db.json --port 3000
*/



// ------------------- SIDE BAR CODIGO ------------------- //

// Marcar a aba ativa na sidebar
document.addEventListener("DOMContentLoaded", function() {
    function highlightActiveItem() {
        const currentPage = window.location.pathname.split("/").pop(); // Pega o nome do arquivo da URL

        const items = document.querySelectorAll('.sidebar ul li');
        items.forEach(item => {
            item.classList.remove('active');
        });
        if (currentPage === '04_Dashboard.html') {
            document.getElementById('dashboard').classList.add('active');
        } else if (currentPage === '05_Cronograma_Diario.html') {
            document.getElementById('cronograma').classList.add('active');
        } else if (currentPage === '06_Criacao_Tarefas.html') {
            document.getElementById('tarefas').classList.add('active');
        } else if (currentPage === '07_Progresso.html') {
            document.getElementById('progresso').classList.add('active');
        } else if (currentPage === '09_Perfil.html') {
            document.getElementById('perfil').classList.add('active');
        } else if (currentPage === '10_Suporte_Feedback.html') {
            document.getElementById('feedback').classList.add('active');
        } else if (currentPage === '08_Sugestao.html') {
            document.getElementById('sugestao').classList.add('active');
        }
    }


    highlightActiveItem();
});

// ------------------- FIM DA SIDE BAR ------------------- //

document.addEventListener('DOMContentLoaded', () => {
    const scheduleBody = document.getElementById('schedule-body');

    // Função para formatar as horas no formato "HH:00"
    function formatHour(hour) {
        return hour.toString().padStart(2, '0') + ':00';
    }

    // Gerar linhas e células da tabela
    for (let hour = 0; hour < 24; hour++) {
        const row = document.createElement('tr');

        // Primeira célula com a hora
        const hourCell = document.createElement('td');
        hourCell.textContent = formatHour(hour);
        row.appendChild(hourCell);

        // Criar células vazias para cada dia da semana
        for (let day = 0; day < 7; day++) {
            const dayCell = document.createElement('td');
            row.appendChild(dayCell);
        }

        // Adicionar a linha completa ao tbody
        scheduleBody.appendChild(row);
    }
});
