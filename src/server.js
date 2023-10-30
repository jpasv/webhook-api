const express = require('express');
const http = require('http');

const app = express();

app.use(express.json());

let order = {};

app.all('/webhook', async (req, res) => {
    console.log('Cabeçalhos:', req.headers);
    console.log('Corpo:', req.body);

    if (!req.body) {
        console.log('400 Error: Corpo da requisição vazio');
        return res.status(400).send('Corpo da requisição vazio');
    }
    
    order = req.body;
    res.status(200).json({ message: 'ok' })
})

app.get('/data', async (req, res) => {
    res.status(200).json(order);
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
