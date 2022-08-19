const express = require('express');

const salesRoute = express.Router();

const salesController = require('../controllers/salesControllers');
const validateSales = require('../middlewares/validateSales');
// const validateProducts = require('../middlewares/validateProducts');

salesRoute.get('/', salesController.getAll);
salesRoute.get('/:id', salesController.getByPk);

salesRoute.post('/', validateSales, salesController.createSales);

salesRoute.put('/:id', salesController.update);

salesRoute.delete('/:id', salesController.exclude);

module.exports = salesRoute;
