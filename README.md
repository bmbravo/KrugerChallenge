## Kruger Challenge

En esta aplicación me he enfocado en desarrollar el front-end para una aplicación web enfocada a registrar el estado de vacunación de los empleados de Kruger Corporation.

Especificaciones:

- Se desarrolló un back-end para servir todos los datos necesarios, se uso Express.js, Mongoose y MongoDB como tecnologías principales.
- En el front-end se uso React.js para los diferentes componentes y pantallas de la aplicación, como store de datos se utilizó Redux y React-Router para manejar las rutas.
- El rol de `Administrador` tiene acceso a un menú que le permite visualizar a todos los empleados registrados y editar su información, tambien puede registrar nuevos empleados en la aplicación.
- Como usuario normal, tenemos acceso para visualizar y editar nuestra información.
- Cuando un `Administrador` registra un nuevo empleado, automaticamente se crea un usuario y contraseña, el usuario se crea a partir de las dos primeras letras de su primer nombre más su primer apellido y la contraseña es su número de cedula.

## Demo

https://kruger-vaccineapp.herokuapp.com/

## Instalación local

Para empezar a probar la aplicación de forma local en nuesto computador, es necesario seguir los siguientes pasos.

### Requisitos

- Node.js y npm
- git
- Cluster gratuito en mongoDB Atlas: https://www.mongodb.com/basics/clusters/mongodb-cluster-setup

### Installation

1. Clonar el repositorio.
   ```sh
   git clone https://github.com/bmbravo/KrugerChallenge.git
   ```
2. Instalar los paquetes de NPM en la carpeta principal y en la carpeta frontend.
   ```sh
   npm install
   ```
3. Creamos un archivo .env en la carpeta principal y usamos la siguiente configuración.

   ```sh
   NODE_ENV = development
   PORT = 5000
   CLIENT_URL = http://localhost:3000

   MONGO_URI = <your mongo connection string goes here>

   JWT_SECRET = <your secret goes here>
   JWT_EXPIRE = 10d
   ```

4. Llenamos la base de datos con datos de prueba, en la ruta principal corremos el siguiente comando.
   ```sh
   npm run data:import
   ```
5. Corremos el proyecto con el siguiente comando en la carpeta principal.
   ```sh
   npm run dev
   ```
6. Usamos las siguientes credenciales para iniciar sesion como administrador.
   ```sh
   admin:admin
   ```
