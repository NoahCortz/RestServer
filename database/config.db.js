import mongoose from 'mongoose';

const mongoDBConnection = async () => {
    try {
        // Realizando la conexión a la base de datos MongoDB
        await mongoose.connect(process.env.MONGODB_CNN);

        console.log('Base de Datos en línea!');
    } catch (error) {
        throw new Error('Error de conexion a la base de datos: ' + error);
    }
}

export {
    mongoDBConnection
}
