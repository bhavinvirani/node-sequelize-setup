const joi = require('joi');
const pick = require('../utils/pick.js');
const { errorResponse } = require('../utils/apiResponse.js');
const validate = (schema) => {
  return async (req, res, next) => {
    const validSchema = pick(schema, ['params', 'query', 'body']);
    const object = pick(req, Object.keys(validSchema));
    try {
      await joi.object(validSchema).validateAsync(object, {
        abortEarly: false,
        errors: { label: 'key', wrap: { label: false } },
      });
      next();
    } catch (error) {
      const errors = error.details.map((err) => ({
        message: err.message,
        path: err.path.join('.'),
        type: err.type,
      }));
      return errorResponse(res, 422, errors);
    }
  };
};
module.exports = validate;
