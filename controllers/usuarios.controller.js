const { response, request } = require("express");
const bcrypstjs = require("bcryptjs");
const User = require("../models/user");

const usuariosGet = async (req = request, res = response) => {
  const { limit = 5, from = 0 } = req.query;
  const query = { status: true };

  const [users, total] = await Promise.all([
    User.find(query).skip(Number(from)).limit(Number(limit)),
    User.countDocuments(query),
  ]);

  const to =
    Number(from) + Number(limit) <= total ? Number(from) + Number(limit) : 20;

  res.json({ total, from: Number(from), to, users });
};

const usuariosPut = async (req = request, res = response) => {
  const { id } = req.params;
  const { _id, password, google, email, ...userRequest } = req.body;

  // TODO: Validar contra BD

  if (password) {
    // Encriptar la contraseña
    const salt = bcrypstjs.genSaltSync();
    userRequest.password = bcrypstjs.hashSync(password, salt);
  }

  const userDB = await User.findByIdAndUpdate(id, userRequest);

  res.status(201).json({
    message: "Usuario actualizado correctamente",
    user: userDB,
  });
};

const usuariosPost = async (req = request, res = response) => {
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });

  // Encriptar la contraseña
  const salt = bcrypstjs.genSaltSync();
  user.password = bcrypstjs.hashSync(password, salt);

  // Guardar en BD
  try {
    await user.save();
    res.json({
      user,
    });
  } catch (error) {
    // console.log(error);
    res.json({
      error,
    });
  }
};

const userDelete = async (req = request, res = response) => {
  const { id } = req.params;

  const user = await User.findByIdAndUpdate(
    id,
    { status: false },
    { new: true }
  );

  res.json({ user });
};

module.exports = {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  userDelete,
};
