import express from 'express';
import cors from 'cors';

// Importando mis rutas
import router from '../routes/user.routes.js';

export default class Server {
    constructor() {
        // App y port
        this.app = express();
        this.port = process.env.PORT;

        // MIDDLEWARES
        this.middlewares();

        // Mis Rutas
        this.routes();
    }

    // Configurando middlewares
    middlewares() {
        // CORS
        this.app.use( cors() );

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
            console.log(`Servidor corriendo en el puerto: ${this.port}`)
        });
    }
}
