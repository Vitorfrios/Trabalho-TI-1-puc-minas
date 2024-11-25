import os

def contar_linhas_diretorio(diretorio):
    total_linhas = 0
    linhas_por_arquivo = {}

    # Percorre todos os arquivos do diretório
    for root, dirs, files in os.walk(diretorio):
        for file in files:
            # Caminho completo do arquivo
            caminho_arquivo = os.path.join(root, file)

            # Verifica se é um arquivo de código (extensões comuns)
            if caminho_arquivo.endswith(('.js', '.html', '.css','.json')):
                with open(caminho_arquivo, 'r', encoding='utf-8') as f:
                    linhas = f.readlines()
                    num_linhas = len(linhas)

                    # Armazena o número de linhas do arquivo
                    linhas_por_arquivo[caminho_arquivo] = num_linhas
                    total_linhas += num_linhas

    return linhas_por_arquivo, total_linhas

# Caminho do diretório
diretorio = 'codigo'

# Chama a função e imprime o resultado
linhas_por_arquivo, total_linhas = contar_linhas_diretorio(diretorio)
print("Linhas por arquivo:")
for arquivo, linhas in linhas_por_arquivo.items():
    print(f"{arquivo}: {linhas} linhas")
print(f"\nTotal de linhas de código: {total_linhas}")




def substituir_texto_em_arquivos(diretorio, mapeamento, extensoes):
    for raiz, _, arquivos in os.walk(diretorio):
        for arquivo in arquivos:
            if any(arquivo.endswith(ext) for ext in extensoes):
                caminho_arquivo = os.path.join(raiz, arquivo)
                with open(caminho_arquivo, 'r', encoding='utf-8') as file:
                    conteudo = file.read()
                
                conteudo_original = conteudo
                for texto_antigo, texto_novo in mapeamento.items():
                    conteudo = conteudo.replace(texto_antigo, texto_novo)
                
                if conteudo != conteudo_original:
                    with open(caminho_arquivo, 'w', encoding='utf-8') as file:
                        file.write(conteudo)
                    print(f"Alterado: {caminho_arquivo}")

# Configurações

# Mapear textos antigos e novos para cada tipo de comentário
mapeamento = {
    """<!--
COPIAR CODIGO NO TERMINAL PARA INICIALIZAR O JSON SERVER
npx json-server --watch codigo/db/db.json --port 3000
-->""": """<!--
COPIAR CODIGO NO TERMINAL PARA INICIALIZAR O JSON SERVER
npm start 
-->""",
    """/*
COPIAR CODIGO NO TERMINAL PARA INICIALIZAR O JSON SERVER
npx json-server --watch codigo/db/db.json --port 3000
*/""": """/*
COPIAR CODIGO NO TERMINAL PARA INICIALIZAR O JSON SERVER
npm start 
*/""",
    """//
// COPIAR CODIGO NO TERMINAL PARA INICIALIZAR O JSON SERVER
// npx json-server --watch codigo/db/db.json --port 3000
//""": """//
// COPIAR CODIGO NO TERMINAL PARA INICIALIZAR O JSON SERVER
// npm start 
//"""
}

# Extensões de arquivos que serão processadas
extensoes_alvo = ['.html', '.js', '.css']

# Executar a substituição
substituir_texto_em_arquivos(diretorio, mapeamento, extensoes_alvo)



import os
from bs4 import BeautifulSoup

# Função para encontrar e exibir os scripts e links CSS que seguem o estilo desejado
def extract_filtered_scripts_and_styles(html_content):
    soup = BeautifulSoup(html_content, 'html.parser')
    
    # Filtrando os scripts que começam com ../assets/js/
    scripts = soup.find_all('script', src=True)
    for script in scripts:
        src = script.get('src')
        if src and src.startswith('../assets/js/'):
            print(f"{src}")
    
    # Filtrando os links CSS que começam com ../assets/css/
    links = soup.find_all('link', {'rel': 'stylesheet'}, href=True)
    for link in links:
        href = link.get('href')
        if href and href.startswith('../assets/css/'):
            print(f"{href}")

# Caminho para a pasta com os arquivos HTML
html_folder = 'codigo/public/pages'

# Iterando por todos os arquivos na pasta
for root, dirs, files in os.walk(html_folder):
    for file in files:
        if file.endswith('.html'):
            file_path = os.path.join(root, file)
            
            # Abrindo e lendo o arquivo HTML
            with open(file_path, 'r', encoding='utf-8') as html_file:
                html_content = html_file.read()
                extract_filtered_scripts_and_styles(html_content)




import os
import re

# Caminho do diretório que contém os arquivos CSS
css_dir = r'codigo\public\assets\css'

# Regex para encontrar a regra `.sidebar` e a propriedade `width`
sidebar_regex = re.compile(r'(\.sidebar\s*\{[^}]*?)\bwidth\s*:\s*[^\s;]+;', re.DOTALL)

# Processar todos os arquivos CSS no diretório
for root, _, files in os.walk(css_dir):
    for file in files:
        if file.endswith('.css'):
            file_path = os.path.join(root, file)
            
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()

            # Substituir `width` e adicionar `min-width` em linhas separadas
            def replace_width(match):
                before = match.group(1)  # Parte anterior à propriedade encontrada
                return f"{before}width: auto;\n  min-width: 40vh;"

            new_content = sidebar_regex.sub(replace_width, content)

            # Salvar o arquivo alterado
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)

print("Alterações concluídas.")
