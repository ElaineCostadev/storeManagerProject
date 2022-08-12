const { expect } = require('chai');
const Sinon = require('sinon');
const productsModel = require('../../../models/productsModels');
const productsService = require('../../../services/productsServices');

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

  });
});

