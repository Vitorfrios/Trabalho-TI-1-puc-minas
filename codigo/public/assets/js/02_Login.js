
/*
COPIAR CODIGO NO TERMINAL PARA INICIALIZAR O JSON SERVER
npx json-server --watch codigo/db/db.json --port 3000
*/


// Página inicial de Login
const LOGIN_URL = "./public/pages/02_Login.html";

// URL do servidor para o db.json
const SERVER_URL = 'http://localhost:3000/usuarios'; 

// Objeto para o banco de dados de usuários baseado em JSON
var db_usuarios = {};

// Objeto para o usuário corrente
var usuarioCorrente = {};

// função para gerar códigos randômicos a serem utilizados como código de usuário
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
function initLoginApp() {
    // Verifica se o usuário corrente está no sessionStorage
    const usuarioCorrenteJSON = sessionStorage.getItem('usuarioCorrente');
    if (usuarioCorrenteJSON) {
        usuarioCorrente = JSON.parse(usuarioCorrenteJSON);
    }

    // Requisição GET para carregar usuários do servidor
    fetch(SERVER_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro ao carregar usuários");
            }
            return response.json();
        })
        .then(data => {
            db_usuarios = data;
        })
        .catch(error => {
            console.error("Erro:", error);
            alert('Erro ao carregar dados de usuários do servidor.');
        });
}

// Verifica se o login do usuário está correto e, se positivo, direciona para a página inicial
function loginUser(login, senha) {
    // Verifica todos os itens do banco de dados de usuários
    for (let usuario of db_usuarios.usuarios) {
        // Se encontrou login, carrega usuário corrente e salva no Session Storage
        if (login == usuario.login && senha == usuario.senha) {
            usuarioCorrente = { ...usuario };

            // Salva os dados do usuário corrente no Session Storage
            sessionStorage.setItem('usuarioCorrente', JSON.stringify(usuarioCorrente));

            // Retorna true para usuário encontrado
            return true;
        }
    }

    // Se chegou até aqui é porque não encontrou o usuário e retorna falso
    return false;
}

// Apaga os dados do usuário corrente no sessionStorage
function logoutUser() {
    usuarioCorrente = {};
    sessionStorage.setItem('usuarioCorrente', JSON.stringify(usuarioCorrente));
    window.location = LOGIN_URL;
}

// Função para adicionar novo usuário no servidor
function addUser(nome, login, senha, email) {
    // Cria um objeto de usuario para o novo usuario
    let usuario = { "id": generateUUID(), "login": login, "senha": senha, "nome": nome, "email": email };

    // Requisição POST para salvar o novo usuário no servidor
    fetch(SERVER_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao salvar usuário');
        }
        return response.json();
    })
    .then(data => {
        alert("Usuário adicionado com sucesso!");
        // Atualiza db_usuarios localmente sem recarregar
        db_usuarios.usuarios.push(usuario);
        localStorage.setItem('db_usuarios', JSON.stringify(db_usuarios));
    })
    .catch(error => console.error('Erro ao salvar usuário:', error));
}

// Inicializa as estruturas utilizadas pelo LoginApp
initLoginApp();
