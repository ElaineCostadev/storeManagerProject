const CustomError = require('../errors/CustomError');

const validateSales = (req, res, next) => {
  const { body } = req;

  const verifyProduct = body.some((eachProduct) => eachProduct.productId === undefined);
  const verifyQuantity = body.some((eachProduct) => eachProduct.quantity === undefined);
  const verifyQuantityNumber = body.some((eachProduct) => eachProduct.quantity <= 0);

  if (verifyProduct) throw new CustomError(400, '"productId" is required');

  if (verifyQuantityNumber) {
    throw new CustomError(422, '"quantity" must be greater than or equal to 1');
  }
  if (verifyQuantity) throw new CustomError(400, '"quantity" is required');
  
  next();
};

module.exports = validateSales;