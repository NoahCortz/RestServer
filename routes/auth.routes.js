import { Router } from 'express';
import { check } from 'express-validator';

import { loginController } from '../controllers/auth.controller.js';
import { validateFields } from '../middlewares/validate-fields.js';

const authRouter = Router();

authRouter.post('/login', [
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validateFields
], loginController);

export default authRouter;
