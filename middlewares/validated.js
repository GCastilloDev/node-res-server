const { validationResult } = require("express-validator");

const validate = (req, res, netx) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }

  netx();
};

module.exports = { validate };
