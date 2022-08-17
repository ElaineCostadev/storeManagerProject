const express = require('express');
const productsControllers = require('../controllers/productsControllers');
const validateProducts = require('../middlewares/validateProducts');

const productRoute = express.Router();

productRoute.get('/', productsControllers.getAll);
productRoute.get('/:id', productsControllers.getByPk);

productRoute.post('/', validateProducts, productsControllers.create);

productRoute.put('/:id', validateProducts, productsControllers.update);

productRoute.delete('/:id', productsControllers.exclude);

module.exports = productRoute;
