const { expect } = require('chai');
const Sinon = require('sinon');
const salesService = require('../../../services/salesServices');
const salesController = require('../../../controllers/salesControllers');

const BASIC_REQ = {
  body: undefined,
  params: {},
  headers: {},
  req: {},
};

const controllerTestMaster = async (controller, req = BASIC_REQ) => {
  const result = {
    body: undefined,
    status: undefined,
  }
  const res = {
    json: (obj) => {
      result.body = obj
      return null
    },
    status: (num) => {
      result.status = num;
      return res
    }
  }
  const spyJson = Sinon.spy(res, 'json');
  const spyStatus = Sinon.spy(res, 'status')

  await controller(req, res)
  return { ...result, spies: { json: spyJson, status: spyStatus } }
}



describe('Verificando testes do salesControllers', () => {


  describe('Verifica quando é chamado getAll no /sales', () => {

    const returnResultExpect = [
      {
        "saleId": 1,
        "date": "2022-08-18T13:59:09.000Z",
        "productId": 1,
        "quantity": 5
      },
      {
        "saleId": 1,
        "date": "2022-08-18T13:59:09.000Z",
        "productId": 2,
        "quantity": 10
      },
      {
        "saleId": 2,
        "date": "2022-08-18T13:59:09.000Z",
        "productId": 3,
        "quantity": 15
      }
    ]
    afterEach(() => Sinon.restore())

    it('Quando é chamado com sucesso e aparecem todos os produtos no getAll', async () => {
      Sinon.stub(salesService, 'getAll').resolves(returnResultExpect);

      const resultController = await controllerTestMaster(salesController.getAll, returnResultExpect);

      expect(resultController.status).to.be.equal(200);
     // expect(resultController.json).to.be.equals(returnResultExpect);
    });
  });

  describe('Verifica quando é chamado getByPk no /sales', () => {

    const returnResultExpect = [
      {
        "saleId": 1,
        "date": "2022-08-18T13:59:09.000Z",
        "productId": 1,
        "quantity": 5
      },
      {
        "saleId": 1,
        "date": "2022-08-18T13:59:10.000Z",
        "productId": 2,
        "quantity": 10
      }
    ];
    
    afterEach(() => Sinon.restore())

    it('Quando é chamado com sucesso com ID e aparece apenas 1 venda no getByPk', async () => {
      const req = {};
      const res = {};
      

      res.status = Sinon.stub().returns(res);
      res.json = Sinon.stub().returns();
      req.params = {};

      Sinon.stub(salesService, 'getByPk').resolves(returnResultExpect);

      await salesController.getByPk(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.status.calledOnce).to.be.true;
    });
  });

  describe('Verifica quando é chamado create no /sales', () => {

    const returnResultExpect = [
      {
        "productId": 1,
        "quantity": 1
      },
      {
        "productId": 2,
        "quantity": 5
      }
    ]

    afterEach(() => Sinon.restore())
    it('Quando a venda é criada com sucesso ', async () => {
      const req = {};
      const res = {};
      req.body = {};

      res.status = Sinon.stub().returns(res);
      res.json = Sinon.stub().returns();

      Sinon.stub(salesService, 'createSales').resolves(returnResultExpect);

      await salesController.createSales(req, res);
      expect(res.status.calledWith(201)).to.be.true;

    });
  });
  describe('Verifica quando é chamado update no /sales', () => {

    afterEach(() => Sinon.restore())
    it('Quando a venda é atualizada com sucesso ', async () => {
      const req = {};
      const res = {};
      req.params = {};
      req.body = {};

      res.status = Sinon.stub().returns(res);
      res.json = Sinon.stub().returns();

      const returnResultExpect = [
        {
          "productId": 1,
          "quantity": 10
        },
        {
          "productId": 2,
          "quantity": 50
        }
      ]

      Sinon.stub(salesService, 'update').resolves(1, [returnResultExpect]);

      await salesController.update(req, res);

      expect(res.status.calledWith(200)).to.be.true;
    });
  });

  describe('Verifica quando é chamado exclude no /sales', () => {

    afterEach(() => Sinon.restore())
    it('Quando o produto é deletado com sucesso ', async () => {
      const req = {};
      const res = {};
      req.params = {};

      res.status = Sinon.stub().returns(res);
      res.end = Sinon.stub().returns();

      const returnResultExpect = { id: 1 }

      Sinon.stub(salesService, 'exclude').resolves(returnResultExpect);

      await salesController.exclude(req, res);

      expect(res.status.calledWith(204)).to.be.true;

    });
  });















});