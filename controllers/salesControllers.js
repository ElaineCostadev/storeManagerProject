const salesService = require('../services/salesServices');

const salesController = {
  createSales: async (req, res) => {
    const sale = req.body;
    const sales = await salesService.createSales(sale);
    // if (sales.message) return res.status(404).json({ message: 'Product not found' });
    return res.status(201).json(sales);
  },
  
  getAll: async (_req, res) => {
    const salesResponse = await salesService.getAll();
    res.status(200).json(salesResponse);
  },
    
  getByPk: async (req, res) => {
    const { id } = req.params;
      const salesResponse = await salesService.getByPk(id);
      res.status(200).json(salesResponse);
  },
  
};

module.exports = salesController;