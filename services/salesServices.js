const CustomError = require('../errors/CustomError');
const productsModel = require('../models/productsModels');
const salesModel = require('../models/salesModels');

// https://stackoverflow.com/questions/37576685/using-async-await-with-a-foreach-loop
// e course para lembrar do promisse all

// mentoria André - não preciso fazer o map para renomear, já trago as informações conforme o esperado
const salesService = {
  getAll: async () => {
    const salesResult = await salesModel.getAll();
    return salesResult;
  },

  getByPk: async (id) => {
    // const verifySale = await salesModel.checkIfSalesExists(id);
    
    const salesResult = await salesModel.getByPk(id);
    if (salesResult.length === 0) throw new CustomError(404, 'Sale not found');

    return salesResult;
  },

  createSales: async (sales) => {
    const allProducts = await productsModel.getAll();

    const checkIfProductExists = sales.every((eachItens) => allProducts
      .some((eachProduct) => eachProduct.id === eachItens.productId));
    
    if (!checkIfProductExists) throw new CustomError(404, 'Product not found');

/*      await Promise.all(sales.forEach(async (eachProductMap) => {
       const verify = await productsModel.getByPk(eachProductMap.productId);
      if (verify === undefined) throw new CustomError(404, 'Product not found');
    }));
 */
    const salesProducts = await salesModel.createSales(sales);
    return salesProducts;
  },

  update: async (id, body) => {

    // verifico se a sale existe;
    const verifySale = await salesModel.checkIfSalesExists(id);
    if (verifySale.length === 0) throw new CustomError(404, 'Sale not found');

    // verifico se o product existe
    const allProducts = await productsModel.getAll();

    const checkIfProductExists = body.every((eachItens) => allProducts
      .some((eachProduct) => eachProduct.id === eachItens.productId));
    if (!checkIfProductExists) throw new CustomError(404, 'Product not found');

    // se existirem, cadastro no banco de dados
    const itemUpdate = await salesModel.update(id, body);

    return itemUpdate;
  },

  exclude: async (id) => {
    const verifySale = await salesModel.checkIfSalesExists(id);
    if (verifySale.length === 0) throw new CustomError(404, 'Sale not found');

    const itemExlude = await salesModel.exclude(id);
    return itemExlude;
  },

};

module.exports = salesService;