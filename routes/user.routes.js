const { Router } = require("express");
const router = Router();

// Controladores
const {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  userDelete,
} = require("../controllers/usuarios.controller");

// Validaciones
const {
  userPutValidates,
  userPostValidates,
  userDeleteValidates,
} = require("../validates/user.validates");

// Rutas
router.get("/", usuariosGet);
router.put("/:id", [...userPutValidates], usuariosPut);
router.post("/", [...userPostValidates], usuariosPost);
router.delete("/:id", [...userDeleteValidates], userDelete);

module.exports = router;
