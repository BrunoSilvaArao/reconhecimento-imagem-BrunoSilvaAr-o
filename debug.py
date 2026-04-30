#                                      CÓDIGO COM ERROS                           
# ENTRADA DE DADOS
cliente = input("Qual é seu nome? ")

qtd1 = int(input("Quantidade do item 1: "))  # Converte para int para cálculos numéricos
item1 = float(input("Preço do item 1? "))  # Converte para float para precisão decimal

qtd2 = int(input("Quantidade do item 2: "))  # Converte para int para cálculos numéricos
item2 = float(input("Preço do item 2? "))  # Converte para float para precisão decimal

qtd3 = int(input("Quantidade do item 3: "))  # Converte para int para cálculos numéricos
item3 = float(input("Preço do item 3? "))  # Converte para float para precisão decimal

# CÁLCULOS DOS ITENS
total_item1 = qtd1 * item1
total_item2 = qtd2 * item2
total_item3 = qtd3 * item3

subtotal = total_item1 + total_item2 + total_item3
imposto = subtotal * 0.10  # Imposto calculado sobre o subtotal antes do desconto

# DESCONTO
desconto_cupom = float(input("Você tem um cupom de desconto? (Digite o percentual ou 0): "))  # Converte para float para cálculo percentual
desconto = subtotal * (desconto_cupom / 100)  # Desconto aplicado sobre o subtotal

# TOTAL FINAL
total = subtotal + imposto - desconto

# EXIBIÇÃO
linha = "=" * 31
separador = "-" * 31

print(linha)
print(f" Cliente: {cliente}")
print(linha)
print(f" Item 1:        R$ {total_item1:.2f}")
print(f" Item 2:        R$ {total_item2:.2f}")
print(f" Item 3:        R$ {total_item3:.2f}")
print(separador)
print(f" Subtotal:      R$ {subtotal:.2f}")
print(f" Imposto (10%): R$ {imposto:.2f}")

if desconto_cupom > 0:  # Exibe desconto apenas se houver cupom
    print(f" Desconto ({desconto_cupom:.0f}%): -R$ {desconto:.2f}")

print(linha)
print(f" TOTAL:         R$ {round(total, 2):.2f}")  # Arredonda para 2 casas decimais para evitar erros de ponto flutuante
print(linha)