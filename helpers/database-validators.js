import Role from '../models/role.model.js';
import User from '../models/usuario.model.js';

const isRoleValid = async (role = '') => {
    const roleExists = await Role.findOne({ role });

    if (!roleExists) {
        throw new Error(`El rol ${role} no está registrado en la base de datos.`);
    }
}

const isUserEmailValid = async (email = '') => {
    const userEmailExists = await User.findOne({ email });

    if (userEmailExists) {
        throw new Error(`El correo ${email} ya está registrado en la base de datos.`);
    }
}

export {
    isRoleValid,
    isUserEmailValid
};
