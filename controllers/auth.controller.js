import bcryptjs from 'bcryptjs';
import { request, response } from 'express';

import User from '../models/user.model.js';

const loginController = async (req = request, res = response) => {
    const { email, password } = req.body;

    try {
        // Verificar que el `email` existe en BD
        const userExist = await User.findOne({ email });

        if (!userExist) {
            return res.status(400).json({
                message: 'Usuario/Password no son correctos*'
            });
        }

        // Verificar que el usuario está activo
        if (!userExist.status) {
            return res.status(400).json({
                message: 'Usuario/Password no son correctos.'
            });
        }

        // Verificar la contraseña
        const isValidPassword = bcryptjs.compareSync(password, userExist.password);

        if (!isValidPassword) {
            return res.status(400).json({
                message: 'Usuario/Password no son correctos'
            });
        }

        // Generar JSON Web Token


        res.json({
            message: 'Inicio de sesión correcto.',
            data: {
                email,
                password
            }
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: 'Hable con el administrador'
        });
    }
}

export {
    loginController,
}
