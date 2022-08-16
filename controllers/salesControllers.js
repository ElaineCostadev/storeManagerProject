const salesService = require('../services/salesServices');

const salesController = {
  createSales: async (req, res) => {
    const { idSale, idProcuct, quantity, date } = req.body;
    const sales = await salesService.createSales(idSale, idProcuct, quantity, date);

    return res.status(201).json({
      id: sales.idSale.insertId,
      itemsSold: [{
        productId: sales.idProcuct.insertId,
        quantity: sales.quantity,
      }],
    });
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