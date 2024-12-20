/*
DIGITAR npm start NO TERMINAL PARA INICIALIZAR O JSON SERVER
npm start 
*/


const jsonPath = 'http://localhost:3000/tutorial';  

async function carregarDados() {
    try {
        console.log("Iniciando carregamento de dados...");
        const response = await fetch(jsonPath);  
        const data = await response.json();  
        console.log("Dados carregados com sucesso:", data);
        return data;  
    } catch (error) {
        console.error("Erro ao carregar o JSON:", error);
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    const dados = await carregarDados();
    if (dados) {
        console.log("Dados carregados e prontos para uso.");
        configurarBotoes(dados);  
    } else {
        console.error("Dados não carregados corretamente.");
    }
});


function configurarBotoes(dados) {
    const descricaoDiv = document.querySelector('.descricao');
    console.log("Configuração dos botões iniciada.");

    
    document.getElementById('AdicionarTarefas').addEventListener('click', () => {
        console.log("Botão 'Adicionar Tarefas' clicado.");
        exibirDescricao(descricaoDiv, dados.AdicionarTarefas, '2px', '20px'); 
    });

    document.getElementById('CronogramaSemanal').addEventListener('click', () => {
        console.log("Botão 'Cronograma Semanal' clicado.");
        exibirDescricao(descricaoDiv, dados.CronogramaSemanal, '7px', '21px'); 
    });

    document.getElementById('Analise').addEventListener('click', () => {
        console.log("Botão 'Análise' clicado.");
        exibirDescricao(descricaoDiv, dados.Analise, '8px', '22px'); 
    });

    document.getElementById('Sugestao').addEventListener('click', () => {
        console.log("Botão 'Sugestão' clicado.");
        exibirDescricaoS(descricaoDiv, dados.Sugestao);
        mostrarSubtopicos(descricaoDiv, dados.Sugestao);
    });

}


function exibirDescricaoS(elemento, dadosDescricao) {
    console.log("Exibindo descrição geral de Sugestões.");
    const conteudoHTML = `
        <h2>${dadosDescricao.titulo}</h2>
        <p>${dadosDescricao.conteudo}</p>
    `;
    elemento.innerHTML = conteudoHTML;
}


function exibirSubtopico(subtopicoConteudo, subtopico, padding, fontSize) {
    console.log(`Exibindo subtópico: ${subtopico.titulo}`);
    const conteudoHTML = `
        <h3>${subtopico.titulo}</h3>
        <ul>
            ${subtopico.conteudo.map(item => `<li>${item}</li>`).join('')}
        </ul>
    `;
    subtopicoConteudo.innerHTML = conteudoHTML;

   
    const listaItems = subtopicoConteudo.querySelectorAll('ul li'); 
    listaItems.forEach(item => {
        item.style.padding = padding; 
        item.style.fontSize = fontSize; 
    });
}


function mostrarSubtopicos(elemento, dadosSugestao) {
    console.log("Mostrando subtópicos da sugestão.");

    
    const subtituloHTML = `
        <h3 class:"h3">Escolha um subtópico:</h3>
        <div id="subtopicoBotoes">
            <button id="dicasEstudoBtn">Dicas de Estudo</button>
            <button id="descansarDormirBtn">Descansar e Dormir</button>
            <button id="desempenhoBtn">Desempenho</button>
        </div>
        <div id="subtopicoConteudo"></div>
    `;

    
    elemento.innerHTML += subtituloHTML;

   
    const subtopicoConteudo = document.getElementById('subtopicoConteudo');

    

    document.getElementById('dicasEstudoBtn').addEventListener('click', () => {
        console.log("Botão 'Dicas de Estudo' clicado.");
        exibirSubtopico(subtopicoConteudo, dadosSugestao.subtopicos['dicas-estudo'], '10px', '24px');
    });

    document.getElementById('descansarDormirBtn').addEventListener('click', () => {
        console.log("Botão 'Descansar e Dormir' clicado.");
        exibirSubtopico(subtopicoConteudo, dadosSugestao.subtopicos['descansar-dormir'], '5px', '22px');
    });

    document.getElementById('desempenhoBtn').addEventListener('click', () => {
        console.log("Botão 'Desempenho' clicado.");
        exibirSubtopico(subtopicoConteudo, dadosSugestao.subtopicos['desempenho'], '10px', '24px');
    });
}


function exibirDescricao(elemento, dadosDescricao, padding, fontSize) {
    console.log(`Exibindo descrição: ${dadosDescricao.titulo}`);
    const conteudoHTML = `
        <h2>${dadosDescricao.titulo}</h2>
        <ul>
            ${dadosDescricao.conteudo.map(item => `<li>${item}</li>`).join('')}
        </ul>
    `;
    elemento.innerHTML = conteudoHTML;

   
    const listaItems = elemento.querySelectorAll('.descricao ul li');
    listaItems.forEach(item => {
        item.style.padding = padding; 
        item.style.fontSize = fontSize; 
    });
}