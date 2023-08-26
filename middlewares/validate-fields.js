import { request, response } from 'express';
import { validationResult } from 'express-validator';

const validateFields = (req = request, res = response, next) => {
    // Obteniendo validaciones de express-validator
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    // Si no existen errores, continúa el proceso
    next();
}

export { validateFields }
