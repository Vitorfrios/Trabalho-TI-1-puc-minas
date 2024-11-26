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

# Caminho da pasta onde estão as imagens
pasta_imagens = "docs\images"

# Lista de extensões consideradas como imagens
extensoes_imagens = {".png", ".jpg", ".jpeg", ".gif", ".bmp", ".tiff"}

# Verifica se a pasta existe
if os.path.exists(pasta_imagens):
    # Itera pelos arquivos na pasta
    for nome_arquivo in os.listdir(pasta_imagens):
        # Obtém a extensão do arquivo
        _, extensao = os.path.splitext(nome_arquivo)
        # Verifica se o arquivo é uma imagem
        if extensao.lower() in extensoes_imagens:
            # Exibe o caminho completo
            caminho_completo = os.path.join(pasta_imagens, nome_arquivo)
            print(caminho_completo)
else:
    print(f"A pasta '{pasta_imagens}' não foi encontrada.")
