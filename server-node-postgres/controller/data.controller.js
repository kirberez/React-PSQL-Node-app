import { pool } from "../db.js";


// Если сетевая ошибка, возникающая из пула, будет запущен обратный вызов:
pool.on('error', (err, client) => {
  console.log('Error: ', err);
});

// Получить все строки
export const getData = () => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT id, date::timestamp::date, title, quantity, price FROM products;', (error, results) => {
      if (error) {
        reject(error)
      }
      console.log(results.rows);
      resolve(results.rows);
    })
  })
};

// Отфильтровать строки
export const filterData = (column, oper, value) => {
  const query = `SELECT id, date::timestamp::date, title, quantity, price FROM products WHERE ${column} ${oper} ${value};`;
  return new Promise((resolve, reject) => {
    pool.query(query, (error, results) => {
      if (error) {
        reject(error)
      }
      console.log(results.rows);
      resolve(results.rows);
    })
  })
};

// Отсортировать строки
// !TODO Если применён фильтр, то сортировка собьёт его - исправить! 
export const sortData = (column, sort) => {
  const query = `SELECT id, date::timestamp::date, title, quantity, price FROM products ORDER BY ${column} ${sort};`;
  return new Promise((resolve, reject) => {
    pool.query(query, (error, results) => {
      if (error) {
        reject(error)
      }
      console.log(results.rows);
      resolve(results.rows);
    })
  })
};

// Добавить строку
export const addData = (body) => {
  return new Promise((resolve, reject) => {
    const { date, title, quantity, price } = body;
    pool.query(`INSERT INTO products (date, title, quantity, price) VALUES ($1, $2, $3, $4) RETURNING *;`, [date, title, quantity, price], (error, results) => {
      if (error) {
        reject(error)
      }
      console.log(results.rows)
      resolve(`A new row has been added: ${results.rows}`)
    })
  })
};