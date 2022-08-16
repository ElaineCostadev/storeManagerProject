const connection = require('./connection');

const salesModel = {
  createDate: async (date) => {
    const [sales] = await connection
      .execute('INSERT INTO StoreManager.sales (date) VALUES (?);', [date]);
    return sales;
  },

  createSales: async (idSale, idProcuct, quantity) => {
    const [salesProducts] = await connection
      .execute(`INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
      VALUES (?, ?, ?);`, [{ idSale, idProcuct, quantity }]);
    return salesProducts;
  },

  getAll: async () => {
    const [sales] = await connection.execute(`SELECT sale_id, date, product_id, quantity
      FROM StoreManager.sales_products
      JOIN StoreManager.products
      ON StoreManager.sales_products.product_id = StoreManager.products.id
      JOIN StoreManager.sales
      ON StoreManager.sales_products.sale_id = StoreManager.sales.id;`);
    return sales;
  },

  getByPk: async (id) => {
    const [sales] = await connection.execute(`SELECT date, product_id, quantity
      FROM StoreManager.sales_products
      JOIN StoreManager.products
      ON StoreManager.sales_products.product_id = StoreManager.products.id
      JOIN StoreManager.sales
      ON StoreManager.sales_products.sale_id = StoreManager.sales.id
      WHERE sale_id = ?;`, [id]);

      return sales;
  },
};

module.exports = salesModel;