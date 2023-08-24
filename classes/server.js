import express from 'express';


export default class Server {
    constructor() {
        // Creamos instancia de express asignandola a la variable de la clase
        this.app = express();

        // Creamos nuestra variable para establecer el puerto de escucha
        this.port = process.env.PORT;

        // MIDDLEWARES
        this.middlewares();

        // Invocamos el metodo para llamar las rutas del RestServer
        this.routes();
    }

    // Configurando middlewares
    // Los middlewares nos permiten crear reglas o funciones que nos proveen
    // de funcionalidad o configuraciones extras para la aplicacion
    middlewares() {
        // Sirviendo directorio publico | la ruta principal ya no esta sirviendo
        this.app.use( express.static('public') );
    }

    // Configurando rutas
    // Este metodo contiene todas las rutas que estaremos configurando
    routes() {
        this.app.get('/api', (req, res) => {
            res.send('Hello, world!');
        });
    }

    // Inicializando la aplicacion
    start() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto: ${this.port}`)
        });
    }
}
