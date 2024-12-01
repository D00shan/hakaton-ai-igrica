//modules
const express = require('express')
const app = express()
const path = require('path');
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

const port = 3000

let playercount = 0;

//ws
wss.on('connection', (ws) => {
  console.log('A new client connected.');
  playercount++

  // Event listener for incoming messages
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
        client.send(playercount);
    }
});

  // Event listener for client disconnection
  ws.on('close', () => {
    console.log('A client disconnected.');
    playercount--
  });
});

//middlewares
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/room-join', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pridruzi_se.html'));
});

app.get('/room', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'room.html'));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})