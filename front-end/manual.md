# Thrifty - Instrucciones para correr el proyecto

## Pasos para correr en terminal (instalar front y back):

1.- Tener mysql abierto y crear la base de datos "thrifty_db".

2.- Abrir la terminal para acceder a la carpeta donde se tienen instalados los archivos.

3.- `npm i` para instalar todas las dependencias.

4.- `npm run dev` para correr.

Pasos del 2-4 se tienen que repetir en una terminal con el "cd" en el backEnd.
Link del backEnd:
https://github.com/Payday69/backEnd

5.- En la base de datos, insertar en tabla users un usuario con "@" en alguna parte, en lo personal recomendamos en un query pegar lo siguiente:

```sql
USE thrifty_db;

INSERT INTO users (id, email, password) VALUES
("1", "admin@tec.com", "12345");
