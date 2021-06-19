const validateJWT = require("./validate.jwt");
const validate = require("./validated");
const validateRoles = require("./roles-validate");

module.exports = {
  ...validateJWT,
  ...validate,
  ...validateRoles,
};
