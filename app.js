const F1TelemetryClient = require('f1-2021-udp').F1TelemetryClient
const constants = require('f1-2021-udp').constants
const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)

const { PACKETS } = constants
// const options: import('f1-2021-udp/build/src/types').Options = {
//   port: 20777,
//   ip
// }
const client = new F1TelemetryClient()

console.log(client)

// get motor rpm

client.on(PACKETS.Motion, (data) => {
  console.log(data)
  io.emit('motion', data)
})

client.on('carStatus', function (data) {
  console.log(data)
})

client.on(PACKETS.CarTelemetry, (data) => {
  console.log(data)
  io.emit('carTelemetry', data)
})

client.on('session', (packet) => {
  console.log('session', packet)
  io.emit('session', packet)
})

client.on('lapData', (packet) => {
  console.log('lapData', packet)
  io.emit('lapData', packet)
})

app.get('/', (req, res) => {
  // res.sendFile(__dirname + '/index.html')
  res.send('Hello World!')
})

io.on('connection', (socket) => {
  console.log('a user connected')
})

server.listen(4000, () => {
  console.log('listening on *:4000')
})

client.start()
