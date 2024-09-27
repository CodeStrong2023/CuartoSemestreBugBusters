# Profundizando en el tipo String
#Concatenación automática en Python
mensaje = "Hola " + "alumnos" # no es necesario usar el signo +
print(mensaje)

variable2 = " Adiós"
mensaje = "Hola ""alumnos" + variable2
mensaje += ", terminamos"
print(mensaje)

# Usamos la clase help para ayuda o documentación (built-in)
help(str)