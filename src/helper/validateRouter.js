const Joi = require("joi");

const validateParams = (schema, name) => {
  return (req, res, next) => {
    const validateResult = schema.validate({
      param: req.params[name],
    });

    if (validateResult.error) {
      return res.status(400).json(validateResult.error);
    }

    if (!req.verified) req.verified = {};
    if (!req.verified.params) req.verified.params = {};
    req.verified.params[name] = req.params[name];

    next();
  };
};

const schemas = {
  idSchema: Joi.object().keys({
    param: Joi.string()
      .regex(/^[0-9A-Fa-f]{24}$/)
      .required(),
  }),
};

module.exports = {
  validateParams,
  schemas,
};
