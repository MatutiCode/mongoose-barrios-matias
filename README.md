# API de Mangas - Práctica de MongoDB y Mongoose 

Instalación

1. Clonar el repositorio e ingresar a la carpeta.
2. Instalar las dependencias

```
npm install
 ```

3. Crear un archivo .env a partir de .env.example y completar los valores:

```
PORT=3003

MONGO_URI=mongodb://127.0.0.1:27017/db-manga
 ```

4. Tener MongoDB corriendo y levantar el servidor:
```
npm run dev
```

# Justificación

Editorial (embebida). La editorial pertenece solo a ese manga, se consulta siempre junto con él, es un dato chico y no crece sin límite. Embeberla permite traer todo en una sola consulta y actualizarlo de forma atómica. La desventaja es que si dos mangas tienen la misma editorial, el dato se repite, pero en este caso es aceptable porque la editorial no tiene datos propios que gestionar.

Anime y Manga (1:1 por referencia). Se eligió referencia y no embebido porque el anime es una entidad propia, con su propio CRUD y su propio ciclo de vida (estudio, año de estreno, episodios), y puede consultarse y actualizarse sin tocar el manga. La regla de "un solo anime por manga" se garantiza con unique: true en el campo manga.

Autor y Manga (1:N por referencia). Un autor tiene muchos mangas y puede existir sin ellos. Si los mangas estuvieran embebidos en el autor, el documento crecería sin límite y no se podría consultar un manga de forma independiente. La referencia se guarda del lado "muchos" (Manga.autor), que es lo habitual en MongoDB.

Manga y Genero (N:M por referencia). Un manga tiene varios géneros y un género está en muchos mangas. Embeber los géneros duplicaría sus datos en cada manga y obligaría a modificarlos uno por uno. Con un array de ObjectId, los géneros se mantienen en su propia colección y se comparten.