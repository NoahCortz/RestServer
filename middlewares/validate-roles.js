import { request, response } from 'express';

const isAdminRole = (req = request, res = response, next) => {
    if (!req.userLoggedIn) {
        return res.status(500).json({
            message: 'Se quiere verificar el rol sin validar el token'
        });
    }

    const { role, name } = req.userLoggedIn;

    if (role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            message: `El usuario: ${name}, no tiene permisos de administrador`
        });
    }

    next();
}

const haveAdminPermission = (...roles) => {
    return (req = request, res = response, next) => {
        if (!req.userLoggedIn) {
            return res.status(500).json({
                message: 'Se quiere verificar el rol sin validar el token'
            });
        }

        if (!roles.includes(req.userLoggedIn.role)) {
            return res.status(401).json({
                message: `El servicio requiere uno de estos errores: ${roles}`
            });
        }

        next();
    }
}

export {
    isAdminRole,
    haveAdminPermission
}
