import Role from '../models/role.model.js';

const isRoleValid = async (role = '') => {
    const roleExists = await Role.findOne({ role });

    if (!roleExists) {
        throw new Error(`El rol ${role} no está registrado en la base de datos.`);
    }
}

export { isRoleValid };
