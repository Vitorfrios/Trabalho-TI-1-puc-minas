
/*
COPIAR CODIGO NO TERMINAL PARA INICIALIZAR O JSON SERVER
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

// Função para carregar os dados do usuário logado
async function carregarDadosUsuario() {
    try {
        const usuarioLogadoResponse = await fetch('http://localhost:3000/usuario_logado');
        const usuarioLogado = await usuarioLogadoResponse.json();
        const configResponse = await fetch('http://localhost:3000/configuracoes?usuarioId=1');
        const senhaResponse = await fetch('http://localhost:3000/senhas?usuarioId=1');
        
        if (!usuarioLogadoResponse.ok || !configResponse.ok || !senhaResponse.ok) throw new Error('Erro ao buscar dados');

        const configuracao = await configResponse.json();
        const senha = await senhaResponse.json();

        // Exibe os dados do usuário logado
        document.getElementById('nome-completo').textContent = usuarioLogado[0]?.nome || 'N/A';
        document.getElementById('email').textContent = usuarioLogado[0]?.email || 'N/A';
        document.getElementById('nome-usuario').textContent = usuarioLogado[0]?.login || 'N/A';

        document.getElementById('notification-toggle').checked = configuracao[0]?.notificacoes || false;

        // Preenche os campos de edição com os dados do usuário logado
        document.getElementById('edit-nome').value = usuarioLogado[0]?.nome || '';
        document.getElementById('edit-email').value = usuarioLogado[0]?.email || '';
        document.getElementById('edit-login').value = usuarioLogado[0]?.login || '';

        // Preenche a senha existente (sem alteração direta no usuario_logado)
        document.getElementById('new-password').value = senha[0]?.senha || '';
    } catch (error) {
        console.error('Erro ao carregar os dados do usuário:', error);
    }
}

// Função para salvar o estado de notificações
async function salvarEstadoNotificacoes(ativo) {
    try {
        const response = await fetch('http://localhost:3000/usuario_logado/1', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ usuarioId: "1", notificacoes: ativo })
        });
        if (!response.ok) throw new Error('Erro ao salvar estado de notificações');
    } catch (error) {
        console.error('Erro ao salvar o estado de notificações:', error);
    }
}

// Função para salvar os dados editados (nome, email, login) no endpoint 'usuarios' e no 'usuario_logado'
async function salvarDadosEditados() {
    const novoNome = document.getElementById('edit-nome').value;
    const novoEmail = document.getElementById('edit-email').value;
    const novoLogin = document.getElementById('edit-login').value;

    try {
        // Atualizando os dados no endpoint 'usuarios'
        const response = await fetch('http://localhost:3000/usuarios/1', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                id: "1",  // ID do usuário logado
                nome: novoNome, 
                email: novoEmail, 
                login: novoLogin 
            })
        });
        if (!response.ok) throw new Error('Erro ao salvar dados no endpoint usuarios');

        // Atualizando os dados no endpoint 'usuario_logado'
        const updateUsuarioLogadoResponse = await fetch('http://localhost:3000/usuario_logado/1', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: "1", 
                nome: novoNome,
                email: novoEmail,
                login: novoLogin
            })
        });

        if (!updateUsuarioLogadoResponse.ok) throw new Error('Erro ao salvar dados no endpoint usuario_logado');

        // Atualiza a interface
        document.getElementById('nome-completo').textContent = novoNome;
        document.getElementById('email').textContent = novoEmail;
        document.getElementById('nome-usuario').textContent = novoLogin;

        // Atualiza o usuário logado na memória (não no banco, já que é apenas leitura)
        usuario_logado[0].nome = novoNome;
        usuario_logado[0].email = novoEmail;
        usuario_logado[0].login = novoLogin;

        document.getElementById('edit-form').style.display = 'none';
    } catch (error) {
        console.error('Erro ao salvar os dados do usuário:', error);
    }
}

// Função para salvar a nova senha no endpoint 'senhas' e atualizar apenas a senha no 'usuario_logado'
async function salvarNovaSenha() {
    const novaSenha = document.getElementById('new-password').value;

    try {
        const senhaResponse = await fetch('http://localhost:3000/senhas?usuarioIdS=1');
        const senhaExistente = await senhaResponse.json();

        if (!senhaResponse.ok) {
            throw new Error(`Erro ao buscar senha existente. Status: ${senhaResponse.status}`);
        }

        if (senhaExistente.length > 0) {
            const senhaId = senhaExistente[0].id;

            // Atualizando a senha no endpoint 'senhas'
            const response = await fetch(`http://localhost:3000/senhas/${senhaId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: senhaId,                      
                    usuarioIdS: "1",                      
                    senha: novaSenha                  
                })
            });

            if (!response.ok) {
                throw new Error(`Erro ao alterar a senha. Status: ${response.status}`);
            }

            // Atualizando a senha no endpoint 'usuario_logado', mantendo os outros dados intactos
            const usuarioLogadoResponse = await fetch('http://localhost:3000/usuario_logado');
            const usuarioLogado = await usuarioLogadoResponse.json();

            if (usuarioLogado.length > 0) {
                const usuarioLogadoAtualizado = {
                    id: usuarioLogado[0].id,
                    nome: usuarioLogado[0].nome, // Manter nome atual
                    email: usuarioLogado[0].email, // Manter email atual
                    login: usuarioLogado[0].login, // Manter login atual
                    senha: novaSenha // Atualiza somente a senha
                };

                // Enviar atualização para o endpoint 'usuario_logado'
                const updateUsuarioLogadoResponse = await fetch(`http://localhost:3000/usuario_logado/1`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(usuarioLogadoAtualizado)
                });

                if (!updateUsuarioLogadoResponse.ok) {
                    throw new Error('Erro ao atualizar senha no usuario_logado');
                }
            }

            alert('Senha alterada com sucesso!');
        } else {
            throw new Error('Senha não encontrada para o usuário.');
        }

        document.getElementById('password-modal').style.display = 'none';
    } catch (error) {
        console.error('Erro ao alterar a senha:', error);
        alert(`Erro ao alterar a senha: ${error.message}`);
    }
}


// Evento de clique no toggle de notificações
document.getElementById('notification-toggle').onclick = function() {
    const isAtivo = this.checked;
    salvarEstadoNotificacoes(isAtivo);
};

// Eventos de clique para abrir e fechar os modais
document.getElementById('edit-profile').onclick = () => {
    document.getElementById('edit-form').style.display = 'flex';
};
document.getElementById('change-password').onclick = () => {
    document.getElementById('password-modal').style.display = 'flex';
};
document.getElementById('close-edit-form').onclick = () => {
    document.getElementById('edit-form').style.display = 'none';
};
document.getElementById('close-password-modal').onclick = () => {
    document.getElementById('password-modal').style.display = 'none';
};

document.getElementById('save-changes').onclick = salvarDadosEditados;
document.getElementById('save-password').onclick = salvarNovaSenha;

carregarDadosUsuario();
