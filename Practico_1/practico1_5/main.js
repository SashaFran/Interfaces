"use strict";
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let width = 300;
let height = 300;
let imageData = ctx.createImageData(width, height);
let r= 0;
let g= 0;
let b= 0;
let a= 255;

function drawRect(imageData, r, g, b, a){
  for (let i = 0; i<width; i++){
    if (i < width /2){
      /*var coeficiente = 255/(width/2);*/
      r += 1;
      g += 1;
      b -= 1;
    }else{
        r += 1;
        g -= 1;
        b -= 1;
      }
      for (let j = 0 ; j < height; j++){
        setPixel(imageData,i,j,r,g,b,a)
      //Negro    0,   0,   0
      //Amarillo 255, 255, 0
      //Rojo     255, 0   ,0

//seleccionamos el alto total porque queremos que la columna entera tenga el mismo color.

    }
}
}
  function setPixel(imageData,i,j,r,g,b,a){
    let index = (i+j*imageData.width)*4;
    imageData.data[index+0] = r;
    imageData.data[index+1] = g;
    imageData.data[index+2] = b;
    imageData.data[index+3] = a;
}
drawRect(imageData, r, g, b ,a);
ctx.putImageData (imageData, 0 , 0);
