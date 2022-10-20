import express from "express";
import { getData, filterData, sortData, addData } from "./controller/data.controller.js";


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

app.get(`/filter`, (req, res) => {
  filterData(req.query.column, req.query.oper, req.query.value)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      console.log('ERROR in filter GET')
      res.status(500).send(error);
    })
})

app.get(`/sort`, (req, res) => {
  sortData(req.query.column, req.query.sort)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      console.log('ERROR in sort GET')
      res.status(500).send(error);
    })
})

app.post('/add', (req, res) => {
  createData(req.body)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}.`)
})