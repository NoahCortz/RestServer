import bcryptjs from 'bcryptjs';
import { json, request, response } from 'express';

import User from '../models/user.model.js';
import { generateJWT } from '../helpers/generate-jwt.js';
import { googleVerify } from '../helpers/google-verify.js';

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
        const token = await generateJWT(userExist.id);

        res.json({
            message: 'Inicio de sesión correcto.',
            userExist,
            token
        });
    } catch (error) {
        res.status(500).json({
            message: 'No se pudo iniciar sesion.'
        });

        throw new Error(error);
    }
}

const googleSignInController = async (req = request, res = response) => {
    const { id_token } = req.body;

    try {
        const { name, picture, email } = await googleVerify(id_token);

        let userFromGoogle = await User.findOne({ email });

        // El usuario no existe
        if (!userFromGoogle) {
            const data = {
                name,
                email,
                password: 'NO-PASS',
                img: picture,
                google: true
            };

            userFromGoogle = new User(data);
            await userFromGoogle.save();
        }

        // Usuario habilitado en BD
        if (!userFromGoogle.status) {
            return res.status(401).json({
                message: 'Usuario no habilitado. Comuniquese con el Admin'
            });
        }

        // Generar JSON Web Token
        const token = await generateJWT(userFromGoogle.id);

        res.json({
            userFromGoogle,
            token
        });

    } catch (error) {
        res.status(400).json({
            result: false,
            message: 'El token no se pudo verificar'
        });
    }

}

export {
    loginController,
    googleSignInController
}
