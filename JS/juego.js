class Juego {
  jugar(jTurno, jNoTurno, tablero){
       //el primer turno arranca por el rojo
       //anuncia el ganador una ficha despues colocada
      this.turnoJugador(jTurno, jNoTurno, tablero);
      this.colocarFicha(jTurno, jNoTurno, tablero);
      if(fichaCont>6){
      this.ganador(jTurno);
       }


   }



  turnoJugador(jTurno, jNoTurno, tablero){
   this.desahabilitarFichas(jTurno, jNoTurno);
   }

     desahabilitarFichas(jTurno, jNoTurno){
       jNoTurno.desactivarFichas(0);
       }

   colocarFicha(j1, j2, tablero){
       let i  =0;
       let fil=0;

   canvas.addEventListener("mousedown", function (e) {
     j1.eventoDown(i, e);
       //j1.activarFichas(i);
   });
   canvas.addEventListener("mousemove", function (e) {
     j1.eventoMove(i, e);

   });
   canvas.addEventListener("mouseup", function(e) {
    j1.eventoUp(i, e);
    let col=0;
   if(j1.obtenerPosX(i)>=0&&j1.obtenerPosX(i)<85){
       col=0;
   }else{
       if(j1.obtenerPosX(i)>=85&&j1.obtenerPosX(i)<185){
           col=1;
       }else{
           if(j1.obtenerPosX(i)>=185&&j1.obtenerPosX(i)<315){
               col=2;
           }else{
               if( j1.obtenerPosX(i)>=315&&j1.obtenerPosX(i)<435){
                   col=3;
               }else{
                   if(j1.obtenerPosX(i)>=435&&j1.obtenerPosX(i)<560){
                       col=4;
                   }else{
                       if(j1.obtenerPosX(i)>=540&&j1.obtenerPosX(i)<640){
                           col=5;
                       }else{
                        if(j1.obtenerPosX(i)>=640&&j1.obtenerPosX(i)<785){
                           col=6;
                        }
                       }
                   }
               }
           }
       }
   }

    let rect = canvas.getBoundingClientRect();
     let cX = e.clientX-rect.left;
     let cY = e.clientY-rect.top;
     let d1= Math.sqrt(Math.pow(cX-j1.obtenerPosX(i),2)+Math.pow(cY-j1.obtenerPosY(i),2));
     let d2 = Math.sqrt(Math.pow(cX-tablero.getPosX(fil, col),2)+Math.pow(cY-tablero.getPosY(fil, col),2));
     let dist= d1+d2;
     if(dist<j1.obtenerRadio(i)+tablero.getRadio(fil, col)){
      juego.cambioFicha(col, j1, j2, i, tablero);
     }
   });
}




    cambioFicha(col, j1, j2, i, tablero){
      let fil = MAXFIL-1;
      while(fil>=0&&tablero.getOcup(fil, col)!="libre"){
          fil--;
      }
       let imagenNueva = new Image();
       imagenNueva.src ="images/Fondo.jpg";
       imagenNueva.onload = function(){
       drawTablero[fil][col]=(new Casillero(tablero.getPosX(fil, col),tablero.getPosY(fil, col),tablero.getRadio(fil, col),imagenNueva, j1.getColourChip(i), "ocupado"));
       tablero.draw(fil, col);
       fil=MAXFIL-1;
}
           j1.fichasJugador.splice(i, 1);
           this.nuevoCanvas(j1, j2);
       fichaCont++;

       this.jugar(j2, j1, tablero);

   }


   nuevoCanvas(j1, j2){
    ctx.fillStyle = "blue";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let j = 0; j <j2.fichasJugador.length; j++) {
            j2.fichasJugador[j].draw();
           }

   for (let i = 0; i <j1.fichasJugador.length; i++) {
        j1.fichasJugador[i].draw();
       }


       for (let fil = 0; fil < MAXFIL; fil++) {
           for (let col = 0; col < MAXCOL; col++) {
           drawTablero[fil][col].draw();
           }
           }


   }

  ganador(j1){
   let contador = 1;
   let col = 0;
   for(let fil=MAXFIL-1;fil>=0;fil--){
     while ((tablero.getOcup(fil, col)!="libre")&&(tablero.getOcup(fil, col+1)!="libre")&&(col<MAXCOL)){
       if(tablero.obtenerColor(fil, col)==tablero.obtenerColor(fil, col+1)){
         contador++;
         if(contador==4){
         this.hayGanador(j1);
         fil=0;
         col=MAXCOL;
       }
       }else{
         contador=1;
       }

       col++;

       if(contador==1){
         this.recorrerVerticalmente(j1);
       }
     }
   }

}
}
