const connection = require('./connection');

const productsModel = {
  getAll: async () => {
    const [products] = await connection.execute('SELECT * FROM StoreManager.products;');
    return products;
  },

  getByPk: async (id) => {
    const [[products]] = await connection.execute(`SELECT * FROM StoreManager.products
    WHERE id=? ORDER BY id;`, [id]);
    return products;
  },
  
};

module.exports = productsModel;
