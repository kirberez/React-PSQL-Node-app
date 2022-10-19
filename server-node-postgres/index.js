import express from "express";


const PORT = process.env.PORT || 8080;
const app = express();

app.get('/', (req, res) => {
  res.status(200).send('Server created!');
})

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}.`)
})