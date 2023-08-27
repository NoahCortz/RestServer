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
import { isRoleValid } from '../helpers/database-validators.js';


const router = Router();

router.get('/', userGet);

router.put('/:id', userPut);

router.patch('/', userPatch);

router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatoria y debe tener al menos 6 caracteres').isLength({ min: 6 }),
    check('email', 'El correo no es válido').isEmail(),
    check('role').custom( isRoleValid ),
    validateFields
], userPost);

router.delete('/:id', userDelete);

export default router;
