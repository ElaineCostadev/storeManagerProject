const { expect } = require('chai');
const Sinon = require('sinon');
const connection = require('../../../models/connection');
const productsModel = require('../../../models/productsModels');

describe('Verificando testes do productsModels', () => {
  describe('Verifica quando é chamado endpoint get. no /products', () => {
    
    afterEach(() => Sinon.restore())

    it('Quando é chamado com sucesso e aparecem todos os produtos', async () => {
      const returnResultExpect = [
        { id: 1, name: 'Martelo de Thor' },
        { id: 2, name: 'Traje de encolhimento' },
        { id: 3, name: 'Escudo do Capitão América' },
      ]
      Sinon.stub(connection, 'execute').resolves([returnResultExpect]);

      const resultModel = await productsModel.getAll();

      expect(resultModel).to.be.equal(returnResultExpect);
      // expect(resultModel).to.all.keys('id', 'name');

    });

    it('Quando é chamado com sucesso com ID e aparece apenas 1 product no getByPk', async () => {
      const returnResultExpect = [
        { id: 1, name: 'Martelo de Thor' },
        { id: 2, name: 'Traje de encolhimento' },
        { id: 3, name: 'Escudo do Capitão América' },
      ]
      
      Sinon.stub(connection, 'execute').resolves([[returnResultExpect]]);

      const resultModel = await productsModel.getByPk(1);

      expect(resultModel).to.be.equals(returnResultExpect);

    });

 /*    it('Quando é chamado e o ID não existir no getByPk', async () => {
      const execute = [{ insertId: 1 }];
      const returnResultExpect = [
        { id: 1, name: 'Martelo de Thor' },
        { id: 2, name: 'Traje de encolhimento' },
        { id: 3, name: 'Escudo do Capitão América' },
      ]

      Sinon.stub(connection, 'execute').resolves(execute);

      const result = await productsModel.getByPk([returnResultExpect]);

      expect(result).to.not.have.a.property(id);
      // expect(resultService).to.be.a('object');

    }); */

  });
});