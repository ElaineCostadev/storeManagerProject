const productsModel = require('../models/productsModels');

const productsServices = { 
  getAll: async () => productsModel.getAll(),

};

module.exports = productsServices;