"use strict"

          var canvas = document.getElementById('canvasMain');
          var ctx = canvas.getContext('2d');
          var clicked = false;
          var tablero = new Tablero();
          var player_1 = new Jugador('player_1');
          var player_2 = new Jugador('player_2');
          let imageBoard = new Image();
          var jugadorActual = player_1;
          var fichaActual;


window.onload = function(){
  alert("Jugador 1 comienza! Cliquea en el circulo para empezar!")
}

document.getElementById('reset').addEventListener('click', function(e){
location.reload()
})

 canvas.onmousemove = function (e){
    if (clicked) {
    var x = e.clientX - canvas.getBoundingClientRect().left;
    var y = e.clientY - canvas.getBoundingClientRect().top;


    ctx.clearRect(0,0,canvas.width,canvas.height);
    tablero.draw();
    fichaActual.draw(ctx,x,y);
    player_1.drawFicha(jugadorActual.getJugador());
    player_2.drawFicha(jugadorActual.getJugador());
    }
  }


   canvas.onmousedown = function(e){

     if (getCantFicha(jugadorActual.getJugador(),(e.clientX-canvas.getBoundingClientRect().left),(e.clientY - canvas.getBoundingClientRect().top))) {
       clicked = true;
       fichaActual = jugadorActual.getFicha();
     }
   }


  canvas.onmouseup = function(e){
    if(clicked){
      if (tablero.add((e.clientX - canvas.getBoundingClientRect().left),fichaActual)) {
        ctx.clearRect(0,0,canvas.width,canvas.height);
        player_1.drawFicha(jugadorActual.getJugador());
        player_2.drawFicha(jugadorActual.getJugador());
        clicked = false;
        var ganador = tablero.gane(fichaActual);
        if (ganador.length == 4){// retorna un arreglo con las fichas ganadoras, o uno vacio
          for (var i = 0; i < ganador.length; i++) {
            ganador[i].winner();
        }
        setTimeout(function(){ location.reload() }, 3000);
      }
      fichaActual = null;
      player_1 = [player_2, player_2=player_1][0];//toggle entre jugadores
      jugadorActual = player_1;
      jugadorActual.tituloJugadores();
    }
    tablero.draw();
  }
}

  function getCantFicha(jugador,x,y){
    if (jugador == 'player_1') {
      if (x<200&&y<200) {
        return true;
        }else{
          return false;
      }
      }else if (jugador == 'player_2') {
        if (x>800&&y<200) {
          return true;
          }else{
            return false;
            }
            }else{
              return false;
          }
        }

  function drawimageBoard(){
    imageBoard.src = "Images/Fondo.jpg";
    imageBoard.onload = function(){
      let posX = 220;
      let posY=30;
      imageBoard.width = 540;
      imageBoard.height = 500;
      ctx.drawImage(imageBoard, posX, posY, imageBoard.width, imageBoard.height);
    }
  }
