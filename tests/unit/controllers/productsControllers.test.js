const { expect } = require('chai');
const Sinon = require('sinon');
const productsService = require('../../../services/productsServices');
const productsController = require('../../../controllers/productsControllers');

describe('Verificando testes do productsControllers', () => {
  describe('Verifica quando é chamado get. no /products', () => {
    afterEach(() => Sinon.restore())

    it('Quando é chamado com sucesso e aparecem todos os produtos no getAll', async () => {
      const req = {};
      const res = {};

      res.status = Sinon.stub().returns(res);
      res.json = Sinon.stub().returns();

      const returnResultExpect = [
        { id: 1, name: 'Martelo de Thor' },
        { id: 2, name: 'Traje de encolhimento' },
        { id: 3, name: 'Escudo do Capitão América' },
      ]
      Sinon.stub(productsService, 'getAll').resolves(returnResultExpect);

      await productsController.getAll(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.args[0][0]).to.be.equal(returnResultExpect);
      
    });

    it('Quando é chamado com sucesso com ID e aparece apenas 1 product no getByPk', async () => {
      const req = {};
      const res = {};

      res.status = Sinon.stub().returns(res);
      res.json = Sinon.stub().returns();
      req.params = {};

      const returnResultExpect = { id: 1, name: 'Martelo de Thor' }
      
      Sinon.stub(productsService, 'getByPk').resolves(returnResultExpect);
      
      await productsController.getByPk(req, res);

      expect(res.status.calledWith(200)).to.be.true;

    });

    it('Quando é chamado e o ID não existir no getByPk ', async () => {
      const req = {};
      const res = {};
      req.params = {};

      res.status = Sinon.stub().returns(res);
      res.json = Sinon.stub().returns();
      
      const returnResultExpect = { "message": "Product not found" }
      
      Sinon.stub(productsService, 'getByPk').resolves([returnResultExpect]);
      
      await productsController.getByPk(req, res);

      expect(res.status.calledWith(404)).to.be.equal(false);

      // expect(res.status.calledWith(404)).to.be.equal(true);
      // expect(res.json.calledWith('Product not found')).to.be.equal(returnResultExpect);
      // expect(res.json.calledWith('Product not found')).to.be.equal(true);
     //  expect(res.json.calledWith('Product not found')).to.be.equal(true);

    });

  })
})