const express = require('express');
const productsControllers = require('../controllers/productsControllers');

const productRoute = express.Router();

productRoute.get('/', productsControllers.getAll);
productRoute.get('/:id', productsControllers.getByPk);

module.exports = productRoute;
