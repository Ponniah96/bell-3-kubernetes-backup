const express = require('express');
const app = express();
const path = require('path');
const server = require('http').Server(app)
const io = require('socket.io')(server)
const { v4: uuidV4 } = require('uuid')
const PORT=process.env.PORT || 3000;
const home=require('./public/home');

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')))

app.use('/home',home);

/**Integrate Google cloud Storage into our application Starts */
// Imports the Google Cloud client library
const {Storage} = require('@google-cloud/storage');

const gc = new Storage({
  keyFilename: path.join(__filename, '../bell-3-bdcd5c56d905.json'),
  projectId: "bell-3"
});

const firstbucket=gc.bucket('bell-3_first_bucket');
console.log("first bucket: ",firstbucket);

const videostreaming = gc.bucket("video-streaming1");
console.log('Video Streaming: ',videostreaming);
/**Integrate Google cloud Storage into our application Ends */

app.get('/', (req, res) => {
  console.log("stream value:",res)
  res.redirect(`/${uuidV4()}`)
})

app.get('/:room', (req, res) => {
  res.render('room', { roomId: req.params.room })
})


/**Integrate Socket into our application Starts */
io.on('connection', socket => {
  socket.on('join-room', (roomId, userId) => {
  console.log("socket connected: ",roomId,userId);
    socket.join(roomId);
    socket.to(roomId).broadcast.emit('user-connected', userId);
    
    socket.on('disconnect', () => {
      socket.to(roomId).broadcast.emit('user-disconnected', userId)
    })
  })
})

/**Integrate Socket into our application Ends */

server.listen(PORT);






