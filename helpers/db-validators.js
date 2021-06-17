const Role = require("../models/role");
const User = require("../models/user");

const isRoleValid = async (role = "") => {
  const roleExist = await Role.findOne({ role });

  if (!roleExist) {
    throw new Error(`El rol ${role} no esta registrado en la bd`);
  }
};

const emailExist = async (email) => {
  const emailExist = await User.findOne({ email });
  if (emailExist) {
    throw new Error(`El correo ${email} ya esta registrado en la bd`);
  }
};

const userExistsByID = async (id) => {
  const userExists = await User.findById(id);
  if (!userExists) {
    throw new Error(`El id ${id} no existe`);
  }
};

module.exports = { isRoleValid, emailExist, userExistsByID };
