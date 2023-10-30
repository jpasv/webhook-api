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

let dataReceived = {};

io.on('connection', (socket) => {
    console.log('Novo cliente conectado');

    // Quando um novo cliente se conecta, envia todos os dados já recebidos
    socket.emit('initialData', dataReceived);

    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
});

app.all('/webhook', (req, res) => {
    if (!req.body) {
      console.log('400 Error: Corpo da requisição vazio');
      return res.status(400).send('Corpo da requisição vazio');
    }
    dataReceived.push(req.body);
    io.sockets.emit('dataReceived', req.body);
    res.status(200).send('Dados recebidos!');
  });

app.all('/data', (req, res) => {
    res.status(200).json(dataReceived);
});

// Iniciar o servidor
server.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
