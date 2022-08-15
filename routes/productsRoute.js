const express = require('express');
const productsControllers = require('../controllers/productsControllers');
const validateProducts = require('../middlewares/validateProducts');

const productRoute = express.Router();

productRoute.get('/', productsControllers.getAll);
productRoute.get('/:id', productsControllers.getByPk);

productRoute.post('/', validateProducts, productsControllers.create);

module.exports = productRoute;
