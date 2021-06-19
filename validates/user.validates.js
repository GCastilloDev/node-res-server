const { check } = require("express-validator");

const { validateJWT, validate, hasRole } = require("../middlewares");

const {
  isRoleValid,
  emailExist,
  userExistsByID,
} = require("../helpers/db-validators");

const userPostValidates = [
  check("name", "El campo name es obligatorio").trim().notEmpty(),
  check("password", "El campo password es obligatorio y de mas de 6 letras")
    .trim()
    .isLength({ min: 6 }),
  check("email", "El correo no es válido").isEmail(),
  check("role").custom(isRoleValid),
  check("email").custom(emailExist),
  check("role", "El role no es un rol valido")
    .trim()
    .isIn(["ADMIN_ROLE", "USER_ROLE"]),
  validate,
];

const userPutValidates = [
  check("id", "No es un ID válido").isMongoId(),
  check("id").custom(userExistsByID),
  check("role").custom(isRoleValid),
  validate,
];

const userDeleteValidates = [
  validateJWT,
  // isAdminRole,
  hasRole("ADMIN_ROLE", "SALES_ROLE"),
  check("id", "No es un ID válido").isMongoId(),
  check("id").custom(userExistsByID),
  validate,
];

module.exports = { userPostValidates, userPutValidates, userDeleteValidates };
