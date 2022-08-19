const salesService = require('../services/salesServices');

const salesController = {
  getAll: async (_req, res) => {
    const salesResponse = await salesService.getAll();

    return res.status(200).json(salesResponse);
  },

  getByPk: async (req, res) => {
    const { id } = req.params;
    const salesResponse = await salesService.getByPk(id);
    
    return res.status(200).json(salesResponse);
  },

  createSales: async (req, res) => {
    const sale = req.body;
    const sales = await salesService.createSales(sale);

    return res.status(201).json(sales);
  },

  update: async (req, res) => {
    const { id } = req.params;
    const { body } = req;

    const salesResponse = await salesService.update(id, body);

    return res.status(200).json(salesResponse);
  },

  exclude: async (req, res) => {
    const { id } = req.params;
    await salesService.exclude(id);

    return res.status(204).end();
  },
  
};

module.exports = salesController;