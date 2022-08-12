const express = require('express');
const app = require('./app');
require('dotenv').config();
// o app já está instanciado no arquivo app.js
const routes = require('./routes');

app.use(express.json());

// não altere esse arquivo, essa estrutura é necessária para à avaliação do projeto

app.use('/products', routes.productRoute);

const PORT = 3001;

app.listen(process.env.PORT || PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT || PORT}`);
});
