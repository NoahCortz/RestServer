import Role from '../models/role.model.js';
import User from '../models/user.model.js';

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

const isUserIdValid = async (id) => {
    const userIdExists = await User.findById(id);

    if (!userIdExists) {
        throw new Error(`El id: ${id} no existe.`);
    }
}

export {
    isRoleValid,
    isUserEmailValid,
    isUserIdValid
};
