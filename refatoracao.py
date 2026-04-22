from typing import Iterable, Tuple


def calculate_statistics(values: Iterable[float]) -> Tuple[float, float, float, float]:
    """Return the sum, average, maximum and minimum of the given numeric values."""
    numbers = list(values)
    if not numbers:
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