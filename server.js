//modules
const express = require('express')
const app = express()
const path = require('path');
const WebSocket = require('ws');

const Anthropic = require("@anthropic-ai/sdk");

const anthropic = new Anthropic({
  apiKey: "xai-Ci2OLAzlVTrR8o4l99VA4mNpTfWvTO8udSCerxAdjdcDqdZMOax1CT2OyDeoQioSEjCiA2DkEDe2Wgzg",
  baseURL: "https://api.x.ai/",
});

const wss = new WebSocket.Server({ port: 8080 });

const port = 3000

let playercount = 0;
let answers = []
let answercount = 0

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

ws.on('message', (message) => {

  switch (message.phase) {
    case 0:
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send("INIT");
        }
      });
    case 1:
      answercount++
      answers.push(message);
      if(answercount == 5) {
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send("INIT");
          }
        });
      }
    case 2:


      break;
  
    default:
      break;
  }
  
  console.log('Received');


})

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