const { response, request } = require("express");
const bcryptjs = require("bcryptjs");

const User = require("../models/user");
const { generarJWT } = require("../helpers/jwt-generate");

const login = async (req = request, res = response) => {
  const { email, password } = req.body;
  let message = "El usuario / correo no son validos";

  try {
    // Verificar si el email existe y si el usuario esta activo
    const user = await User.findOne({ email, status: true });
    if (!user) return res.status(400).json({ message });

    // Verificar la contraseña
    const passwordIsValid = bcryptjs.compareSync(password, user.password);
    if (!passwordIsValid) return res.status(400).json({ message });

    // Generar JWT
    const token = await generarJWT(user._id);

    res.json({ user, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Algo salió mal" });
  }
};

module.exports = {
  login,
};
