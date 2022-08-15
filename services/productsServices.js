const productsModel = require('../models/productsModels');

const productsServices = { 
  getAll: async () => productsModel.getAll(),

  getByPk: async (id) => {
    const result = await productsModel.getByPk(id);
    if (!result) return null;
    return result;
  },

  create: async (nameProduct) => {
    const product = await productsModel.create(nameProduct);
    if (!product) return null;
    return product;
  },

};

module.exports = productsServices;