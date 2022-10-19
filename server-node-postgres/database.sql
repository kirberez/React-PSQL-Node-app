create TABLE products(
  id SERIAL PRIMARY KEY,
  date DATE,
  title VARCHAR(255),
  quantity INT,
  price FLOAT
);