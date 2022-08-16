const CustomError = require('../errors/CustomError');

// da tabela sales é apenas a data
// da tabela sales_product é o sale_id, product_id, quantity
// preciso transformar snac_case em camelCase - date, sale_id, product_id, quantity

const validadeSales = (req, res, next) => {
  const { /* date  saleId, */ productId, quantity } = req.body;
  // se não cadastrar essa informação
  if (!productId) throw new CustomError(400, '"productId" is required');

  // se não existir esse produto no meu banco de dados
  if (productId === undefined) throw new CustomError(404, 'Product not found');

  if (!quantity) throw new CustomError(400, '"quantity" is required');

  if (quantity <= 1) throw new CustomError(422, '"quantity" must be greater than or equal to 1');

  next();
};

module.exports = { validadeSales };