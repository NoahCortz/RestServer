import { Router } from 'express';
import { check } from 'express-validator';

import { googleSignInController, loginController } from '../controllers/auth.controller.js';
import { validateFields } from '../middlewares/validate-fields.js';

const authRouter = Router();

authRouter.post('/login', [
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validateFields
], loginController);

authRouter.post('/google', [
    check('id_token', 'ID_TOKEN es necesario').not().isEmpty(),
    validateFields
], googleSignInController);

export default authRouter;
