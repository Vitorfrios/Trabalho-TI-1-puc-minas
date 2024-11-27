// Página inicial de Login
const LOGIN_URL = "./public/pages/03_Login.html";

// URL do servidor para o db.json
const SERVER_URL = 'http://localhost:3000/usuarios'; 
const SERVER_URL_SENHAS = 'http://localhost:3000/senhas'; 
const SERVER_URL_USUARIO = 'http://localhost:3000/usuario_logado'; 

// Objeto para o banco de dados de usuários baseado em JSON
var db_usuarios = { usuarios: [] };

// Objeto para o usuário corrente
var usuarioCorrente = {};

// Função para gerar códigos randômicos a serem utilizados como código de usuário
function generateUUID() { 
    var d = new Date().getTime();
    var d2 = (performance && performance.now && (performance.now() * 1000)) || 0;
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16;
        if(d > 0){
            r = (d + r) % 16 | 0;
            d = Math.floor(d / 16);
        } else {
            r = (d2 + r) % 16 | 0;
            d2 = Math.floor(d2 / 16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

// Inicializa o usuarioCorrente e banco de dados de usuários da aplicação de Login
async function initLoginApp() {
    try {
        // Carrega os usuários
        console.log("Iniciando carregamento de usuários...");
        const response = await fetch(SERVER_URL);
        if (!response.ok) {
            throw new Error(`Erro ao carregar usuários: ${response.statusText}`);
        }

        const data = await response.json();
        db_usuarios = { usuarios: data };

        console.log("Usuários carregados com sucesso:", db_usuarios.usuarios);

        // Verifica o usuário logado atual
        const usuarioCorrenteJSON = sessionStorage.getItem('usuarioCorrente');
        if (usuarioCorrenteJSON) {
            usuarioCorrente = JSON.parse(usuarioCorrenteJSON);
            console.log("Usuário logado:", usuarioCorrente);
        }
    } catch (error) {
        console.error("Erro ao inicializar a aplicação de login:", error);
        alert('Erro ao carregar dados do servidor.');
    }
}



// Função para alternar a visibilidade da senha
document.getElementById('toggle-password').addEventListener('click', function () {
    var passwordField = document.getElementById('password');
    var type = passwordField.type === "password" ? "text" : "password"; 
    passwordField.type = type;

    // Muda o ícone do olho para fechado ou aberto
    this.classList.toggle('fa-eye-slash');
});

// Declara uma função para processar o formulário de login
async function processaFormLogin(event) {
    event.preventDefault();

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    var resultadoLogin = await loginUser(username, password);
    if (resultadoLogin) {
        window.location.href = './04_Tutorial.html';
    } else {
        alert('Usuário não identificado. Por favor, crie um novo usuário.');
    }
}


// Função para validar e realizar o login
document.getElementById('btn-login').addEventListener('click', async function () {
    try {
        console.log("Tentando autenticar o usuário...");
        
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;

        // Verifica se os campos estão preenchidos
        if (username === "" || password === "") {
            alert("Preencha todos os campos.");
            return;
        }

        // Carrega os usuários se ainda não estiverem carregados
        if (db_usuarios.usuarios.length === 0) {
            console.log("Carregando usuários antes do login...");
            await initLoginApp();
        }

        // Autentica o usuário
        const resultado = await loginUser(username, password);
        if (resultado) {
            window.location.href = './04_Tutorial.html';
        } else {
            alert("Usuário não cadastrado ou senha inválida.");
        }
    } catch (error) {
        console.error("Erro durante o login:", error);
    }
});




// Função para verificar se o login existe
async function loginUser(username, password) {
    try {
        // Certifique-se de que os usuários foram carregados
        if (db_usuarios.usuarios.length === 0) {
            console.error("Nenhum usuário encontrado em db_usuarios");
            alert("Erro interno: não foi possível acessar os dados do servidor.");
            return false;
        }

        // Procure o usuário pelo login
        const usuario = db_usuarios.usuarios.find(u => u.login === username);
        if (!usuario) {
            alert("Usuário não encontrado.");
            return false;
        }

        // Verifique a senha correspondente
        const response = await fetch(`${SERVER_URL_SENHAS}?usuarioIdS=${usuario.id}`);
        const senhas = await response.json();
        if (senhas.length === 0 || senhas[0].senha !== password) {
            alert("Senha incorreta.");
            return false;
        }

        // Usuário autenticado com sucesso
        usuarioCorrente = usuario;
        sessionStorage.setItem('usuarioCorrente', JSON.stringify(usuarioCorrente));

        // Salve o usuário logado no servidor
        const logadoResponse = await fetch(SERVER_URL_USUARIO, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: usuario.id,
                login: usuario.login,
                nome: usuario.nome,
                email: usuario.email,
                senha: senhas[0].senha  // Incluindo a senha também no usuario_logado
            })
        });

        if (!logadoResponse.ok) {
            console.error("Erro ao salvar usuário logado no servidor.");
        }

        return true;

    } catch (error) {
        console.error("Erro no login:", error);
        return false;
    }
}

