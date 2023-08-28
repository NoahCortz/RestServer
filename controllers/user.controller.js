import { request, response } from 'express';
import bcryptjs from 'bcryptjs';

// Importando mis modelos
import User from '../models/user.model.js';


const userGet = ( req = request, res = response) => {
    // Obtenemos todos los queryParams que el usuario ingrese
    const { name, apiKey, page = '1', limit = 5 } = req.query;

    res.json({
        message: 'Get API | Controller',
        query: {
            name,
            apiKey,
            page,
            limit
        }
    });
}

// Realizar actualizaciones completas
const userPut = async (req = request, res = response) => {
    const id = req.params.id;
    const { password, google, _id, email, ...rest } = req.body;

    if (password) {
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync(password, salt);
    }

    // El tercer parámetro de findByIdAndUpdate indica que se devuelva el usuario actualizado
    const updatedUser = await User.findByIdAndUpdate(id, rest, { new: true });

    res.status(200).json({
        message: 'Usuario actualizado correctamente.',
        user: updatedUser
    });
}

// Realizar actualizaciones parciales
const userPatch = ( req = request, res = response) => {
    const { id, name, email } = req.body;

    res.status(200).json({
        message: 'Patch API | Controller',
        dataChanged: {
            id,
            name,
            email
        }
    });
}

const userPost = async (req = request, res = response) => {
    // Desestructurando datos obtenidos desde request.body
    const { name, email, password, role } = req.body;

    // Creando instancia del modelo User
    const createdUser = new User({ name, email, password, role });

    // Encriptando la contraseña
    const salt = bcryptjs.genSaltSync();
    createdUser.password = bcryptjs.hashSync(password, salt);

    // Guardando en la base de datos
    await createdUser.save();

    res.status(201).json({
        message: 'Usuario creado correctamente.',
        user: createdUser
    });
}

const userDelete = ( req = request, res = response) => {
    // Obteniendo el id desde parametros de la url
    const id = req.params.id;

    res.status(200).json({
        message: 'Delete API | Controller',
        id
    });
}

export {
    userGet,
    userPut,
    userPatch,
    userPost,
    userDelete
}
