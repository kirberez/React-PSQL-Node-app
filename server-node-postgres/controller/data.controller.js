import { pool } from "../db.js";


// Если сетевая ошибка, возникающая из пула, будет запущен обратный вызов:
pool.on('error', (err, client) => {
  console.log('Error: ', err);
});

export const getData = () => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT id, date::date, title, quantity, price FROM products;', (error, results) => {
      if (error) {
        reject(error)
      }
      console.log(results.rows);
      resolve(results.rows);
    })
  })
};