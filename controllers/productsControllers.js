const productsServices = require('../services/productsServices');

const productsControllers = {
  getAll: async (req, res) => {
    const productsResponse = await productsServices.getAll();

    return res.status(200).json(productsResponse);
  },

  getByPk: async (req, res) => {
    const { id } = req.params;
    const productId = await productsServices.getByPk(id);

    return res.status(200).json(productId);
  },

  getBySearch: async (req, res) => {
    const nameProduct = req.query.q;

    const queryProduct = await productsServices.getBySearch(nameProduct);
    
    return res.status(200).json(queryProduct);
  },

  create: async (req, res) => {
    const { name } = req.body;
    const productResult = await productsServices.create(name);
 
    return res.status(201).json({ id: productResult.insertId, name });
  },

  update: async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const productId = await productsServices.update({ id, name });

    return res.status(200).json(productId);
  },

  exclude: async (req, res) => {
    const { id } = req.params;
    await productsServices.exclude(id);

    return res.status(204).end();
  },
};

module.exports = productsControllers;