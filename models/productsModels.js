const connection = require('./connection');

const productsModel = {
  getAll: async () => {
    const [products] = await connection.execute('SELECT * FROM StoreManager.products;');
    return products;
  },
  
  getByPk: async (id) => {
    const [[products]] = await connection.execute(`SELECT * FROM StoreManager.products
    WHERE id = ? ORDER BY id;`, [id]);
    console.log(products);
    return products;
  },

  create: async (nameProduct) => {
    const [product] = await connection
      .execute('INSERT INTO StoreManager.products (name) VALUES (?);', [nameProduct]);
    return product;
  },

  update: async (id, name) => {
    const [products] = await connection
      .query('UPDATE StoreManager.products SET name = ? WHERE id = ?;', [name, id]);
    return products;
  },

  exclude: async (id) => {
    const [product] = await connection
      .execute('DELETE FROM StoreManager.products WHERE id = ?;', [id]);
    return product;
  },
  
};

module.exports = productsModel;
