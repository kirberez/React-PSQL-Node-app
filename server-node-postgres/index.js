import express from "express";
import { getData } from "./controller/data.controller.js";


const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.json())
// CORS
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});

app.get('/', (req, res) => {
  getData()
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      console.log('ERROR')
      res.status(500).send(error);
    })
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}.`)
})