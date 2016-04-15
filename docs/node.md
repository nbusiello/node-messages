# Node

## REPL (Read-Eval-Print-Line)

```bash
$ node
```

## Imports (requires)

```javascript
const util = require('util'); // core node (http, assert, crypto, etc)
const mongoose = require('mongoose'); // librerias que importes usando npm
const feriados = require('../src/feriados'); // codigo propio en el path, se puede omitir el .js

feriados.esFeriado(new Date());
```

## exports vs. module.exports

```javascript
// ./src/feriados.js

const ultimoMes = 12;
let contador = 0;

function esFeriado (date) {

  // TODO faltan todos los demas feriados.

  if (date.getMonth() === ultimoMes && date.getDay() === 31) { // anio nuevo
    return true;
  }

  // me gusta contar cuando me llaman la funcion
  contador++;

  return false;
}

// aca exportamos
```

### exports

`exports` es util cuando tenemos que exportar mas de una cosa.

```javascript
exports; // {}
exports.esFeriado = esFeriado;
exports; // { esFeriado: [Function] }

...

exports.noEsFeriado = () => { ... };
exports.elUltimoMesDelAnio = 12;

exports; // { esFeriado: [Function], noEsFeriado: [Function], elUltimoMesDelAnio: 12 };
```

### module.exports

`module.exports` sirve para generalmente exportar una sola cosa.

```javascript
module.exports.esFeriado = esFeriado; // es equivalente a:
exports.esFeriado = esFeriado;

// puedo hacer: feriados.esFeriado(new Date());

// !==

module.exports = esFeriado;

// puedo hacer: feriados(new Date());
```

## Variables de entorno en node

- `NODE_ENV`: se utiliza para saber el environment (development, staging, production)

### Como declararlas

```bash

# 1er alternativa, dura lo que viva la pestania de la terminal

$ exports NODE_ENV=production
$ echo $NODE_ENV # production
$ node index.js

# 2da alternativa, pasarle la variable a node

$ NODE_ENV=production MI_SUPER_CLAVE=1234 node index.js
```

### Como accederlas

```javascript
process.env.MI_SUPER_CLAVE; // 1234
```

## npm (node package manager) -> administrador de dependencias

Para instalar modulos de terceros, y publicar los mios.

### Como instalar dependencias

Se pueden instalar dependencias y dependencias de desarrollo:

- son las que se usan para los tests
- o son herramientas para compilar
- o sea, no se usan en produccion (mocha, chai, etc)

### Para instalar nuevas dependencias

```bash
$ npm install --save {nombre de las dependencias, ...}
$ npm install --save-dev {nombre de las dependencias, ...}
```

### Para instalar todas las que estan en el `package.json`

Util despues de clonar un proyecto de node

```bash
$ npm install # instala todo (dependencies, devDependencies)
$ npm install --production # (no instala devDependencies)
# alternativamente si NODE_ENV=production $ npm install solo HACE lo mismo
```

### Algunos comandos mas

- `$ npm init` sirve para inicializar un proyecto que usa npm
- `$ npm start` sirve para correr algun script en la seccion de `scripts`
