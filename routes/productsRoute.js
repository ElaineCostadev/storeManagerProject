const express = require('express');
const productsControllers = require('../controllers/productsControllers');
const validateProducts = require('../middlewares/validateProducts');

const productRoute = express.Router();

productRoute.get('/search', productsControllers.getBySearch);
productRoute.get('/:id', productsControllers.getByPk);
productRoute.get('/', productsControllers.getAll);

productRoute.post('/', validateProducts, productsControllers.create);

productRoute.put('/:id', validateProducts, productsControllers.update);

productRoute.delete('/:id', productsControllers.exclude);

module.exports = productRoute;
