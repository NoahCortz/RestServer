import { request, response } from 'express';
import bcryptjs from 'bcryptjs';

// Importando mis modelos
import User from '../models/user.model.js';


const userGet = async (req = request, res = response) => {
    const { limit = 5, from = 0 } = req.query;

    const [ total, users ] = await Promise.all([
        User.countDocuments({ status: true }),
        User.find({ status: true })
            .skip(Number(from))
            .limit(Number(limit))
    ]);

    res.json({
        message: 'Lista de usuarios',
        total,
        from,
        limit,
        users
    });
}

const userPut = async (req = request, res = response) => {
    const id = req.params.id;
    const { password, google, _id, email, ...rest } = req.body;

    if (password) {
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync(password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(id, rest, { new: true });

    res.status(200).json({
        message: 'Usuario actualizado correctamente.',
        user: updatedUser
    });
}

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
    const { name, email, password, role } = req.body;

    const createdUser = new User({ name, email, password, role });

    const salt = bcryptjs.genSaltSync();
    createdUser.password = bcryptjs.hashSync(password, salt);

    await createdUser.save();

    res.status(201).json({
        message: 'Usuario creado correctamente.',
        user: createdUser
    });
}

const userDelete = async (req = request, res = response) => {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndUpdate(id, { status: false });

    res.status(200).json({
        message: 'Usuario eliminado correctamente.',
        deletedUser
    });
}

export {
    userGet,
    userPut,
    userPatch,
    userPost,
    userDelete
}
