const productsServices = require('../services/productsServices');

const productsControllers = {
  getAll: async (req, res) => {
    const productsResponse = await productsServices.getAll();
    res.status(200).json(productsResponse);
  },

  getByPk: async (req, res) => {
    const { id } = req.params;
    const productId = await productsServices.getByPk(id);
    // if (!productId) return res.status(404).json({ message: 'Product not found' });
    return res.status(200).json(productId);
  },

  create: async (req, res) => {
    const { name } = req.body;
    const productResult = await productsServices.create(name);

    // if (productResult.affectedRows === 0) return ;
  
    return res.status(201).json({
      id: productResult.insertId,
      name,
    });
  },
};

module.exports = productsControllers;