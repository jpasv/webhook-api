const express = require('express')
const http = require('http')
const socketIo = require('socket.io')
const app = express()

const server = http.createServer(app)
const io = socketIo(server)

app.use(express.json())
app.use(cors())

let dataReceived = []


io.on('connection', (socket) => {
    console.log('Novo cliente conectado')

    socket.on('disconnect', () => {
        console.log('Cliente desconectado')
    })
})

app.all('/webhook', (req, res) => {
    dataReceived.push(req.body)
    io.sockets.emit('dataReceived', req.body)
    res.status(200).send('Dados recebidos!')
})

app.all('/data', (req, res) => {
    res.status(200).json(dataReceived)
})

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000')
})