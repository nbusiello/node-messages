# Mongo + Mongoose

Mongo es una base de datos documental:

- collection: ~tabla
- document: ~fila en la tabla

Schemaless: Sin schema -> no se describe el formato de los documentos.

# Correr server mongo

Para correr el server de mongo:

`$ mongod`

## Consola de mongo

Nos sirve para conectarse con las bases y correr queries:

- Tiene que estar ya corriendo el server

`$ mongo`

## Comandos

- `show dbs`
- `use {db}`: selecciona una db a usar con los comandos siguientes
- `show collections`: muestra colecciones en mongo (relacional == tablas)

### Insertar

Con la base seleccionada

`db.{nombre_collection}.insert({ json })`

Ej:

```
> db.messages.insert({ "sarasasasa": 1 })
WriteResult({ "nInserted" : 1 })
```

# Leer

`db.messages.find({ condiciones })`

# Borrar

`db.messages.remove({ condiciones })`

```
> db.messages.remove({})
WriteResult({ "nRemoved" : 6 })
```

# Mongoose

Agrega esquemas a mongo usando `Model`s === collection

## Schema

- Atributos tipados
- Indices
- Validaciones
- Requeridos
- Unicos
- Referencias a otros modelos (`.populate` --> pseudo `JOIN SQL`)