// Função para salvar um novo usuário
function salvaLogin(event) {
    // Cancela a submissão do formulário para tratar sem fazer refresh da tela
    event.preventDefault();

    // Obtem os dados do formulário
    let login  = document.getElementById('txt_login').value;
    let nome   = document.getElementById('txt_nome').value;
    let email  = document.getElementById('txt_email').value;
    let senha  = document.getElementById('txt_senha').value;
    let senha2 = document.getElementById('txt_senha2').value;

    if (senha !== senha2) {
        alert('As senhas informadas não conferem.');
        return;
    }

    // Função para gerar um novo ID com base no último ID cadastrado
    function getNextUserId() {
        return fetch(SERVER_URL)  // Faz a requisição para obter todos os usuários
            .then(response => response.json())
            .then(users => {
                // Verifica o maior ID e incrementa 1
                const lastId = users.length > 0 ? Math.max(...users.map(user => parseInt(user.id))) : 0;
                return lastId + 1;  // Retorna o próximo ID
            })
            .catch(error => {
                console.error('Erro ao buscar usuários:', error);
                return 1;  // Caso haja erro, define o ID como 1
            });
    }

    // Chama a função para pegar o próximo ID antes de salvar
    getNextUserId().then(nextId => {
        // Cria um novo usuário com o ID incrementado e notificações: false
        let usuario = { 
            "id": nextId.toString(),  // ID incrementado
            "login": login, 
            "nome": nome, 
            "email": email,
            "notificacoes": false  // Novo campo de notificações
        };

        // Cria um objeto de senha com o mesmo ID do usuário
        let senhaObj = {
            "id": nextId.toString(),  // Usando o mesmo ID do usuário
            "usuarioIdS": usuario.id, // A senha terá o mesmo ID do usuário
            "senha": senha
        };

        // Adiciona o novo usuário ao banco de dados
        fetch(SERVER_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)
        })
        .then(response => response.json())
        .then(data => {
            alert('Usuário salvo com sucesso!');

            // Adiciona a senha para o novo usuário
            fetch(SERVER_URL_SENHAS, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(senhaObj)
            })
            .then(response => response.json())
            .then(data => {
                alert('Senha salva com sucesso!');

                // Agora inclui o novo usuário no `usuario_logado`
                fetch(SERVER_URL_USUARIO, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        id: usuario.id,
                        login: usuario.login,
                        nome: usuario.nome,
                        email: usuario.email,
                        senha: senhaObj.senha, // Inclui a senha ao salvar no usuario_logado
                        notificacoes: usuario.notificacoes // Inclui notificações ao salvar no usuario_logado
                    })
                })
                .then(response => response.json())
                .then(data => {
                    console.log('Usuário logado salvo com sucesso');
                })
                .catch(error => {
                    console.error('Erro ao salvar usuário logado no servidor:', error);
                });
            })
            .catch(error => {
                console.error('Erro ao salvar a senha:', error);
            });
        })
        .catch(error => {
            console.error('Erro ao salvar o usuário:', error);
        });
    });
}



// Função para fazer logout
function logoutUser() {
    usuarioCorrente = {}; // Limpa os dados do usuário corrente
    sessionStorage.removeItem('usuarioCorrente'); // Remove do sessionStorage
    window.location = LOGIN_URL; // Redireciona para a página de login
}


// Associa a função processaFormLogin ao evento submit do formulário de login
document.getElementById('login-form').addEventListener('submit', processaFormLogin);

// Associar o botão de salvar ao cadastro de novo usuário
document.getElementById('btn_salvar').addEventListener('click', salvaLogin);
