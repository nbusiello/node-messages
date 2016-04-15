# Javascript

## Tipos de datos primitivos

- Boolean
- null
- undefined
- Number
- String
- Function

```javascript
// Boolean

var estaAbierto = true; // aca esto es un boolean
estaAbierto = 17; // esta permitido

estaAbierto = new Boolean(false); // no lo usa nadie

// null

var objeto = null; // null significa que no tiene valor

// undefined

var indefinido; // === undefined

indefinido // undefined
chau // undefined

var sarasa = 1; // 1
sarasa = undefined; // undefined

// Number

var numero = 17;
var flotante = 17.2;

numero = new Number(10);

// String

var nombre = 'Naty'; // puede ser con '' o con ""

nombre = new String('esto es un string');

'Hola ' + nombre; // 'Hola Naty'

'Hola "ramon"' // si
"hola \"ramon\"" // si anda, pero mejor usar lo de arriba

// typeof

typeof a // 'number'
typeof a === 'number' // true
```

## Tipo de datos abstractos

- Object
- Array
- Date

```javascript
// Object

var objeto = {}; // se pueden agregar atributos en la declaracion

objeto.hola = 'mundo'; // { hola: 'mundo' }
objeto.chau = 1; // { hola: 'mundo', chau: 1 }

delete objeto.chau; // { hola: 'mundo' }

var otroObjeto = {
  hola: 'mundo',
  chau: true,
  otraCosa: 17,
  otroObjeto: {
    soy: 'otro',
    si: false
  },
  accion: function () {
    // hago algo
  }
};

// Array

var arr = [1, 2, 3, 4, 5, null, 'string mala onda', 7, undefined, 1, 1, 1];

arr.push('1');
arr.push('2');

// [..., 1, 2]

arr.pop();

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array

array.length; // 2

// Date

var hoy = new Date(); // ISO Date

// Mon Apr 04 2016 18:51:34 GMT+0200 (CEST)
```

## Declaracion Variables

### Local (Alcance -> Scope)

```javascript
var {nombre_variable} = {asignacion};

var hola = 'mundo';
```

### Global (Alcance -> Scope)

```javascript
{nombre_variable} = {asignacion}; // global

hola = 'mundo';
```

## Funciones

Nomenclatura: nombres en minusculas o `camelCase`

### Named functions (funciones con nombre)

```javascript
function diceMiNombre(nombre) {
  console.log('Hola ' + nombre); // concatena Strings
}

diceMiNombre('Naty'); // 'Hola Naty';
```

### Anonymous functions (funciones anonimas);

```javascript
var miNombre = function (nombre) {
  return 'Hola ' + nombre;
}

miNombre('Naty'); // 'Hola Naty';

miNombre = function (nombre) {
  return 'Hola ' + nombre;
}

miNombre('Naty'); // 'Chau Naty';
```

### Ejemplos funciones anonimas

```javascript
var arr = [1, 2, 3, 4, 5, 6];

// funcion duplicadora

arr.map(function (valor) {
    return valor * 2;
});

// [1, 2, 3, 4, 5, 6] -> el original queda igual
// [2, 4, 6, 8, 10, 12] -> devuelve

arr.reduce(function (previo, actual) {
  return previo + actual;
});

// 42

var duplicador = function (valor) {
    return valor * 2;
};

arr
  .map(duplicador)
  .reduce(function (previo, actual) {
    return previo + actual;
  });

// 42

```

### Scope

```javascript
function merequetengue () {
  var a = 1234;
  return a;
}

var arr = [1, 2, 3, 4];
for (var i = 0; i < arr.length; i++) {
  var j = i;
  console.log(arr[i]);
}

j // 3 ???
i // 3 ???
a // undefined
```

### Hoisting

```javascript

// Antes de ser interpretado

function test () {
  var arr = [1, 2, 3, 4];
  for (var i = 0; i < arr.length; i++) {
    var j = i;
    console.log(arr[i]);
  }
}

// Despues

function test () {
  var arr = [1, 2, 3, 4];
  var i = 0;
  var j;

  for (i; i < arr.length; i++) {
    j = i;
    console.log(arr[i]);
  }

  j // 3 ???
  i // 3 ???
  a // undefined
}
```

## Operadores

- +
- -
- /
- *
- % (modulo)
- ! (not)
- ++a, a++
- --a, a--
- == (comparacion)
- === (comparacion estricta)
- != (distinto)
= !=== (distinto estricto)

```javascript
1 == '1' // true
1 === '1' // false

1 == true // true
1 === true // false
```

## Concatenacion de Strings

```javascript
'Hola ' + 'Naty'; // Hola naty
```

## Bloques de control

```javascript
for (var i = 0; i < array.length; i++) {
  array[i]
}

var arr = [1, 2, 3];
for (var v in arr) {
  // v ...1, 2, 3
}

while (true) {
  // forever
}

do {
  // forever
} while (true);

if (true) {

}

if (true) {

} else {

}

if (true) {

} else if (true) {

}

function saludo (nombre) {

  // cascading (cascadeo)
  // usar break! o return!!

  switch (nombre) {
    case 'diego':
      return 'Hola dieguito';
      break; // opcional si haces return (esto nunca se va a ejecutar)
    case 'natalia':
      return 'Hola natalita'
      break;
    case 'roberto':
    case 'robert':
      return 'Hola rob';
      break;
    default:
      return 'Hola desconocido';
  }
}
```

## Objetos

Nota: Nunca se modela como POO en Javascript
Nomenclatura: Nombre en mayusculas

```javascript
function Persona (nombre, apellido) {
  this.nombre = nombre;
  this.apellido = apellido;
  this.console = 1234; // ejemplo para romper todo
}

var naty = new Persona('natalia', 'busiello'); // constructor de Persona
naty.nombre // 'natalia'

var diego = Persona('diego', 'acosta'); // function

// Ejemplo con console.log

console = {};
console.log = function (att) {
  // imprime en consola
}
this.console; // global --> this apunta al objeto global
```

### Pasaje por valor o referencia

Todos son por valor excepto Objetos (incluye arrays)

```javascript
var a = {};

function agrega (obj) {
  obj.nombre = 'roberto';
  obj = { sarasa: 1 }; // esto no hace un carajo
}

agrega(a);
a; // { nombre: 'roberto' }

```

### Objetos con funciones

```javascript
function Persona () {
  this.nombre = nombre;
  this.apellido = apellido;
}

Persona.prototype.saludar = function () {
  return 'Hola soy ' + this.nombre;
};

var naty = new Persona('natalia', 'busiello');
naty.saludar(); // 'Hola soy natalia'
```

### Manejo de errores

Javascript tiene `try catch`

```javascript
try {
  var a = 1;
  a++
  throw new Error('se cago todo papa');
} catch (e) {
  console.log('error', e.message, e.stack)
}

var b = 17;
```

# Javascript es6 (Node 4.x)

Para poder usarlo declarar en la primer linea del archivo:

`'use strict';`

```javascript
const a = 1;
a = 17 // boom

let b = 5;
b = 9; // todo bien

let nombre = 'ramon';

return {
  nombre, // === nombre: 'ramon'
  soltero: true
};

// Arrow functions

map.reduce((previo, siguiente) => previo + siguente) // return previo + siguiente

var saludar = (nombre) => {
  var a = 1;
  return 'hola ' + nombre;
}

let nombre = 'naty';
'hola ' + nombre; // hola naty
`hola ${nombre}, ${apellido}` // hola naty, busiello --> printf("hola %s, %s", nombre, apellido)

```
