const express = require('express');
require('express-async-errors');

const app = express();

const routes = require('./routes');
const errorMiddleware = require('./errors/errorMiddleware');

app.use(express.json());

app.use('/products', routes.productRoute);
app.use('/sales', routes.salesRoute);

// o erro deve ser o ultimo
app.use(errorMiddleware);

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;