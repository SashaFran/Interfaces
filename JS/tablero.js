
class Tablero {
  constructor(ctx, canvasWidth, canvasHeight){
    this.ctx = ctx;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
  }

  crearTablero(){
    const FIL = 6;
    const COL = 7;
    const MAX = 42;
    let img = this.imgTablero();
    this.ctx.drawImage(img, 0, 0);
}

  imgTablero(){
    let img = new Image();
    img.src = "Images/tablero.png";
    return img;
  }

}
