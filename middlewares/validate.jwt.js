const { response, request } = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const validateJWT = async (req = request, res = response, next) => {
  const token = req.header("Authorization")?.trim();
  let message = "El token es requerido";

  // Verificar si envian token
  if (!token || token === "") return res.status(401).json({ message });

  try {
    const { uid } = jwt.verify(token, process.env.SECRET_PRIVATE_KEY);

    const authenticatedUser = await User.findById(uid);

    // Verificar si existe el usuario y si tiene borrado logico
    if (!authenticatedUser || !authenticatedUser.status)
      throw new Error("Token no válido");

    req.params.authenticatedUser = authenticatedUser;

    next();
  } catch (error) {
    console.log(error);
    message = "El token no es válido";
    res.status(401).json({ message });
  }
};

module.exports = { validateJWT };
