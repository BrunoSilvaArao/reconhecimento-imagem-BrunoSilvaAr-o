from typing import Iterable, Tuple


def calculate_statistics(values: Iterable[float]) -> Tuple[float, float, float, float]:
    """
    Calcula a soma, média, máximo e mínimo dos valores numéricos fornecidos.

    Args:
        values (Iterable[float]): Uma sequência iterável de valores numéricos.

    Returns:
        Tuple[float, float, float, float]: Uma tupla contendo a soma, média, máximo e mínimo, nessa ordem.

    Raises:
        ValueError: Se a lista de valores estiver vazia.
    """
    numbers = list(values)  # Converte iterável para lista para permitir múltiplas operações
    if not numbers:  # Verifica se a lista está vazia para evitar divisão por zero
        raise ValueError("A lista de valores não pode estar vazia.")

    total = sum(numbers)
    average = total / len(numbers)
    maximum = max(numbers)
    minimum = min(numbers)
    return total, average, maximum, minimum


def main() -> None:
    values = [23, 7, 45, 2, 67, 12, 89, 34, 56, 11]
    total, average, maximum, minimum = calculate_statistics(values)

    print("total:", total)
    print("media:", average)
    print("maior:", maximum)
    print("menor:", minimum)


if __name__ == "__main__":
    main()