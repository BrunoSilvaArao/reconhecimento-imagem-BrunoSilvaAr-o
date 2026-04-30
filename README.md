# Projeto Teste Assistente Cod

Este repositório contém um pequeno conjunto de exemplos em Python e um protótipo web de classificação de imagem com Teachable Machine.

## Visão Geral

O projeto inclui:
- `index.html`: página web que usa a webcam e um modelo Teachable Machine para classificar imagens em tempo real.
- `debug.py`: script Python interativo que calcula o valor total de uma compra com imposto e desconto.
- `num_primos.py`: script Python para verificar se números são primos.
- `refatoracao.py`: script Python que calcula estatísticas simples (soma, média, maior e menor) a partir de uma lista de valores.
- `explicacao_refatoracao.md`, `explicacao-debug.md`, `explicao_num_orimo.md`: documentos explicativos sobre os códigos presentes no repositório.

## Estrutura do Projeto

```
teste-assistente-cod/
├── README.md
├── index.html
├── debug.py
├── num_primos.py
├── refatoracao.py
├── explicacao_refatoracao.md
├── explicacao-debug.md
├── explicao_num_orimo.md
├── style/
├── azul/
├── verde/
├── vermelho/
└── views/
```

## Como usar

### Página web

1. Abra `index.html` em um navegador compatível.
2. Clique em **Permitir Câmera**.
3. O app carregará o modelo do Teachable Machine e exibirá as previsões com barras de progresso.

> Observação: o modelo é carregado a partir de uma URL externa do Teachable Machine.

### Scripts Python

#### `debug.py`

1. Execute:
   ```bash
   python debug.py
   ```
2. Informe seu nome, as quantidades e os preços dos três itens.
3. Informe o percentual do cupom de desconto, caso possua.
4. O script calculará o subtotal, o imposto de 10%, o desconto e o total final.

#### `num_primos.py`

1. Execute:
   ```bash
   python num_primos.py
   ```
2. O script testa alguns números básicos para verificar se são primos.
3. Para usar em outro código, importe `is_prime`.

#### `refatoracao.py`

1. Execute:
   ```bash
   python refatoracao.py
   ```
2. O script calcula e imprime a soma, média, maior e menor de uma lista fixa de valores.

## Descrições dos arquivos

- `index.html`: interface de demonstração com Bootstrap e TensorFlow.js para webcam e classificação de imagem.
- `debug.py`: exemplo de fluxo de entrada, cálculo de valores e formatação de saída com f-strings.
- `num_primos.py`: função `is_prime(n)` com verificação até a raiz quadrada para eficiência.
- `refatoracao.py`: função `calculate_statistics(values)` com tratamento de lista vazia e retorno em tupla.
- `explicacao_refatoracao.md`: explicação da lógica do código de refatoração.
- `explicacao-debug.md`: análise dos principais erros identificados no script `debug.py`.
- `explicao_num_orimo.md`: explicação da função de verificação de números primos.

## Requisitos

- Navegador moderno com suporte a webcam para `index.html`.
- Python 3.x para os scripts `.py`.

## Observações

- Os arquivos de pasta `style/`, `azul/`, `verde/`, `vermelho/` e `views/` parecem fazer parte de uma estrutura de frontend ou organização de recursos visuais.
- Se desejar rodar o site localmente, basta abrir `index.html` ou usar um servidor HTTP simples.

---

### Contato

Este projeto foi criado por Bruno Silva como um conjunto de exemplos e exercícios de programação.
