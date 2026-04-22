# Explicação do Código

O arquivo `refatoracao.py` define uma função chamada `c` que recebe uma lista `l` de números e calcula quatro valores:

- `t`: a soma de todos os elementos da lista.
- `m`: a média dos valores, obtida dividindo a soma pelo tamanho da lista.
- `mx`: o maior valor encontrado na lista.
- `mn`: o menor valor encontrado na lista.

Passo a passo da função `c(l)`:

1. `t=0` inicializa a soma.
2. O primeiro laço `for i in range(len(l)):` percorre cada índice da lista e acumula `l[i]` em `t`.
3. `m=t/len(l)` calcula a média usando a soma `t` e o número de elementos da lista.
4. `mx=l[0]` e `mn=l[0]` inicializam o maior e o menor valor com o primeiro elemento da lista.
5. O segundo laço `for i in range(len(l)):` percorre novamente a lista para comparar cada elemento com `mx` e `mn`:
   - Se `l[i] > mx`, atualiza `mx` com o valor maior.
   - Se `l[i] < mn`, atualiza `mn` com o valor menor.
6. A função retorna uma tupla `(t, m, mx, mn)` contendo soma, média, maior e menor valor.

Depois da função:

- `x=[23,7,45,2,67,12,89,34,56,11]` define uma lista de números.
- `a,b,c2,d=c(x)` chama a função `c` com a lista `x` e armazena os resultados em quatro variáveis.
- Em seguida, o código imprime:
  - `total:` seguido da soma de todos os elementos.
  - `media:` seguido da média dos valores.
  - `maior:` seguido do maior valor da lista.
  - `menor:` seguido do menor valor da lista.

Esse trecho de código serve para obter estatísticas simples de uma lista numérica e exibir esses resultados no console.
