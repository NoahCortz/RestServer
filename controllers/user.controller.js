import { response } from 'express';


const userGet = (req, res = response) => {
    res.json({
        message: 'Get API | Controller'
    });
}

const userPut = (req, res = response) => {
    res.json({
        message: 'Put API | Controller'
    });
}

const userPatch = (req, res = response) => {
    res.json({
        message: 'Patch API | Controller'
    });
}

const userPost = (req, res = response) => {
    res.status(201).json({
        message: 'Post API | Controller'
    });
}

const userDelete = (req, res = response) => {
    res.json({
        message: 'Delete API | Controller'
    });
}

export {
    userGet,
    userPut,
    userPatch,
    userPost,
    userDelete
}
