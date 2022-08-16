const CustomError = require('../errors/CustomError');
const productsModel = require('../models/productsModels');

const productsServices = { 
  getAll: async () => productsModel.getAll(),

  getByPk: async (id) => {
    const result = await productsModel.getByPk(id);
    // if (!result) return null;
    if (!result) throw new CustomError(404, 'Product not found');
    // return res.status(404).json({ message: 'Product not found' });
    return result;
  },

  create: async (nameProduct) => {
    const product = await productsModel.create(nameProduct);
    if (!product) return null;
    return product;
  },

};

module.exports = productsServices;