var express = require('express')
var app = require('express')();
var http = require('http').Server(app);
var socket = require('socket.io');
var io = require('socket.io')(http);

// var Players = [];
var online = 0;

app.use(express.static('public'));

app.get('/', function(req, res){
  res.sendFile( __dirname + '/index.html');
});

app.get('/desktop', function(req, res){
  res.sendFile( __dirname + '/public/desktop.html');
});

io.on('connection', function(socket) {

    socket.on('click', function(){

      console.log('clicked!');
      socket.broadcast.emit('play');

    });

    socket.on('shake', function(){

      console.log('shaken!');
      socket.emit('play');
      socket.broadcast.emit('play');

    });

    socket.on('newPlayer', function(data1) {

      online++;
      console.log('Online players : ' + online);
      console.log('New player connected : ' + data1);
      // Players[data1] = data1;
      // console.log(Players);

    });

    socket.on('disconnect', function () {

      socket.emit('disconnected');
      online = online - 1;

    });

    console.log('new connection: ' + socket.id);
});

http.listen(80, function(){
  console.log('listening on *:80');
});