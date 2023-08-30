import { Router } from 'express';
import { check } from 'express-validator';

import {
    userDelete,
    userGet,
    userPatch,
    userPost,
    userPut
} from '../controllers/user.controller.js';

import {
    validateFields,
    validateJWT,
    haveAdminPermission,
    isAdminRole
} from '../middlewares/index.js';

import {
    isRoleValid,
    isUserEmailValid,
    isUserIdValid
} from '../helpers/database-validators.js';


const userRouter = Router();

userRouter.get('/', [
    validateJWT,
    haveAdminPermission(
        'ADMIN_ROLE',
        'SUPPORT_ROLE',
        'SERVICE_ROLE',
        'USER_ROLE'
    ),
    validateFields
], userGet);

userRouter.put('/:id', [
    validateJWT,
    haveAdminPermission('ADMIN_ROLE', 'SUPPORT_ROLE'),
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom( isUserIdValid ),
    check('role').custom( isRoleValid ),
    validateFields
], userPut);

userRouter.patch('/', [
    validateJWT,
    isAdminRole,
    validateFields
], userPatch);

userRouter.post('/', [
    validateJWT,
    haveAdminPermission('ADMIN_ROLE', 'SUPPORT_ROLE', 'SERVICE_ROLE'),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check(
        'password',
        'La contraseña es obligatoria y debe tener al menos 6 caracteres'
    ).isLength({ min: 6 }),
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
