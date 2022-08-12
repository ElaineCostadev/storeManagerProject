const productsModel = require('../models/productsModels');

const productsServices = { 
  getAll: async () => productsModel.getAll(),

  getByPk: async (id) => {
    const result = await productsModel.getByPk(id);
    if (!result) return null;
    return result;
  },

};

module.exports = productsServices;