const { response, request } = require("express");
const bcryptjs = require("bcryptjs");

const User = require("../models/user");
const { generarJWT } = require("../helpers/jwt-generate");
const { googleVerify } = require("../helpers/google-verify");

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

// TODO: Verificar si el usuario existe y no se registro con google
const googleSignin = async (req, res = response) => {
  const { idToken } = req.body;

  try {
    const { email, name, img } = await googleVerify(idToken);

    let user = await User.findOne({ email });

    if (!user) {
      const data = {
        name,
        email,
        img,
        password: "googleUser",
        google: true,
      };

      user = new User(data);
      user.save();
    }

    // Si el usuario existe y esta bloqueado
    if (!user.status) {
      return res.status(400).json({
        message: "Usuario bloqueado",
      });
    }

    // Generar JWT
    const token = await generarJWT(user._id);

    res.json({ user, token });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Token de google invalido" });
  }
};

module.exports = {
  login,
  googleSignin,
};
