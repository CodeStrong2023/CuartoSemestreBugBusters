import math
from decimal import Decimal

# NaN (Not a Number)
a = float('NaN') # no es sensible a mayúsculas y minúsculas
print(f"a: {a}")

# Módulo math
a = float("nan")
print(f"Es de tipo NaN(Not a Number)?: {math.isnan(a)}")

# Módulo decimal
a = Decimal("nan")
print(f"Es de tipo NaN(Not a umber)?: {math.isnan(a)}")