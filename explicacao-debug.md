# Explicação dos Erros - debug.py

## Erros Encontrados

### 1. **Linha 6 - Sintaxe Inválida em String**
```python
item1 = float(input(Preço do item 1? ))
```
**Problema**: Faltam aspas duplas ao redor da string "Preço do item 1?"
**Motivo**: Python não consegue interpretar o texto sem as aspas, causando um erro de sintaxe.
**Correção**:
```python
item1 = float(input("Preço do item 1? "))
```

---

### 2. **Linha 23 - Operação Matemática com String**
```python
desconto_cupom = (input("Você tem um cupom de desconto? (Digite o percentual ou 0): "))
desconto = subtotal * (desconto_cupom / 100)
```
**Problema**: A função `input()` retorna uma string. Não é possível fazer divisão (`/`) diretamente em uma string.
**Motivo**: Python não consegue dividir um número por uma string. É necessário converter a string para float ou int.
**Correção**:
```python
desconto_cupom = float(input("Você tem um cupom de desconto? (Digite o percentual ou 0): "))
```

---

### 3. **Linha 35 - F-string Sem Prefixo 'f'**
```python
print(" Item 2:        R$ {total_item2:.2f}")
```
**Problema**: A string não tem o prefixo `f`, então a variável `{total_item2}` não será interpolada.
**Motivo**: F-strings (formatted string literals) precisam do prefixo `f` para processar expressões dentro das chaves.
**Resultado**: Será exibido literalmente `R$ {total_item2:.2f}` em vez do valor.
**Correção**:
```python
print(f" Item 2:        R$ {total_item2:.2f}")
```

---

### 4. **Linha 39 - Comparação de String com Número**
```python
if desconto_cupom > 0:
```
**Problema**: `desconto_cupom` é uma string (retorno de `input()`), não pode ser comparada com 0 (número).
**Motivo**: Python não consegue comparar tipos diferentes de forma significativa (string vs número).
**Correção**: Converter para float quando capturar a entrada (ver erro #2).

---

### 5. **Linha 40 - Indentação Incorreta**
```python
if desconto_cupom > 0: 
print(f" Desconto ({desconto_cupom:.0f}%): -R$ {desconto:.2f}")
```
**Problema**: O `print()` deveria estar indentado dentro do bloco `if`, mas está no mesmo nível.
**Motivo**: A indentação em Python define os blocos de código. Sem indentação correta, o print será executado sempre, não apenas quando houver desconto.
**Correção**: Indentar a linha do print com 4 espaços.

---

## Resumo
- **Erro 1**: Sintaxe (aspas faltando)
- **Erro 2**: Tipo de dado (string ao invés de float)
- **Erro 3**: F-string mal formatada
- **Erro 4**: Comparação de tipos incompatíveis
- **Erro 5**: Indentação incorreta
