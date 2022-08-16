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
  describe('Verifica quando é chamado endpoint get. no /products', () => {

    afterEach(() => Sinon.restore())

    it('Quando é chamado com sucesso e aparecem todos os produtos no getAll', async () => {
      const returnResultExpect = [
        { id: 1, name: 'Martelo de Thor' },
        { id: 2, name: 'Traje de encolhimento' },
        { id: 3, name: 'Escudo do Capitão América' },
      ]
      Sinon.stub(productsModel, 'getAll').resolves([returnResultExpect]);

      const [resultService] = await productsService.getAll();

      expect(resultService).to.be.deep.equal(returnResultExpect);

    });

    it('Quando é chamado com sucesso com ID e aparece apenas 1 product no getByPk', async () => {
      const returnResultExpect = { id: 1, name: 'Martelo de Thor' }
      Sinon.stub(productsModel, 'getByPk').resolves(returnResultExpect);

      const resultService = await productsService.getByPk(1);

      expect(resultService).to.be.equal(returnResultExpect);

    });

    it('Quando é chamado e o ID não existir no getByPk ', async () => {
      const returnResultExpect = {
        "message": "Product not found"
      }

      Sinon.stub(productsModel, 'getByPk').resolves(returnResultExpect);

      const resultService = await productsService.getByPk(4);

      expect(resultService).to.have.key('message');
      expect(resultService).to.be.a('object');

    });

    it('Quando o produto é cadastrado com sucesso', async () => {
      const returnResultExpect = { name: 'ProductOk' }

      Sinon.stub(productsModel, 'create').resolves(returnResultExpect);
      const resultService = await productsService.create();

      expect(resultService).to.be.a('object');
      expect(resultService).to.have.key('name');
    });

/*     describe('Validações do Middleware de erro', () => {
      it('Quando não é possivel cadastrar o produto pelo nome', async () => {
        const req = {};
        const res = {};

        res.status = Sinon.stub().returns(res);
        res.json = Sinon.stub().returns();
        req.body = {};
        
        

        return expect(await validateProducts(req, res))
          .to.be.rejectedWith('name is required' )
          .and.be.an.instanceOf(CustomError)
          .and.to.include({ status: 400 })
        
        
       //  expect(res.status.calledWith(404)).to.be.equal(false)
        // res.status(400).json({ message: '"name" is required' });
        
      });



    }); */
  });
});

