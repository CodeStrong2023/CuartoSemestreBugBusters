#Profundizamos en el tipo de dato float

a = 3.0
print(f"a:{a}")

#constructor del tipo float -> puede recibir int y str
a = float(10)
a = float('10')
print(f"a:{a:.2f}")

#Notacion exponencial 
a = 3e5
print(f"a:{a}")

a = 3e-5
print(f"a:{a:.5f}")

#cualquier calculo que involucre un float, el resultado sera un float
a = 4.0 + 5
print(a)
print(type(a))

