var ctx2 = document.getElementById("myCanvas2").getContext("2d");
ctx2.fillStyle = "#d3d3d3";
let width = 100;
let height = 100;
//var imageData = ctx2.createImageData(width, height);
var imageData = ctx2.createImageData(width, height);
let r = 50;
let g = 30;
let b = 60;
let a = 255;
for (x=10; x<width; x++){
  for (y=11; y<height; y++){
    setPixel(imageData, x,y,r,g,b,a);
  }
}
ctx2.putImageData(imageData, 0, 0);

function setPixel(imagenData, x,y,r,g,b,a){
index = (x+y* imageData.width) * 4;
imageData.data[index+0] = r;
imageData.data[index+1] = g;
imageData.data[index+2] = b;
imageData.data[index+3] = a;
}
