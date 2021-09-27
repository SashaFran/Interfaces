class Ficha {
  constructor(jugador,id) {
    this.canvas = document.getElementById('canvasMain');
    this.ctx = canvas.getContext('2d');
    this.jugador = jugador;
    this.radio = 30;
    this.id = id;
    this.ruta="";
    if (jugador == 'player_1') {
      this.ruta = "Images/ficha_Azul.png";
    }else if (jugador == 'player_2') {
      this.ruta = "Images/ficha_Roja.png";
    }
    this.color = "rgb(255, 242, 242)";
    this.sectorFichas = [[],[],[]]
  }

  draw(ctx,posX,posY){
    ctx.beginPath();
    ctx.arc(posX,posY,this.radio,0,Math.PI * 2);
    ctx.stroke(); 
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();

    if (this.ruta!="") {
      var img = new Image();
      img.src = this.ruta;
      ctx.drawImage(img, posX-this.radio , posY-this.radio ,60,60);
    }
  }

  getJugador(){
    return this.jugador;
  }

  winner(){
    let ganador = jugadorActual.getJugador();
    if (ganador == player_1){
          swal("Ganaste Jugardor 2","\nLa alerta se cerrara y empezara una nueva partida en 3 sec.", "success");
    }else{
          swal("Ganaste Jugardor 1","\nLa alerta se cerrara y empezara una nueva partida en 3 sec.", "success");
    }

  }

  start(ctx,posX,posY){
    var img = new Image();
    img.src = this.ruta;
    img.onload = function() {
      ctx.drawImage(img,posX-this.radio,posY-this.radio,60,60);
    }
  }
}
