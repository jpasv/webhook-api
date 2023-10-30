const express = require('express');
const http = require('http');

const app = express();

app.use(express.json());

let dataReceived = [];

app.post('/webhook', (req, res) => {
    console.log('Cabeçalhos:', req.headers);
    console.log('Corpo:', req.body);

    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).send('Corpo da solicitação vazio ou inválido');
    }

    dataReceived.push(req.body);
    res.status(200).send('Dados recebidos!');
});


app.get('/data', async (req, res) => {
    res.status(200).json(dataReceived);
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
