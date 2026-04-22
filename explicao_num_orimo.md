# Explicação Técnica: Função `is_prime` em Python

## Descrição Geral
A função `is_prime(n)` é uma implementação em Python para determinar se um número inteiro `n` é primo. Um número primo é definido como um inteiro maior que 1 que não possui divisores positivos além de 1 e ele mesmo.

## Algoritmo Utilizado
O algoritmo segue uma abordagem de verificação de divisibilidade, utilizando a biblioteca `math` para calcular a raiz quadrada de forma mais clara:

1. **Verificação Inicial**: Se `n` for menor ou igual a 1, a função retorna `False`, pois números primos devem ser maiores que 1.
2. **Loop de Verificação**: Itera sobre os valores de `i` começando de 2 até a raiz quadrada de `n` (calculada como `int(math.sqrt(n)) + 1`). Para cada `i`, verifica se `n % i == 0`. Se sim, `n` não é primo e retorna `False`.
3. **Conclusão**: Se nenhum divisor for encontrado, retorna `True`, indicando que `n` é primo.

Este método otimiza a verificação ao limitar o loop à raiz quadrada de `n`, pois se `n` tem um divisor maior que sua raiz quadrada, o correspondente menor divisor já teria sido verificado.

## Complexidade de Tempo
- **Tempo**: O(n^{1/2}), onde n é o valor de entrada. Isso ocorre porque o loop executa aproximadamente √n iterações no pior caso.
- **Espaço**: O(1), pois utiliza apenas variáveis locais e não aloca estruturas de dados adicionais.

## Casos Especiais e Otimizações
- **Números ≤ 1**: Sempre retornam `False`.
- **Número 2**: É o único primo par; tratado corretamente pelo algoritmo.
- **Números pares > 2**: Não são primos, mas o algoritmo os detecta eficientemente no loop.
- **Otimizações Possíveis**: Para números muito grandes, algoritmos probabilísticos como Miller-Rabin poderiam ser considerados, mas este é adequado para valores típicos.

## Exemplos de Execução
- `is_prime(2)` → `True` (primo)
- `is_prime(3)` → `True` (primo)
- `is_prime(4)` → `False` (divisível por 2)
- `is_prime(17)` → `True` (primo)
- `is_prime(18)` → `False` (divisível por 2, 3, etc.)

## Código Fonte
```python
import math

def is_prime(n: int) -> bool:
    """
    Verifica se um número é primo.

    Um número primo é maior que 1 e não possui divisores positivos além de 1 e ele mesmo.

    Args:
        n (int): O número a ser verificado.

    Returns:
        bool: True se o número for primo, False caso contrário.
    """
    if n <= 1:
        return False
    for i in range(2, int(math.sqrt(n)) + 1):
        if n % i == 0:
            return False
    return True

if __name__ == "__main__":
    # Testes simples
    test_cases = [2, 3, 4, 17, 18]
    for num in test_cases:
        print(f"is_prime({num}) -> {is_prime(num)}")
```

Esta implementação segue princípios de clean code: inclui type hints para clareza de tipos, docstring para documentação, uso de bibliotecas padrão quando apropriado, e testes organizados em um bloco `if __name__ == "__main__"` para evitar execução indesejada ao importar o módulo.