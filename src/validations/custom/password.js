const password = (value, helpers) => {
  if (value.length < 8) {
    throw new Joi.ValidationError(
      'Password must contain at least 8 characters',
      'Password',
      helpers.state,
      helpers.options
    );
  }
  if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
    throw new Joi.ValidationError(
      'Password must contain at least 1 letter and 1 number',
      'Password',
      helpers.state,
      helpers.options
    );
  }
  return value;
};

module.exports = password;
