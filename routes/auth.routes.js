const { Router } = require("express");
const { check } = require("express-validator");
const { login } = require("../controllers/auth.controllerr");
const { validate } = require("../middlewares/validated");

const router = Router();

router.post(
  "/login",
  [
    check("email", "El email es obligatorio").trim().isEmail(),
    check("password", "El password es obligatorio").trim().notEmpty(),
    validate,
  ],
  login
);

module.exports = router;
