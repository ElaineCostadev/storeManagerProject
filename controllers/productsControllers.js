const productsServices = require('../services/productsServices');

const productsControllers = {
  getAll: async (req, res) => {
    const productsResponse = await productsServices.getAll();
    res.status(200).json(productsResponse);
  },
};

module.exports = productsControllers;