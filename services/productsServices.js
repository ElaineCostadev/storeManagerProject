const { uriTooLong } = require('@hapi/boom');
const CustomError = require('../errors/CustomError');
const productsModel = require('../models/productsModels');

const productsServices = { 
  getAll: async () => productsModel.getAll(),

  getByPk: async (id) => {
    const result = await productsModel.getByPk(id);

    if (!result) throw new CustomError(404, 'Product not found');
   //  if (!result) return res.status(404).json({ message: 'Product not found' });
    return result;
  },

  getBySearch: async (name) => {
    const resultSearch = await productsModel.getBySearch(name);
    return resultSearch;
  },

  create: async (nameProduct) => {
    const product = await productsModel.create(nameProduct);
    // if (!product) return null;
    return product;
  },

  update: async (objProduct) => {
    const { id, name } = objProduct;
    const checkIfExists = await productsModel.getByPk(id);
    if (!checkIfExists) throw new CustomError(404, 'Product not found');

    await productsModel.update(id, name);

   // if (result.affectedRows === 0) throw new CustomError(404, 'Product not found');

    return { id, name };
  },

  exclude: async (id) => {
    const checkIfExists = await productsModel.getByPk(id);
    if (!checkIfExists) throw new CustomError(404, 'Product not found');

    const result = await productsModel.exclude(id);
    return result;
  },

};

module.exports = productsServices;