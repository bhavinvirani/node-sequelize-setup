const pagination = (page, limit) => {
  const offset = limit * (page - 1);
  return { limit, offset };
};

module.exports = pagination;
