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

var roomNo = 1, count=0;
var players = [] ;


io.on('connection', (socket) => {
    
    console.log('made socket connection', socket.id);

    //Increase roomno 2 clients are present in a room.
    
    socket.on('joinroom', (data)=>{
        var player = {};
        player.name = data;
        
        if(io.nsps['/'].adapter.rooms['room-'+roomNo] && Object.keys(io.nsps['/'].adapter.rooms['room-'+roomNo]).length > 1) roomNo++;
        if(players.length%2 == 0) {player.tocken = 'X';}
        else if(players.length%2 == 1) {player.tocken = 'O';}
       player.roomNo = roomNo;
        player.won = 0; player.lost = 0;
        socket.join('room-'+roomNo);
        players.push(player);
        if(players.length%2==0){
            io.sockets.in("room-"+roomNo).emit('play', players.slice(roomNo*2-2,roomNo*2));
            
        }
        console.log(players);
        
    })
//   if(io.nsps['/'].adapter.rooms["room-"+roomno] && Object.keys(io.nsps['/'].adapter.rooms["room-"+roomno]).length > 1) roomno++;
//   socket.join("room-"+roomno);
//   console.log(io.nsps['/'].adapter.rooms["room-"+roomno]);
   
   
   
   
   
//   io.sockets.in("room-"+roomno).emit('connectToRoom', roomno //{     msg: "You are in room no. ",
      
//       //users: Object.keys(io.nsps['/'].adapter.rooms["room-"+roomno]).length}
//     );
    
    
    
//     socket.on('setName', (name, roomNo) => {
//         users.push(name);
//         //socket.nickname = name;
//         if(users.length==2){
//             io.sockets.in("room-"+roomNo).emit('play', users);
//             //   { users: io.nsps['/'].adapter.rooms["room-"+roomno],
//             //     player: players  
//             //   });
//             users = [];
//             console.log(io.nsps['/'].adapter.rooms["room-"+roomno]);
//         }
//     });
    
    socket.on('turn', (roomno, r, c)=>{
        io.sockets.in("room-"+roomno).emit('played', r, c);
        
    })
    socket.on('playAgain', (data, name)=>{
        count++
        io.sockets.in("room-"+data[0].roomNo).emit('msg', name);
        if(count>1){
            count = 0;
            var temp = data[0].tocken ;
            data[0].tocken = data[1].tocken;
            data[1].tocken = temp;
            temp =data[0]; data[0] = data[1];
            data[1] = temp;
            io.sockets.in("room-"+data[0].roomNo).emit('play', data);
        }
    })
    // socket.on('resetBoard', (data)=>{
    //     var temp = data[0].tocken ;
    //     data[0].tocken = data[1].tocken;
    //     data[1].tocken = temp;
    //     temp =data[0]; data[0] = data[1];
    //     data[1] = temp;
    //     io.sockets.in("room-"+data[0].roomNo).emit('play', data);
    // })
});


