import jwt from 'jsonwebtoken';

const generateJWT = (uid = '') => {
    return new Promise((resolve, reject) => {
        const payload = { uid };

        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
        }, (error, token) => {
            if (error) {
                reject('No se pudo generar el JWT');
                throw new Error(error);
            } else {
                resolve(token);
            }
        });
    });
}

export {
    generateJWT
}
