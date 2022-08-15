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

  create: async (nameProduct) => {
    const [product] = await connection
      .execute('INSERT INTO StoreManager.products(name) VALUES (?);', [nameProduct]);
    return product;
  },
  
};

module.exports = productsModel;
