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
  deckSchema: Joi.object().keys({
    name: Joi.string().required().min(2),
    description: Joi.string().required().min(5),
  }),

  idSchema: Joi.object().keys({
    param: Joi.string()
      .regex(/^[0-9A-Fa-f]{24}$/)
      .required(),
  }),
  userSchema: Joi.object().keys({
    firstName: Joi.string().required().min(1).max(25),
    lastName: Joi.string().required().min(1).max(25),
    email: Joi.string().email().required(),
  }),

  userOptionalSchema: Joi.object().keys({
    firstName: Joi.string().min(1).max(25),
    lastName: Joi.string().min(1).max(25),
    email: Joi.string().email(),
  }),

  deckSchema: Joi.object().keys({
    name: Joi.string().min(1).required(),
    description: Joi.string().min(5).required(),
    owner: Joi.string()
      .regex(/^[0-9A-Fa-f]{24}$/)
      .required(),
  }),
};

module.exports = {
  validateParams,
  validateBody,
  schemas,
};
