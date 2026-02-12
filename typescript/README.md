# Tarea Dev Junior - Ruuf

## 🎯 Objetivo

El objetivo de este ejercicio es poder entender tus habilidades como programador/a, la forma en que planteas un problema, cómo los resuelves y finalmente cómo comunicas tu forma de razonar y resultados.

## 🛠️ Problema

El problema a resolver consiste en encontrar la máxima cantidad de rectángulos de dimensiones "a" y "b" (paneles solares) que caben dentro de un rectángulo de dimensiones "x" e "y" (techo).

## 🚀 Cómo Empezar

### Opción 1: Solución en TypeScript
```bash
cd typescript
npm install
npm start
```

### Opción 2: Solución en Python
```bash
cd python
python3 main.py
```

## ✅ Casos de Prueba

Tu solución debe pasar los siguientes casos de prueba:
- Paneles 1x2 y techo 2x4 ⇒ Caben 4
- Paneles 1x2 y techo 3x5 ⇒ Caben 7
- Paneles 2x2 y techo 1x10 ⇒ Caben 0

---

## 📝 Tu Solución

Primero, establecí un ciclo while dentro del cual se resta el ancho del panel al ancho del techo hasta que no quede espacio en el ancho del techo.

Luego, puse otro while dentro del cual se resta el alto del panel al alto del techo hasta que ya no queda espacio en el alto del techo.

Para ocupar los espacios que quedan con paneles volteados, puse un par de ifs que reestablecen el ancho del techo, en caso de que caigan más paneles volteados a lo ancho o que reestablece el alto del techo en caso de que caigan más paneles volteados a lo alto.

Luego repetí los while del inicio, pero con el ancho y el alto cambiado, esto me permite validar cuantos paneles volteados caben.

Finalmente, tengo un if que verifica si cabe más de un panel volteado. En ese caso, multiplica la cuenta de panel volteados a lo ancho por la de paneles volteados a lo alto y asigna el resultado a finalRotationCount.
Los siguientes else if validan si no cupo ningún panel volteado a lo largo o ancho respectivamente. Esto evita que la variable finalRotationCount cuente paneles a lo largo o ancho que no existen.

En el return multiplico los paneles que caben a lo largo y ancho (sin voltear) y les sumo la cuenta de paneles rotados.

Deja acá el link a tu video explicando tu solución con tus palabras

---

## 💰 Bonus (Opcional)

Si completaste alguno de los ejercicios bonus, explica tu solución aquí:

### Bonus Implementado
Opción 1 (techo triangular)

### Explicación del Bonus

Creé una nueva función llamada calculatePanelsTriangle, en ella calculé el factorPendienteAcostado que corresponde al espacio que se pierde entre el lado del triángulo y el rectángulo.

También el factorPendienteParado que corresponde al espacio que queda entre un rectángulo y el vértice si está puesto parado lo más arriba posible en el tríangulo.

Estos factores me permiten determinar que tanto del ancho y del alto del triángulo es realmente utilizable.

Antes de comenzar, resté al ancho y al alto del triángulo, los factores recién calculados.

Anidé un while dentro de otro, el primero valida que el panel es más pequeño que el espacio que queda disponible en el ancho y alto del triángulo. Además resta el alto de los rectángulos puestos en el primer "nivel" al alto del triángulo. Este while me permite ir recorriendo el alto del triángulo, llenandolo piso por piso.

Además le resta el factorPendienteAcostado multiplicado por la cuenta del alto (pisos o niveles) que se han ocupado en el triángulo. Esto me permite determinar correctamente el ancho disponible en el siguiente nivel.

El while que está dentro, resta el ancho del rectángulo al ancho disponible el nivel del triángulo que se está calculando.

El return muestra la cuenta de los rectangulos que llenaron los niveles del triángulo.

A esta función le falta calcular los rectángulos que cabrían parados, suponiendo que sobra espacio suficiente en el alto del triángulo.

Creé un archivo de test para los triangulos llamado test_cases_triangle.


---

## 🤔 Supuestos y Decisiones


Decidí validar la cantidad de rectángulos que caben en el techo utilizando geogebra.

En un inicio, para el caso del techo rectángular, estaba calculando usando como referencia el área de los rectángulos. Este enfoque no era correcto en casos donde sobraba un espacio muy largo, pero delgado dentro del techo.

Para el caso del techo triangular, me base en la ecuación de la recta, pues interpreté el techo como un plano cartesiano, con el (0,0) puesto en la intersección de la altura con la base del triángulo. 

A la función de calculo del techo triangular le falta determinar que pasa en casos donde quepan rectángulos cercanos al vértice del triángulo.

