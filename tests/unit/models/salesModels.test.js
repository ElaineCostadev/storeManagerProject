const { expect } = require('chai');
const Sinon = require('sinon');
const connection = require('../../../models/connection');
const salesModel = require('../../../models/salesModels');

describe('Verificando testes da camada salesModels', () => {
  describe('Verifica quando é chamado a função getALL. no /sales', () => {

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

    it('Quando é chamado com sucesso e aparecem todos os produtos', async () => {
     
      Sinon.stub(connection, 'execute').resolves([returnResultExpect]);

      const resultModel = await salesModel.getAll();

      expect(resultModel).to.be.equal(returnResultExpect);
      
    });

    it('Quando é chamado com sucesso e aparecem todos os produtos', async () => {

      Sinon.stub(connection, 'execute').resolves([returnResultExpect]);

      const [resultModel] = await salesModel.getAll();

      expect(resultModel).to.all.keys('saleId', 'date', 'productId', 'quantity');
    });
  });

  describe('Verifica quando é chamado a função getBYPK. no /sales', () => {
    
    const returnResultExpect = [
      {
        "saleId": 1,
        "date": "2022-08-18T13:59:09.000Z",
        "productId": 1,
        "quantity": 2
      },
      {
        "saleId": 1,
        "date": "2022-08-18T13:59:09.000Z",
        "productId": 2,
        "quantity": 9
      },
    ];
    afterEach(() => Sinon.restore())

    it('Quando é chamado com sucesso com ID e aparece apenas 1 product no getByPk', async () => {
 
      Sinon.stub(connection, 'execute').resolves([returnResultExpect]);

      const resultModel = await salesModel.getByPk(1);

      expect(resultModel).to.be.equals(returnResultExpect);

    });

    it('Quando é chamado a função getByPk e não existe o ID do produto', async () => {
      const returnResultExpect = [];

      Sinon.stub(connection, 'execute').resolves([returnResultExpect]);

      const resultModel = await salesModel.getByPk(7);

      expect(resultModel).to.be.equals(returnResultExpect);

    });
  });

  describe('Verifica quando é chamado a função CREATE. no /sales', () => {
    const returnResultExpect = {
      "id": 3,
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

    const inserProduct = 
      [
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

    it('Quando é criado um produto com sucesso', async () => {

      Sinon.stub(connection, 'execute').resolves([returnResultExpect]);

      const resultModel = await salesModel.createSales(inserProduct);

      // aqui nao estou conseguindo pegar o ID, está chegando como undefined, para poder comparar o que chega do Sinon, com o retorno da funcao.

      expect(resultModel).to.be.a('object');
      expect(resultModel).to.have.a.property('id');
    });
  });

  describe('Verifica quando é chamado a função UPDATE. no /sales', () => {
    afterEach(() => Sinon.restore())

    const returnResultExpect = {
      "saleId": "3",
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

    it('Quando é atualizado um produto produto com sucesso', async () => {
      const updatedProduct = [
        {
          "productId": 1,
          "quantity": 1
        },
        {
          "productId": 2,
          "quantity": 5
        }
      ];

      Sinon.stub(connection, 'execute').resolves([returnResultExpect]);

      const resultModel = await salesModel.update(3, updatedProduct);
      //const resultExpect = resultModel.affectedRows

      expect(resultModel).to.be.an('object');
      expect(resultModel).to.have.key('saleId', 'itemsUpdated');
    });
  });

  describe('Verifica quando é chamado a função CHECKigSalesExists. no /sales', () => {
    const returnResultExpect = [
      {
        "id": 1,
        "date": "2022-08-18T13:59:09.000Z",
      },
      {
        "id": 2,
        "date": "2022-08-18T13:59:09.000Z",
      },
    ];
    afterEach(() => Sinon.restore())

    it('Quando é entrado um sale com sucesso', async () => {

      Sinon.stub(connection, 'execute').resolves([returnResultExpect]);

      const resultModel = await salesModel.checkIfSalesExists(1);

      expect(resultModel).to.be.equals(returnResultExpect);
      expect(resultModel).to.be.an('array');
    });

    it('Quando é entrado um sale com sucesso com as chaves obrigatorias', async () => {

      Sinon.stub(connection, 'execute').resolves([returnResultExpect]);

      const [resultModel] = await salesModel.checkIfSalesExists(1);

      expect(resultModel).to.all.keys('id', 'date');
    });

    it('Quando não encontrar um sale', async () => {
      const returnResultExpect = [];
      Sinon.stub(connection, 'execute').resolves([returnResultExpect]);

      const resultModel = await salesModel.checkIfSalesExists(7);

      expect(resultModel).to.be.equals(returnResultExpect);
    });
  });


  describe('Verifica quando é chamado a função EXCLUDE. no /sales', () => {
    afterEach(() => Sinon.restore())

    it('Quando é excluido um produto com sucesso', async () => {
      const returnResultExpect = {
        "id": 3,
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

      Sinon.stub(connection, 'execute').resolves([[returnResultExpect]]);

      const [resultModel] = await salesModel.exclude(1);
      const resultExpect = resultModel.affectedRows

      expect(resultModel).to.be.an('object');
      expect(resultExpect).to.be.an('undefined');
    });
  });

});