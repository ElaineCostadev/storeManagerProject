const CustomError = require('../errors/CustomError');

const validateProducts = async (req, _res, next) => {
  const { name } = req.body;
  if (!name) throw new CustomError(400, '"name" is required');
    // res.status(400).json({ message: '"name" is required' });
  if (name.length < 5) {
    throw new CustomError(422, '"name" length must be at least 5 characters long');
    // res.status(422).json({ message: '"name" length must be at least 5 characters long' });
}
  next();
};

module.exports = validateProducts;
