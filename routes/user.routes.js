import { Router } from 'express';
import { check } from 'express-validator';
import {
    userDelete,
    userGet,
    userPatch,
    userPost,
    userPut
} from '../controllers/user.controller.js';
import { validateFields } from '../middlewares/validate-fields.js';
import { validateJWT } from '../middlewares/validate-jwt.js';
import { isAdminRole } from '../middlewares/validate-roles.js';

import { isRoleValid, isUserEmailValid, isUserIdValid } from '../helpers/database-validators.js';


const userRouter = Router();

userRouter.get('/', userGet);

userRouter.put('/:id', [
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom( isUserIdValid ),
    check('role').custom( isRoleValid ),
    validateFields
], userPut);

userRouter.patch('/', userPatch);

userRouter.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatoria y debe tener al menos 6 caracteres').isLength({ min: 6 }),
    check('email', 'El correo no es válido').isEmail(),
    check('email').custom( isUserEmailValid ),
    check('role').custom( isRoleValid ),
    validateFields
], userPost);

userRouter.delete('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom( isUserIdValid ),
    validateFields
], userDelete);

export default userRouter;
