import { request, response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const validateJWT = async (req = request, res = response, next) => {
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            message: 'Peticion desautorizada. Inicie sesion'
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        // Pasamos a través del `req` el userLoggedIn al controlador
        const userLoggedIn = await User.findById(uid);

        if (!userLoggedIn) {
            return res.status(401).json({
                message: 'Usuario no existe en Base de Datos'
            });
        }

        // Verificar que el uid tiene `status = true`
        if (!userLoggedIn.status) {
            return res.status(401).json({
                message: 'Usuario deshabilitado'
            });
        }

        req.userLoggedIn = userLoggedIn;

        next();
    } catch (error) {
        res.status(401).json({
            message: 'No existe token en la peticion'
        });

        throw new Error(error);
    }
}

export { validateJWT };
