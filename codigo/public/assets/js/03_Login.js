// Constantes das URLs dos endpoints
const SERVER_URL = 'http://localhost:3000/usuarios';
const SERVER_URL_USUARIO = 'http://localhost:3000/usuario_logado';

var db_usuarios = { usuarios: [] };

var usuarioCorrente = {};

// Função para carregar os usuários
async function initLoginApp() {
    try {
        const response = await fetch(SERVER_URL);
        if (!response.ok) {
            throw new Error(`Erro ao carregar usuários: ${response.statusText}`);
        }
        const data = await response.json();
        db_usuarios = { usuarios: data };
    } catch (error) {
        console.error("Erro ao carregar usuários:", error);
    }
}

// Função para obter o próximo ID baseado no último existente
async function getNextUserId() {
    try {
        const response = await fetch(SERVER_URL);
        if (!response.ok) {
            throw new Error(`Erro ao carregar IDs de usuários: ${response.statusText}`);
        }
        const users = await response.json();
        const lastId = users.length > 0 ? Math.max(...users.map(user => parseInt(user.id))) : 0;
        return (lastId + 1).toString(); 
    } catch (error) {
        console.error("Erro ao obter o próximo ID:", error);
        return "1"; 
    }
}

// Função para salvar um novo usuário
async function salvaLogin(event) {
    event.preventDefault();
    
    const login = document.getElementById('txt_login').value;
    const nome = document.getElementById('txt_nome').value;
    const email = document.getElementById('txt_email').value;
    const senha = document.getElementById('txt_senha').value;
    const senha2 = document.getElementById('txt_senha2').value;

    if (senha !== senha2) {
        alert('As senhas não conferem.');
        return;
    }

    const nextId = await getNextUserId(); 

    const usuario = {
        id: nextId,
        login,
        nome,
        email,
        senha, 
        notificacoes: false
    };

    fetch(SERVER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuario)
    })
    .then(() => {
        alert('Usuário criado com sucesso!');
    })
    .catch(error => {
        console.error("Erro ao salvar o usuário:", error);
    });
}

// Função para salvar o usuário logado no endpoint
function salvaUsuarioLogado(usuario) {
    fetch(SERVER_URL_USUARIO, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuario)
    })
    .then(() => {
        console.log('Usuário logado salvo com sucesso');
    })
    .catch(error => {
        console.error("Erro ao salvar o usuário logado:", error);
    });
}

// Função para processar o login
async function loginUser(username, password) {
    const usuario = db_usuarios.usuarios.find(u => u.login === username && u.senha === password);
    if (!usuario) {
        alert('Usuário ou senha inválidos.');
        return false;
    }
    usuarioCorrente = usuario;

    salvaUsuarioLogado(usuario);
    return true;
}

document.getElementById('btn-login').addEventListener('click', async function () {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === "" || password === "") {
        alert("Preencha todos os campos.");
        return;
    }

    await initLoginApp();
    const loginSucesso = await loginUser(username, password);

    if (loginSucesso) {
        console.log('Redirecionando para a página de tutorial...');
        console.log('Caminho usado:', window.location.href);

        alert('Login bem-sucedido!');
        setTimeout(() => {
            window.location.href = '/codigo/public/pages/04_Tutorial.html';
        }, 500); 
    } else {
        console.log('Erro no processo de login.');
        alert('Erro ao realizar login.');
    }
});


// Evento para salvar o usuário
document.getElementById('btn_salvar').addEventListener('click', salvaLogin);


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

        if (username === "" || password === "") {
            alert("Preencha todos os campos.");
            return;
        }

        if (db_usuarios.usuarios.length === 0) {
            console.log("Carregando usuários antes do login...");
            await initLoginApp();
        }

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





document.getElementById('login-form').addEventListener('submit', processaFormLogin);

document.getElementById('btn_salvar').addEventListener('click', salvaLogin);
