const { expect } = require('chai');
const Sinon = require('sinon');
const connection = require('../../../models/connection');
const productsModel = require('../../../models/productsModels');

describe('Verificando testes do productsModels', () => {
  describe('Verifica quando é chamado a função getALL. no /products', () => {
    
    afterEach(() => Sinon.restore())

    const returnResultExpect = [
      { id: 1, name: 'Martelo de Thor' },
      { id: 2, name: 'Traje de encolhimento' },
      { id: 3, name: 'Escudo do Capitão América' },
    ]

    it('Quando é chamado com sucesso e aparecem todos os produtos em um array', async () => {
      Sinon.stub(connection, 'execute').resolves([returnResultExpect]);

      const resultModel = await productsModel.getAll();

       expect(resultModel).to.be.equal(returnResultExpect);
      
    });

    it('Quando é chamado com sucesso e aparecem todos os produtos com as chaves obrigatorias', async () => {
      Sinon.stub(connection, 'execute').resolves([returnResultExpect]);

      const [resultModel] = await productsModel.getAll();

      expect(resultModel).to.all.keys('id', 'name');
    });
  });

  describe('Verifica quando é chamado a função getBYPK. no /products', () => {
    afterEach(() => Sinon.restore())

    it('Quando é chamado com sucesso com ID e aparece apenas 1 product no getByPk', async () => {
      const returnResultExpect = { id: 1, name: 'Martelo de Thor' };
        
      Sinon.stub(connection, 'execute').resolves([[returnResultExpect]]);

      const resultModel = await productsModel.getByPk(1);

      expect(resultModel).to.be.equals(returnResultExpect);

    });

    it('Quando é chamado a função getByPk e não existe o ID do produto', async () => {
      const returnResultExpect = [];

      Sinon.stub(connection, 'execute').resolves([[returnResultExpect]]);

      const resultModel = await productsModel.getByPk(7);

      expect(resultModel).to.be.equals(returnResultExpect);

    });
  });

  describe('Verifica quando é chamado a função getBySearch. no /products', () => {
    afterEach(() => Sinon.restore())

    it('Quando é chamado com sucesso o name e existe em products ', async () => {
      const returnFunction = { id: 1, name: 'Martelo de Thor' };

      Sinon.stub(connection, 'execute').resolves([returnFunction]);

      const resultModel = await productsModel.getBySearch("Traje");

      expect(resultModel).to.be.equals(returnFunction);

    });

    it('Quando é chamado a função getBySearch e não foi encontrado um novo existente no banco de dados', async () => {
      const returnFuncion = [
        { id: 1, name: 'Martelo de Thor' },
        { id: 2, name: 'Traje de encolhimento' },
        { id: 3, name: 'Escudo do Capitão América' },
      ];

      Sinon.stub(connection, 'execute').resolves([returnFuncion]);

      const resultModel = await productsModel.getBySearch('Teste');

      expect(resultModel).to.be.equals(returnFuncion);

    });
  });







  describe('Verifica quando é chamado a função CREATE. no /products', () => {
    afterEach(() => Sinon.restore())

    it('Quando é criado um produto produto com sucesso', async () => {
      const returnResultExpect = { name: 'Elaine' };

      Sinon.stub(connection, 'execute').resolves([returnResultExpect]);

      const resultModel = await productsModel.create('Elaine');

      expect(resultModel).to.be.equals(returnResultExpect);
    });
  });
  
  describe('Verifica quando é chamado a função UPDATE. no /products', () => {
    afterEach(() => Sinon.restore())

    it('Quando é atualizado um produto produto com sucesso', async () => {
      const returnResultExpect = { id: 1, name: 'Elaine' };

      Sinon.stub(connection, 'execute').resolves([[returnResultExpect]]);

      const resultModel = await productsModel.update(1, 'Josefa');
      const resultExpect = resultModel.affectedRows

      expect(resultModel).to.be.an('object');
      expect(resultExpect).to.equal(1);
      // expect(resultModel).to.be.equals(returnResultExpect);
    });
  });

  describe('Verifica quando é chamado a função EXCLUDE. no /products', () => {
    afterEach(() => Sinon.restore())

    it('Quando é excluido um produto com sucesso', async () => {
      const returnResultExpect = { id: 1, name: 'Elaine' };

      Sinon.stub(connection, 'execute').resolves([[returnResultExpect]]);

      const [resultModel] = await productsModel.exclude(1);
      const resultExpect = resultModel.affectedRows

      expect(resultModel).to.be.an('object');
      expect(resultExpect).to.be.an('undefined');
    });
  });

});