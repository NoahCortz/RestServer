import { request, response } from 'express';


const userGet = ( req = request, res = response) => {
    // Obtenemos todos los queryParams que el usuario ingrese
    const { name, apiKey, page = '1', limit = 5 } = req.query;

    res.json({
        message: 'Get API | Controller',
        query: {
            name,
            apiKey,
            page,
            limit
        }
    });
}

// Realizar actualizaciones completas
const userPut = ( req = request, res = response) => {
    // Obtenemos el parametro que se establecio en la ruta de tipo PUT `id`
    const id = req.params.id;

    res.status(200).json({
        message: 'Put API | Controller',
        id
    });
}

// Realizar actualizaciones parciales
const userPatch = ( req = request, res = response) => {
    const { id, name, email } = req.body;

    res.status(200).json({
        message: 'Patch API | Controller',
        dataChanged: {
            id,
            name,
            email
        }
    });
}

const userPost = ( req = request, res = response) => {
    // Obtenemos los datos que se estan solicitando del cuerpo
    // Desestructuramos solo aquellos datos que necesitamos
    const { name, email } = req.body;

    res.status(201).json({
        message: 'Post API | Controller',
        data: {
            name,
            email
        }
    });
}

const userDelete = ( req = request, res = response) => {
    // Obteniendo el id desde parametros de la url
    const id = req.params.id;

    res.status(200).json({
        message: 'Delete API | Controller',
        id
    });
}

export {
    userGet,
    userPut,
    userPatch,
    userPost,
    userDelete
}
