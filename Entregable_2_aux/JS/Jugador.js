class Jugador {
  constructor(jugador) {
    this.canvas = document.getElementById('canvasMain');
    this.ctx = canvas.getContext('2d');
    this.jugador = jugador;
    this.fichas = [];
    this.posPiloteY = 110;
    if (this.jugador == 'player_1') {
      this.posPiloteX = 110;
    }else {
      this.posPiloteX = this.canvas.width-110;
    }
    this.startGame();
  }

  startGame(){
    for (var i = 0; i < 32; i++) {
      var ficha = new Ficha(this.jugador,this.jugador+i);
      this.fichas.push(ficha);
      ficha.draw(ctx,this.posPiloteX,this.posPiloteY);
    }
  }

  tituloJugadores(){
  if (this.jugador == "player_1") {
    document.getElementById('J1').innerHTML = "Tu turno!";
    document.getElementById('J2').innerHTML = "Jugador 2";
  }else{
    document.getElementById('J2').innerHTML = "Ahora es tu turno!";
    document.getElementById('J1').innerHTML = "Jugador 1";
  }
  }

  getCantFichas(){
    return this.fichas.length-1;
  }

  getFicha(){
    if (this.fichas.length>-1) {
      return this.fichas.pop();
    }
  }

  getJugador(){
    return this.jugador;
  }

  drawFicha(jugadorActual){
    var cant = 0;
    if (this.jugador == jugadorActual) {
      cant = this.fichas.length-1;
    }else{
      cant = this.fichas.length;
    }

    for (var i = 0; i < cant; i++) {
      this.fichas[i].draw(this.ctx,this.posPiloteX,this.posPiloteY);
    }
  }


}
