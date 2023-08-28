import express from 'express';
import cors from 'cors';

import { mongoDBConnection } from '../database/config.db.js';

// Importando mis rutas
import router from '../routes/user.routes.js';

export default class Server {
    constructor() {
        // App y port
        this.app = express();
        this.port = process.env.PORT;

        // Conexion a Base de Datos
        this.connectDB();

        // MIDDLEWARES
        this.middlewares();

        // Mis Rutas
        this.routes();
    }

    async connectDB() {
        await mongoDBConnection();
    }

    // Configurando middlewares
    middlewares() {
        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body para leer dato JSON
        this.app.use( express.json() );

        // Sirviendo directorio publico | la ruta principal ya no esta sirviendo
        this.app.use( express.static('public') );
    }

    // Configurando rutas
    routes() {
        this.app.use('/api/v1/usuarios', router);
    }

    // Inicializando la aplicacion
    start() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto: http://localhost:${this.port}`)
        });
    }
}
