const { expect } = require('chai');
const Sinon = require('sinon');
const productsService = require('../../../services/productsServices');
const productsController = require('../../../controllers/productsControllers');

describe('Verificando testes do productsControllers', () => {
  describe('Verifica quando é chamado getAll no /products', () => {
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
  });

  describe('Verifica quando é chamado getByPk no /products', () => {

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
  });

  describe('Verifica quando é chamado create no /products', () => {
    it('Quando o produto é criado com sucesso ', async () => {
      const req = {};
      const res = {};
      req.body = {};

      res.status = Sinon.stub().returns(res);
      res.json = Sinon.stub().returns();

      const returnResultExpect = { name: 'NovoProdutoCadastrado' }

      Sinon.stub(productsService, 'create').resolves(returnResultExpect);

      await productsController.create(req, res);
      expect(res.status.calledWith(201)).to.be.true;
      // expect(res.json.calledWith())
    });
  });
  describe('Verifica quando é chamado update no /products', () => {
    it('Quando o produto é atualizado com sucesso ', async () => {
      const req = {};
      const res = {};
      req.params = {};
      req.body = {};

      res.status = Sinon.stub().returns(res);
      res.json = Sinon.stub().returns();

      const returnResultExpect = { id: 1, name: 'NovoProdutoCadastrado' }

      Sinon.stub(productsService, 'update').resolves([returnResultExpect]);

      await productsController.update(req, res);

      expect(res.status.calledWith(200)).to.be.true;
    });
  });

  describe('Verifica quando é chamado exclude no /products', () => {
    it('Quando o produto é deletado com sucesso ', async () => {
      const req = {};
      const res = {};
      req.params = {};

      res.status = Sinon.stub().returns(res);
      res.end = Sinon.stub().returns();

      const returnResultExpect = { id: 1 }

      Sinon.stub(productsService, 'exclude').resolves(returnResultExpect);

      await productsController.exclude(req, res);

      expect(res.status.calledWith(204)).to.be.true;

    });
  });

});
