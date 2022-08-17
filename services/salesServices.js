const CustomError = require('../errors/CustomError');
const productsModel = require('../models/productsModels');
const salesModel = require('../models/salesModels');

// https://stackoverflow.com/questions/37576685/using-async-await-with-a-foreach-loop
// e course para lembrar do promisse all
const salesService = {
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

  getAll: async () => {
    const salesResult = await salesModel.getAll();
    const mapSales = salesResult.map((eachSale) => {
      const resultObj = {
        saleId: eachSale.id,
        date: eachSale.date,
        productId: eachSale.product_id,
        quantity: eachSale.quantity,
      };
      return resultObj;
    });
    return mapSales;
  },

  getByPk: async (id) => { 
    const verifySale = await salesModel.checkIfSalesExists(id);
    if (verifySale.length === 0) throw new CustomError(404, 'Sale not found');

    const salesResult = await salesModel.getByPk(id);
    const mapSales = salesResult.map((eachSale) => {
      const resultObj = {
        date: eachSale.date,
        productId: eachSale.product_id,
        quantity: eachSale.quantity,
      };
      return resultObj;
      });

    return mapSales;
  },

};

module.exports = salesService;