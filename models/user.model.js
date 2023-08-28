import { Schema, model } from 'mongoose';

const UserSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        required: [true, 'El email es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img: {
        type: String
    },
    role: {
        type: String,
        required: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    status: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

// Método que sobreescribira el toJSON del modelo
// Modificamos los datos que nos devuleve el método para mostrar solo los datos
// necesarios para el usuario.
UserSchema.methods.toJSON = function () {
    const { __v, password, _id, ...user } = this.toObject();
    return user;
}

export default model('User', UserSchema);
