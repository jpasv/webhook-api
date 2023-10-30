const express = require('express');
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(express.json());

let order = {};

app.post('/webhook', async (req, res) => {
    order = req.body;
    res.status(200).json({ message: 'ok' })
})

app.get('/data', async (req, res) => {
    res.status(200).json(order);
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
