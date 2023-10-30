const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const server = http.createServer(app);
const io = socketIo(server);

app.use(cors());
app.use(express.json());

app.all('/webhook', bodyParser.raw({ type: 'application/json' }), (req, res) => {
	if (req.method !== 'POST') {
		return res.status(200).send({ status: 'ok' });
	}

	let order = {};
	try {
		order = JSON.parse(req.body);
	} catch (error) {
		return res.status(400).send({ error });
	}

	console.log('Received order:', order);

	return res.status(200).send({ status: 'ok' });
});

app.get('/data', async (req, res) => {
    res.status(200).json(dataReceived);
});

// Iniciar o servidor
server.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
