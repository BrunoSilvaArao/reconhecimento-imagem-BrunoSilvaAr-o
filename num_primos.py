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