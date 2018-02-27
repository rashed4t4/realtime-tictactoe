//JS code goes here

$(document).ready(function(){
  var board = [
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "]
  ];
  var player = 1;
  const p1token = "X";
  const p2token = "O";
  var plr1won = 0;
  var plr1lost = 0;
  var plr2won = 0;
  var plr2lost = 0;


  function gameOver(){
    for (var i=0; i<3; i++){
      if(board[i][0] !== " " &&
        board[i][0] === board[i][1] &&
        board[i][0] === board[i][2]){
          //console.log(board[i][0]);
          return board[i][0];

      }

    }
    for (var j=0; j<3; j++){
      if(board[0][j] !== " " &&
        board[0][j] === board[1][j] &&
        board[0][j] === board[2][j]){
          //console.log(board[0][i]);
          return board[0][j];

      }
    }

    if(board[0][0] !== " " &&
      board[0][0] === board[1][1] &&
      board[0][0] === board[2][2]){
        //console.log(board[0][0]);
        return board[0][0];

    }
    if(board[2][0] !== " " &&
      board[2][0] === board[1][1] &&
      board[2][0] === board[0][2]){
        //console.log(board[2][0]);
        return board[2][0];

    }
    for(var k=0;k<3;k++){
      for(var l=0;l<3;l++){
        if(board[k][l] === " "){
          return false;
        }
      }
    }
    return "d";
  }

  $('td').click(function(){
    $this = $(this);

    const r = $this.data('i');
    const c = $this.data('j');

    if(player == 1 && board[r][c] === " "){
      $this.html(p1token);
      board[r][c] = p1token;
    }
    if(player == 2 && board[r][c] === " ") {
      $this.html(p2token);
      board[r][c] = p2token;
    }



    //console.log (board);
    var result = gameOver();

    if(result){
      if(result === "X"){
        plr1won++; plr2lost++;
        $("#one_won").html(plr1won);
        $("#two_lost").html(plr2lost);
        $("p").html("Player One Wins");
        // document.getElementById("one_won").innerHTML += 1;
        // document.getElementById("two_lost").innerHTML += 1;
      }
      else if(result === "O"){
        plr1lost++; plr2won++;
        $("#one_lost").html(plr1lost);
        $("#two_won").html(plr2won);
        $("p").html("Player Two Wins");
        // document.getElementById("two_won").innerHTML += 1;
        // document.getElementById("one_lost").innerHTML += 1;
      }
      else{
        board = [
          [" ", " ", " "],
          [" ", " ", " "],
          [" ", " ", " "]
        ];
        $("p").html("Game Draw");
      }

      //document.getElementById('0').innerHTML = " ";
      //document.getElementById("1").innerHTML = " ";


    }
    else {
      player = (player%2)+1;
    }
  });

  $('button').click(function(){
    $('td').html(" ");
    board = [
      [" ", " ", " "],
      [" ", " ", " "],
      [" ", " ", " "]
    ];
    $("p").html("New Game");

  });



});
