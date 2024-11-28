# Código Fonte

Essa é a pasta para a manter o programa que vocês vão construir no contexto dessa disciplina. 

Se necessário, descreva neste arquivo aspectos relevantes da estrutura de diretórios criada para organização do código.

Uma sugestão da estrutura de diretórios para o projeto é a seguinte:

- **codigo/**  : - Pasta principal
│
├── - **db/**  : - Dados do back end
│   ├── - **db.json**  : - Estruturas de dados principais do sistema
│   └── - **DB.json**  : - Segunda estrutura de dados
│
├── - **public/**  : - Seu site - Front end
│   ├── - **assets/**  : - Arquivos estáticos utilizados pelo site
│   │   ├── - **css/**  : - Estilos CSS que definem a aparência das páginas
│   │   │   └── : - Outros arquivos .css usados no design do site
│   │   │
│   │   ├── - **js/**  : - Scripts JavaScript que adicionam funcionalidades dinâmicas ao sistema
│   │   │   └── : - Outros arquivos .js que controlam interatividade
│   │   │
│   │   ├── - **images/**  : - Imagens utilizadas no design da interface
│   │   │   ├── icone_padrão.png  : - Ícone padrão utilizado no site
│   │   │   ├── seta-para-cima.png  : - Imagem de seta usada para navegação
│   │   │   └── : - Outras imagens usadas no design do site
│   │
│   ├── - **docs/**  : - Documentação e arquivos auxiliares
│   │   ├── - **files/**  : - Arquivos de documentos como PDFs e outros tipos de arquivo
│   │   │   └── : - Outros arquivos de documentos importantes
│   │   ├── - **images/**  : - Imagens de documentos ou auxiliares usados na documentação
│   │   │   └── : - Outras imagens que ilustram ou complementam a documentação
│   │   ├── - **README.md**  : - Arquivo README.md que descreve a estrutura do projeto
│   │   └── : - Outros arquivos de docs que contêm informações adicionais
│   │
│   ├── - **pages/**  : - Páginas HTML que compõem o sistema
│   │   └── : - Outras páginas HTML que formam a navegação do site
│   │
│   └── : - Outros arquivos do site que podem incluir bibliotecas e recursos
│
└── - **README.md**  : - Arquivo README.md das telas do sistema
- **package.json**  : - Configuração do back end com dependências e scripts
- **README.md**  : - Arquivo README.md principal com informações gerais sobre o projeto


## Parte Front End

Para montar seu site, edite os arquivos existentes e crie novos arquivos na pasta `public` que mantem todos os arquivos da parte de Front End do site, a interface que é vista pelo usuário no navegador.

Nesta pasta public, sugerimos que você organize os arquivos do seu site da seguinte maneira:

* Pasta `assets`: os arquivos de formatação (CSS), os scripts (JS), as imagens utilizadas no site (JPG, PNG, GIF, SVG, etc), fontes (TTF) e outros arquivos gerais utilizados por todo o site.
* Pasta `modulos`: os arquivos utilizados na implementação das funcionalidades do site. Separe uma sub-pasta para cada novo módulo ou funcionalidade. Pode também ser utilizado para dividir o trabalho de cada membro do grupo.
* Arquivo `index.html`: arquivo que representa a "home page" do site.

## Parte Back End

Para esse projeto vamos utilizar o ambiente de execução **[Node.js](https://nodejs.org/)** para montar um Back End bem simplificado, porém poderoso que utiliza o módulo **[JSON Server](https://github.com/typicode/json-server#readme)**. Não se preocupe, você não precisa conhecer como programar para o ambiente Node.js e nem alterar estes arquivos para colocar o seu site funcionando.

Na estrutura de arquivos que vocês estão recebendo, você vai encontrar, ainda, outra pasta e alguns arquivos. São eles:

* Pasta `db`: local onde é armazenado o arquivo com as estruturas de dados utilizadas pela aplicação. O conteúdo é composto apenas pelo arquivo `db.json`.
* Arquivo `index.js`: arquivo que inicializa o servidor web e a aplicação de back end no ambiente do Node.js, fornecendo uma API RESTful a partir do arquivo `db.json`. Evite alterar esse arquivo
* Arquivo `package.js`: arquivo com as configurações da aplicação de back end.

## Setup e execução do ambiente

Para executar a apilcação de back end e permitir o acesso ao seu site, você deverá instalar o Node.js no seu computador. Para isso siga as instruções no site do [**Node.js**](https://nodejs.org/), fazendo o download da versão LTS (versão mais estável do ambiente).

Assim que o Node.js estiver instalado no seu computador, você deve abrir o terminal na pasta do seu projeto e executar os seguintes comandos:

```
$> npm install
```

Isso fará com que o NPM instale todos os pacotes necessários para executar o Back End. O NPM é o aplicativo que gerencia dependências de um projeto e instala os pacotes do Node.JS.

Em seguida, com os pacotes já instalados, basta executar o seguinte comando:

```
$> npm start
```

Isso fará com que o Node.js execute sua aplicação de Back End, subindo o servidor Web e a API RESTful que é provida pelo JSON Server a partir do arquivo `db.json`.

## Dúvidas e Suporte

Se tiver dúvidas, procure a monitoria para que te ajudem a entender todo o ambiente e te ajudem na implementação do seu projeto.
