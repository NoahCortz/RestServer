import express from 'express';
import cors from 'cors';

import { mongoDBConnection } from '../database/config.db.js';

// Importando mis rutas
import userRouter from '../routes/user.routes.js';
import authRouter from '../routes/auth.routes.js';

export default class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.connectDB();

        this.middlewares();

        this.routes();
    }

    async connectDB() {
        await mongoDBConnection();
    }

    middlewares() {
        this.app.use( cors() );

        this.app.use( express.json() );

        this.app.use( express.static('public') );
    }

    routes() {
        this.app.use('/api/v1/auth', authRouter);
        this.app.use('/api/v1/usuarios', userRouter);
    }

    start() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto: http://localhost:${this.port}`)
        });
    }
}
