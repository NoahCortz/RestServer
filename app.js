import 'dotenv/config';
import Server from './classes/server.js';


// Creamos la instancia de nuestro servidor
const server = new Server();

// Llamamos el metodo que nos levantara la aplicacion
server.start();
