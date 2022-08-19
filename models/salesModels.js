const connection = require('./connection');

const salesModel = {
  getAll: async () => {
    const [sales] = await connection.execute(`
      SELECT
        s.id AS saleId, s.date, sp.product_id AS productId, sp.quantity
      FROM
        StoreManager.sales AS s
      INNER JOIN
        StoreManager.sales_products AS sp
      ON
        s.id = sp.sale_id;`);
    return sales;
  },
  
  getByPk: async (id) => {
    const [sales] = await connection.execute(`
      SELECT
        s.date , sp.product_id AS productId, sp.quantity
      FROM
          StoreManager.sales AS s
      INNER JOIN
        StoreManager.sales_products AS sp
      ON
        s.id = sp.sale_id
      WHERE
        s.id= ?
      ORDER BY
        s.id ASC, sp.product_id ASC;`, [id]);

      return sales;
  },

  createSales: async (sales) => {
    const [salesId] = await connection.execute(`INSERT INTO StoreManager.sales (date)
      VALUES (NOW());`);
    // aqui encontro o id da tabela sale - o sale_id

    await sales.forEach(async (eachProduct) => {
      await connection
        .execute(`INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
          VALUES (?, ?, ?);`, [salesId.insertId, eachProduct.productId, eachProduct.quantity]);
      // aqui insiro o id de sale_id - tbm o Id de cada produto e a quantidade de cada produto
    });

    // retorno o objeto com o id de saleID e a chave dos items com o array de produtos recebido no parametro

    return { id: salesId.insertId, itemsSold: sales };
  },

  checkIfSalesExists: async (id) => {
    const [sale] = await connection.execute('SELECT * FROM StoreManager.sales WHERE id = ?', [id]);
    return sale;
  },

  update: async (id, body) => {
    await body.forEach(async (eachProduct) => {
      await connection
        .execute(`UPDATE StoreManager.sales_products
                  SET product_id = ?, quantity = ?
                  WHERE sale_id = ?;`,
          [eachProduct.productId, eachProduct.quantity, id]);
    });
    return { saleId: id, itemsUpdated: body };
  },

  exclude: async (id) => {
    const [saleExcluide] = await connection
      .execute('DELETE FROM StoreManager.sales WHERE id = ?;', [id]);
    return saleExcluide;
  },
};

module.exports = salesModel;