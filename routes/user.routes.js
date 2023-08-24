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

// Modificamos la ruta para agregar un query params y actualizar conforme al
// dato que se establesca en la propiedad `id`
router.put('/:id', userPut);

router.patch('/', userPatch);

router.post('/', userPost);

router.delete('/:id', userDelete);

// Exportamos nuestro objeto con las rutas ya asignadas
export default router;
