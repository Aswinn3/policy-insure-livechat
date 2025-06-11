const Joi = require('joi');

const messageValidationSchema = Joi.object({
  username: Joi.string().min(3).required(),
  message: Joi.string().max(500).required(),
});

const loginValidationSchema = Joi.object({
  username: Joi.string().min(3).required(),
  password: Joi.string().min(6).required(),
});

module.exports = {
  messageValidationSchema,
  loginValidationSchema,
};
