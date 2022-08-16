const CustomError = require('../errors/CustomError');
const salesModel = require('../models/salesModels');

const salesService = {
  createSales: async (idSale, idProcuct, quantity, date) => {
    const dateSale = await salesModel.createDate(date);
    const sales = await salesModel.createSales(idSale, idProcuct, quantity);
    return { sales, dateSale };
  },

  getAll: async () => {
    const salesResult = await salesModel.getAll();
    const mapSales = salesResult.map((eachSale) => {
      const resultObj = {
        saleId: eachSale.sale_id,
        date: eachSale.date,
        productId: eachSale.product_id,
        quantity: eachSale.quantity,
      };
      return resultObj;
    });
    return mapSales;
  },

  getByPk: async (id) => {
    const salesResult = await salesModel.getByPk(id);

    const findId = salesResult.find((eachSale) => eachSale.id !== +id);
    if (!findId) throw new CustomError(404, 'Sale not found');

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