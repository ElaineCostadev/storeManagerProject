const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const { expect } = require('chai');
const Sinon = require('sinon');
const salesModel = require('../../../models/salesModels');
const productsModel = require('../../../models/productsModels');
const salesService = require('../../../services/salesServices');
const CustomError = require('../../../errors/CustomError');
const validateSales = require("../../../middlewares/validateSales");

chai.use(chaiAsPromised);


describe('Verificando testes do salesServices', () => {
  describe('Verifica quando é chamado a funcao getAll no /sales', () => {
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
        "saleId": 3,
        "date": "2022-08-18T14:28:08.000Z",
        "productId": 1,
        "quantity": 1
      },
      {
        "saleId": 3,
        "date": "2022-08-18T14:28:08.000Z",
        "productId": 2,
        "quantity": 5
      }
    ];

    afterEach(() => Sinon.restore())

    it('Quando é chamado com sucesso e aparecem todos os produtos em um array', async () => {
      Sinon.stub(salesModel, 'getAll').resolves(returnResultExpect);

      const resultService = await salesService.getAll();

      expect(resultService).to.be.equal(returnResultExpect);
      // não consegui comparar como igualdade está vindo undefined
      expect(resultService).to.be.an('array');

    });

    it('Quando é chamado com sucesso e aparecem todos os produtos com as chaves obrigatorias', async () => {
      Sinon.stub(salesModel, 'getAll').resolves(returnResultExpect);

      const [resultService] = await salesService.getAll();

      expect(resultService).to.all.keys('saleId', 'date', 'productId', 'quantity');
    });
  });

  describe('Verifica quando é chamado a funcao getbyPk no /sales', () => {
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
      }
    ];

    afterEach(() => Sinon.restore());

    it('Quando é chamado com sucesso com ID e aparece apenas 1 product no getByPk', async () => {
     
      Sinon.stub(salesModel, 'getByPk').resolves(returnResultExpect);
      // está vindo como undefined os valores?
      const resultService = await salesService.getByPk(1);

      expect(resultService).to.be.equal(returnResultExpect);
      expect(resultService).to.be.an('array')

    });

    it('Quando é chamado a função getByPk e não existe o ID do produto', async () => {
      const returnResultExpect = {
        "message": "Sale not found"
      }

      Sinon.stub(salesModel, 'getByPk').resolves(returnResultExpect);

      const resultService = await salesService.getByPk(5);

      expect(resultService).to.have.key('message');
      expect(resultService).to.be.a('object');
    });

    it('Quando é chamado a função getByPk, o CustomError lança o erro com a message onde não existe o ID do produto', async () => {

      return expect(salesService.getByPk(7))
        .to.eventually.be.rejectedWith('Sale not found')
        .and.be.an.instanceOf(CustomError)
        .and.have.property('status', 404);
    });

  });

  describe('Verifica quando é chamado a funcao create no /sales', () => {
/*     const returnResultProducts = [
      { id: 1, name: 'Martelo de Thor' },
      { id: 2, name: 'Traje de encolhimento' },
      { id: 3, name: 'Escudo do Capitão América' },
    ];
 */
    const productSales = [
      {
        "productId": 1,
        "quantity": 1
      },
      {
        "productId": 33,
        "quantity": 5
      }
    ];

    const returnExpectSales = {
      "id": 5,
      "itemsSold": [
        {
          "productId": 1,
          "quantity": 1
        },
        {
          "productId": 2,
          "quantity": 5
        }
      ]
    }

    afterEach(() => Sinon.restore())

    it('Quando o produto é cadastrado com sucesso',)/*  async () => {
      Sinon.stub(productsModel, 'getAll').resolves(returnExpectSales);
      
      const checkIfProductExists = productSales.every((eachItens) => returnResultProducts
        .some((eachProduct) => eachProduct.id === eachItens.productId));
      

      Sinon.stub(salesModel, 'createSales').resolves(returnExpectSales);

      const resultService = await salesService.createSales(productSales);

      console.log(resultService);

      expect(resultService).to.be.a('object');
      expect(resultService).to.all.keys('id', 'itemsSold');
      expect(resultService).to.be.equals(returnExpectSales) 
    });*/

    it('Quando o produto não é encontrado e não é possivel cadastrar a Sale e CustomError lança o erro',) /* async () => {
      Sinon.stub(productsModel, 'getAll').resolves(returnResultProducts);

      Sinon.stub(salesModel, 'createSales').resolves(returnExpectSales);

      return expect(salesService.createSales(productSales))
        .to.eventually.be.rejectedWith('Product not found')
        .and.be.an.instanceOf(CustomError)
        .and.have.property('status', 404);
    }); */
  });

  describe('Verifica quando é chamado a funcao Update no /sales', () => {

   

    const productSales = [
      {
        "productId": 1,
        "quantity": 1
      },
      {
        "productId": 33,
        "quantity": 5
      }
    ];


    const returnResultExpect = {
      "saleId": "1",
      "itemsUpdated": [
        {
          "productId": 1,
          "quantity": 10
        },
        {
          "productId": 2,
          "quantity": 30
        }
      ]
    }

    afterEach(() => Sinon.restore())

    it('Quando o produto é atualizado com sucesso', async () => {
      
      Sinon.stub(salesModel, 'checkIfSalesExists').resolves(returnResultExpect);
      Sinon.stub(salesModel, 'update').resolves(returnResultExpect);

      const resultService = await salesService.update(1, productSales);

      expect(resultService).to.be.equals(returnResultExpect)
      expect(resultService).to.be.a('object');
      expect(resultService).to.have.keys('saleId', 'itemsUpdated');
    });

    it('Quando o produto não é atualizado e é lançado um erro com CustomError', async () => {

      return expect(salesService.update(7, productSales))
        .to.eventually.be.rejectedWith('Sale not found')
        .and.be.an.instanceOf(CustomError)
        .and.have.property('status', 404);

      // a minha frase está com falso positivo?
    });
  });

  describe('Verifica quando é chamado a funcao Exclude no /sales', () => {

    afterEach(() => Sinon.restore())

    it('Quando a venda é excluida com sucesso', async () => {
      const returnResultExpect = { id: 1 }
      Sinon.stub(salesModel, 'checkIfSalesExists').resolves(1);

      Sinon.stub(salesModel, 'exclude').resolves(returnResultExpect);
      const resultService = await salesService.exclude(1);

      expect(resultService).to.be.an('object');
    });

    it('Quando o produto não é encontrado para ser excluido', async () => {
      return expect(salesService.exclude(5))
        .to.eventually.be.rejectedWith('Sale not found')
        .and.be.an.instanceOf(CustomError)
        .and.have.property('status', 404);
    });

  });

});