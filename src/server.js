const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const cors = require('cors');

const server = http.createServer(app);
const io = socketIo(server);

app.use(cors());
app.use(express.json());

app.use((err, req, res, next) => {
  if (err) {
    console.error(err.stack);
    res.status(400).send('Error: ' + err.message);
    return;
  }
  next();
});

let dataReceived = [];


app.post('/webhook', async (req, res) => {
    console.log(req.body);
    dataReceived.push(req.body);
    res.status(200).send('Dados recebidos!');
  });

app.get('/data', async (req, res) => {
    res.status(200).json(dataReceived);
});

// Iniciar o servidor
server.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
