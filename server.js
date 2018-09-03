var express = require ('express');
var path = require('path');
var app = new express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('port', (process.env.PORT || 3000));
app.use(express.static(path.resolve('public')));

app.get('/',(req, res) => {
    res.sendFile(__dirname+ '/public/views/game.html');
})



http.listen(process.env.PORT, ()=>{
    console.log('server started');
})

var roomno = 1;
var users = [];
io.on('connection', (socket) => {
    
    console.log('made socket connection', socket.id);

    //Increase roomno 2 clients are present in a room.
    
    
   if(io.nsps['/'].adapter.rooms["room-"+roomno] && Object.keys(io.nsps['/'].adapter.rooms["room-"+roomno]).length > 1) roomno++;
   socket.join("room-"+roomno);
   console.log(io.nsps['/'].adapter.rooms["room-"+roomno]);
   
   
   
   
   
  io.sockets.in("room-"+roomno).emit('connectToRoom', roomno //{     msg: "You are in room no. ",
      
      //users: Object.keys(io.nsps['/'].adapter.rooms["room-"+roomno]).length}
    );
    
    
    
    socket.on('setName', (name, roomNo) => {
        users.push(name);
        //socket.nickname = name;
        if(users.length==2){
            io.sockets.in("room-"+roomNo).emit('play', users);
            //   { users: io.nsps['/'].adapter.rooms["room-"+roomno],
            //     player: players  
            //   });
            users = [];
            console.log(io.nsps['/'].adapter.rooms["room-"+roomno]);
        }
    });
    
    socket.on('turn', (roomNo, r, c)=>{
        io.sockets.in("room-"+roomNo).emit('played', r, c);
        
    })
    
    socket.on('resetBoard', (players, roomNo)=>{
        var temp = [players[1].name, players[0].name] ;
        
        io.sockets.in("room-"+roomNo).emit('play', temp);
    })
});


