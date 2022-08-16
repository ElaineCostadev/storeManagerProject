const express = require('express');

const salesRoute = express.Router();

const salesController = require('../controllers/salesControllers');
// const validate = require('../middlewares/validateSales');

salesRoute.get('/', salesController.getAll);
salesRoute.get('/:id', salesController.getByPk);

salesRoute.post('/', /* validateSales */ salesController.createSales);

module.exports = salesRoute;
