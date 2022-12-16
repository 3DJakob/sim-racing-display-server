const F1TelemetryClient = require('f1-2021-udp').F1TelemetryClient
const constants = require('f1-2021-udp').constants
const express = require('express')
const app = express()
const cors = require('cors')
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')

// const io = new Server(server)

const io = new Server(server, {
  cors: {
    origin: '*'
  }
})

app.use(cors())

const { PACKETS } = constants
// const options: import('f1-2021-udp/build/src/types').Options = {
//   port: 20777,
//   ip
// }
const client = new F1TelemetryClient({ bigintEnabled: false })

console.log(client)

// get motor rpm

// client.on(PACKETS.Motion, (data) => {
//   console.log(data)
//   io.emit('motion', data)
// })

// client.on('carStatus', function (data) {
//   console.log(data)
// })

client.on(PACKETS.carTelemetry, (data) => {
  console.log(data)
  io.emit('carTelemetry', data)
})

client.on(PACKETS.event, (data) => {
  console.log(data)
  io.emit('event', data)
})

client.on(PACKETS.carStatus, (data) => {
  console.log(data)
  io.emit('carStatus', data)
})

client.on(PACKETS.session, (data) => {
  console.log(data)
  io.emit('session', data)
})

client.on(PACKETS.carSetups, (data) => {
  console.log(data)
  io.emit('carSetups', data)
})

client.on('lapData', (packet) => {
  io.emit('lapData', packet)
})

// app.get('/', (req, res) => {
//   // res.sendFile(__dirname + '/index.html')
//   res.send('Hello World!')
// })

io.on('connection', (socket) => {
  console.log('a user connected')
})

server.listen(4000, () => {
  console.log('listening on *:4000')
})

client.start()
