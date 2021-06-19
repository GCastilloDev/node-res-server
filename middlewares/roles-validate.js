const { response } = require("express");

const isAdminRole = (req, res = response, next) => {
  const { authenticatedUser } = req.params;

  if (!authenticatedUser)
    return res
      .status(500)
      .json({ message: "Se quiere verificar el role sin validar token." });

  const { name, role } = authenticatedUser;

  if (role !== "ADMIN_ROLE") {
    return res.status(401).json({
      message: `${name} no es administrador`,
    });
  }

  next();
};

const hasRole = (...roles) => {
  return (req, res = response, next) => {
    const { authenticatedUser } = req.params;

    if (!authenticatedUser)
      return res
        .status(500)
        .json({ message: "Se quiere verificar el role sin validar token." });

    const { role } = authenticatedUser;

    if (!roles.includes(role)) {
      return res.status(401).json({
        message: `El servicio requiere uno de estos roles ${roles}`,
      });
    }

    next();
  };
};

module.exports = { isAdminRole, hasRole };
