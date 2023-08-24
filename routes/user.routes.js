import { Router } from 'express';
import {
    userDelete,
    userGet,
    userPatch,
    userPost,
    userPut
} from '../controllers/user.controller.js';

// Creando objeto que permitira agregar las rutas a nuestra aplicacion express
const router = Router();

// Agregamos todas nuestras rutas
router.get('/', userGet);

router.put('/', userPut);

router.patch('/', userPatch);

router.post('/', userPost);

router.delete('/', userDelete);

// Exportamos nuestro objeto con las rutas ya asignadas
export default router;
