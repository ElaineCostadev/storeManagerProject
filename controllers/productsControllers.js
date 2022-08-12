const productsServices = require('../services/productsServices');

const productsControllers = {
  getAll: async (req, res) => {
    const productsResponse = await productsServices.getAll();
    res.status(200).json(productsResponse);
  },

  getByPk: async (req, res) => {
    const { id } = req.params;
    const productId = await productsServices.getByPk(id);
    if (!productId) return res.status(404).json({ message: 'Product not found' });
    return res.status(200).json(productId);
  },
};

module.exports = productsControllers;