var http = require('http');
var fs = require('fs');

server = http.createServer( function(request, response) {
  var sent_header = false,
  stream = fs.createReadStream('./www'+request.url);
  stream.setEncoding('utf-8');
  stream.on('error', function(e) {
    response.writeHead(404, {'Content-Type': 'text/plain; charset=utf-8'});
    response.end('Désolé, le document demandé est introuvable...');
  });

  stream.on('data', function(data) {
    if ( ! sent_header ) {
      response.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
      sent_header = true;
    }
    response.write(data);
  });
  stream.on('end', function(data) { response.end(); });
});



// Chargement de socket.io
var io = require('socket.io').listen(server);

var users=[];

io.sockets.on('connection', function (socket) {
  socket.on('new_user', function(pseudo) {
    socket.pseudo=pseudo;
    while(users.indexOf(socket.pseudo.toLowerCase())!=-1){socket.pseudo+='_bis';}
    socket.emit('connexSuccess',socket.pseudo,users);
    users.push(socket.pseudo);
    console.log('Un client s\'est connecté ! son pseudo est : '+ socket.pseudo);
    console.log('Les utilisateurs connectés à la partie '+users);
    socket.broadcast.emit('new_rival', socket.pseudo);
  });


  socket.emit('message', 'Connexion réussie');

  socket.on('disconnect', function(){
    console.log('utilisateur deconnecté '+socket.pseudo);
    io.emit('quit_rival',socket.pseudo);
    users.splice(users.indexOf(socket.pseudo),users.indexOf(socket.pseudo)+1);
    console.log('Les utilisateurs connectés à la partie '+users);
  });

  socket.on('mouse_track',function(x,y){
    socket.broadcast.emit('rivMove',socket.pseudo,x,y);
  });

  socket.on('endGame', function(){
    console.log('end of game ! Winner is '+socket.pseudo);
    io.emit('endGame', socket.pseudo);
  });
});

server.listen(8080);
