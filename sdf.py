import json

# Caminho do arquivo JSON
caminho_arquivo = 'codigo/db/DB2.json'

# Função para ler e calcular a duração total por categoria
def calcular_duracoes_por_categoria():
    try:
        # Abrir e carregar o arquivo JSON
        with open(caminho_arquivo, 'r') as file:
            dados = json.load(file)

        # Verifique como os dados são carregados
        print("Dados lidos do arquivo:", dados)  # Adicionamos isso para depurar

        # Criar um dicionário para armazenar a soma de estimatedDuration por categoria
        duracoes_por_categoria = {}

        # Verifica se as chaves 'adicionarTarefas' e 'listaDeTarefas' existem
        for key in ['adicionarTarefas', 'listaDeTarefas']:
            if key in dados:
                # Iterar sobre as tarefas em cada categoria
                for tarefa in dados[key]:
                    if isinstance(tarefa, dict):
                        categoria = tarefa.get('category')
                        estimated_duration = tarefa.get('estimatedDuration', 0)

                        # Soma a duração por categoria
                        if categoria:
                            if categoria in duracoes_por_categoria:
                                duracoes_por_categoria[categoria] += estimated_duration
                            else:
                                duracoes_por_categoria[categoria] = estimated_duration
                    else:
                        print(f"Erro: A tarefa não está no formato esperado (dicionário). Tarefa: {tarefa}")

        # Exibir as somas das durações por categoria
        for categoria, duracao_total in duracoes_por_categoria.items():
            print(f"Categoria: {categoria} - Duração total: {duracao_total} minutos")

    except FileNotFoundError:
        print(f"Erro: O arquivo {caminho_arquivo} não foi encontrado.")
    except json.JSONDecodeError:
        print(f"Erro ao ler o arquivo JSON. Verifique se o formato está correto.")
    except Exception as e:
        print(f"Erro inesperado: {e}")

# Chamar a função para calcular e exibir os resultados
calcular_duracoes_por_categoria()
