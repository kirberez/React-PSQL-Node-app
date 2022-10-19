import pkg from "pg";
const { Pool } = pkg;


// через pool мы делаем запросы к БД
export const pool = new Pool({
  user: "my_user",
  password: "root",
  host: "localhost",
  port: 5432,
  database: "test_db",
});
