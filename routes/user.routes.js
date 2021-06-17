const { Router } = require("express");
const { check } = require("express-validator");

const { validate } = require("../middlewares/validated");
const {
  isRoleValid,
  emailExist,
  userExistsByID,
} = require("../helpers/db-validators");

const {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  userDelete,
} = require("../controllers/usuarios.controller");

const router = Router();

router.get("/", usuariosGet);
router.put(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(userExistsByID),
    check("role").custom(isRoleValid),
    validate,
  ],
  usuariosPut
);
router.post(
  "/",
  [
    check("name", "El campo name es obligatorio").trim().notEmpty(),
    check("password", "El campo password es obligatorio y de mas de 6 letras")
      .trim()
      .isLength({ min: 6 }),
    check("email", "El correo no es válido").isEmail(),
    check("role").custom(isRoleValid),
    check("email").custom(emailExist),
    // check("role", "El role no es un rol valido")
    //   .trim()
    //   .isIn(["ADMIN_ROLE", "USER_ROLE"]),
    validate,
  ],
  usuariosPost
);
router.delete(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(userExistsByID),
    validate,
  ],
  userDelete
);

module.exports = router;
