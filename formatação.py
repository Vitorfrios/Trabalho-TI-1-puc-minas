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








import os
import re

# Função para substituir e remover elementos de arquivos HTML
def modificar_html(arquivo):
    with open(arquivo, 'r', encoding='utf-8') as f:
        conteudo = f.read()

    # Substituir "./X_Perfil.html" por "./09_Perfil.html"
    conteudo = re.sub(r'\./\d+_Perfil\.html', './09_Perfil.html', conteudo)

    # Remover a tag <span class="name">Nome de perfil</span>
    conteudo = re.sub(r'<span class="name">[^<]*</span>', '', conteudo)

    # Escrever o conteúdo modificado de volta no arquivo
    with open(arquivo, 'w', encoding='utf-8') as f:
        f.write(conteudo)

# Caminho para o diretório onde estão os arquivos HTML
diretorio = 'codigo'  # Coloque o diretório correto onde seus arquivos HTML estão localizados

# Navegar por todos os arquivos do diretório
for root, dirs, files in os.walk(diretorio):
    for file in files:
        if file.endswith('.html'):
            caminho_arquivo = os.path.join(root, file)
            modificar_html(caminho_arquivo)
            print(f"Modificado: {caminho_arquivo}")
