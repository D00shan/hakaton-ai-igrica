//modules
const express = require('express')
const app = express()
const path = require('path');

const port = 3000

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