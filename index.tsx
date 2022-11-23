const F1TelemetryClient = require('f1-2021-udp')
const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)

const client = new F1TelemetryClient()

client.on('session', (packet) => {
  io.emit('session', packet)
})

app.get('/', (req, res) => {
  // res.sendFile(__dirname + '/index.html')
  res.send('Hello World!')
})

io.on('connection', (socket) => {
  console.log('a user connected')
})

server.listen(3000, () => {
  console.log('listening on *:3000')
})
