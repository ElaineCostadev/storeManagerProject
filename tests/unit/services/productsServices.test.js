const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const { expect } = require('chai');
const Sinon = require('sinon');
const productsModel = require('../../../models/productsModels');
const productsService = require('../../../services/productsServices');
const CustomError = require('../../../errors/CustomError');
const validateProducts = require("../../../middlewares/validateProducts");

chai.use(chaiAsPromised);


describe('Verificando testes do productsServices', () => {
  describe('Verifica quando é chamado a funcao getAll no /products', () => {

    const returnResultExpect = [
      { id: 1, name: 'Martelo de Thor' },
      { id: 2, name: 'Traje de encolhimento' },
      { id: 3, name: 'Escudo do Capitão América' },
    ]
    afterEach(() => Sinon.restore())

    it('Quando é chamado com sucesso e aparecem todos os produtos em um array', async () => {
      Sinon.stub(productsModel, 'getAll').resolves([returnResultExpect]);

      const [resultService] = await productsService.getAll();

      expect(resultService).to.be.deep.equal(returnResultExpect);
    });

    it('Quando é chamado com sucesso e aparecem todos os produtos com as chaves obrigatorias', async () => {
      Sinon.stub(productsModel, 'getAll').resolves(returnResultExpect);

      const [resultModel] = await productsService.getAll();

      expect(resultModel).to.all.keys('id', 'name');
    });
  });

  describe('Verifica quando é chamado a funcao getbyPk no /products', () => {
      afterEach(() => Sinon.restore())

    it('Quando é chamado com sucesso com ID e aparece apenas 1 product no getByPk', async () => {
      const returnResultExpect = { id: 1, name: 'Martelo de Thor' }
      Sinon.stub(productsModel, 'getByPk').resolves(returnResultExpect);

      const resultService = await productsService.getByPk(1);

      expect(resultService).to.be.equal(returnResultExpect);
      expect(resultService).to.be.an('object')

    });
    
    it('Quando é chamado a função getByPk e não existe o ID do produto', async () => {
      const returnResultExpect = {
        "message": "Product not found"
      }

      Sinon.stub(productsModel, 'getByPk').resolves(returnResultExpect);

      const resultService = await productsService.getByPk(4);

      expect(resultService).to.have.key('message');
      expect(resultService).to.be.a('object');
    });

    it('Quando é chamado a função getByPk, o CustomError lança o erro com a message onde não existe o ID do produto', async () => {

      return expect(productsService.getByPk(4))
        .to.eventually.be.rejectedWith('Product not found')
        .and.be.an.instanceOf(CustomError)
        .and.have.property('status', 404);
    });

  });

  describe('Verifica quando é chamado a funcao create no /products', () => {
  
    afterEach(() => Sinon.restore())

    it('Quando o produto é cadastrado com sucesso', async () => {
      const returnResultExpect = { id: 4, name: 'Jaqueline' }

      Sinon.stub(productsModel, 'create').resolves(returnResultExpect);
      const resultService = await productsService.create('Jaqueline');

      expect(resultService).to.be.a('object');
      expect(resultService).to.have.keys('id', 'name');
    });
  });
    
  describe('Verifica quando é chamado a funcao Update no /products', () => {

    afterEach(() => Sinon.restore())

    it('Quando o produto é atualizado com sucesso', async () => {
      const returnResultExpect = { id: 1, name: 'Martelo de Thor' }
      Sinon.stub(productsModel, 'getByPk').resolves(returnResultExpect);

      await productsService.getByPk(1);

      Sinon.stub(productsModel, 'update').resolves(returnResultExpect);

      const resultService = await productsService.update
        (returnResultExpect);
      
      //const affectedRowsUpdate = resultService.affectedRows

      expect(resultService).to.be.a('object');
      expect(resultService).to.have.keys('id', 'name');
      //expect(affectedRowsUpdate).to.be(1);
    });

    it('Quando o produto não é encontrado, não é atualizado e é lançado um erro com CustomError', async () => {
 
      return expect(productsService.update({ id: 9, name: 'NovoUpdate' }))
        .to.eventually.be.rejectedWith('Product not found')
        .and.be.an.instanceOf(CustomError)
        .and.have.property('status', 404);
    });
  });

  describe('Verifica quando é chamado a funcao Exclude no /products', () => {

    afterEach(() => Sinon.restore())

    it('Quando o produto é excluido com sucesso', async () => {
      const returnResultExpect = { id: 2 }

      Sinon.stub(productsModel, 'exclude').resolves(returnResultExpect);
      const resultService = await productsService.exclude(2);

      expect(resultService).to.be.an('object');
    });

    it('Quando o produto não é encontrado para ser excluido', async () => {
      return expect(productsService.exclude(5))
        .to.eventually.be.rejectedWith('Product not found')
        .and.be.an.instanceOf(CustomError)
        .and.have.property('status', 404);
    });

  });

});

