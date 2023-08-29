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
        required: true
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

// Sobre-escribiendo el método toJSON
UserSchema.methods.toJSON = function () {
    const { __v, password, _id, ...user } = this.toObject();
    return user;
}

export default model('User', UserSchema);
