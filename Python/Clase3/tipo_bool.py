# Bool contiene los valores de True y False
# Los tipos numéricos, son false para el 0 y true para los demás valores
# desde 0.1 ya es True
valor = 0
resultado = bool(valor)
print(f"valor: {valor}, resultado: {resultado}")

valor = 15
resultado = bool(valor)
print(f"valor: {valor}, resultado: {resultado}")

# Tipo string -> False "", True demás valores
valor = ""
resultado = bool(valor)
print(f"valor: {valor}, resultado: {resultado}")

valor = "Hola"
resultado = bool(valor)
print(f"valor: {valor}, resultado: {resultado}")

# Tipo colecciones -> False para colecciones vacías
# Tipo colecciones -> True para todas las demás
# Lista
valor = []
resultado = bool(valor)
print(f"valor lista vacía: {valor}, resultado: {resultado}")

valor = [4,5,6]
resultado = bool(valor)
print(f"valor: {valor}, resultado: {resultado}")

# Tupla
valor = ()
resultado = bool(valor)
print(f"valor tupla vacía: {valor}, resultado: {resultado}")

valor = (3,7,8)
resultado = bool(valor)
print(f"valor: {valor}, resultado: {resultado}")

# Diccionario
valor = {}
resultado = bool(valor)
print(f"valor diccionario vacío: {valor}, resultado: {resultado}")

valor = {"nombre": "Angelina", "apellido": "Pizzolatto"}
resultado = bool(valor)
print(f"valor diccionario vacío: {valor}, resultado: {resultado}")

# Sentendias de control con bool
if "":
    print("Regresa verdadero")
else:
    print("Regresa falso")
    
# Ciclos
variable = 3
while variable:
    print("Regresa verdadero")
    break
else:
    print("Regresa falso")