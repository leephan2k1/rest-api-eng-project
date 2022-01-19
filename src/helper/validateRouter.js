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

const validateBody = (schema) => {
  return (req, res, next) => {
    const validateResult = schema.validate(req.body);

    if (validateResult.error) {
      return res.status(400).json(validateResult.error);
    }

    if (!req.verified) {
      req.verified = {};
      req.verified.body = validateResult.value;
    }

    next();
  };
};

const schemas = {
  idSchema: Joi.object().keys({
    param: Joi.string()
      .regex(/^[0-9A-Fa-f]{24}$/)
      .required(),
  }),
  userSchema: Joi.object().keys({
    firstName: Joi.string().required().min(1).max(25),
    lastName: Joi.string().required().min(1).max(25),
    email: Joi.string().email(),
  }),
};

module.exports = {
  validateParams,
  validateBody,
  schemas,
};
