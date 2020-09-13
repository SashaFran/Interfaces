"use strict"
//    -------------------------------------------------------------------       DECLARADO DE CANVAS/CONTEXT/
let canvasMain = document.getElementById('canvasDibujo');
let ctx = canvasMain.getContext('2d');
let imageData = ctx.getImageData(0, 0, canvasMain.width, canvasMain.height);





//      -----------------------------------------------------------------       BORRADO CANVAS
document.getElementById('limpiarCanvas').addEventListener('click', borrarCanvas);
function borrarCanvas(){
    ctx.clearRect(0, 0, canvasMain.width, canvasMain.height);
}

//      ----------------------------------------------------------------        CARGADO IMAGEN
let inputCarga = document.getElementById('imagen_input');
document.getElementById("imagen_input").addEventListener('change', function(e){
    borrarCanvas();
    if (inputCarga.value != ""){
        let file = e.target.files[0];
        let reader = new FileReader();

        reader.addEventListener('load', function(evt){
            let image = new Image();
            image.addEventListener('load', function (){
                let imageAspectRatio = (1.0 * canvasMain.height)/canvasMain.width;
                let imagescaledwidth = canvasMain.width;
                let imagescaledheight = canvasMain.width * imageAspectRatio;
                ctx.drawImage(image,0,0,imagescaledwidth,imagescaledheight);
            });
            image.src = evt.target.result;
        });
        inputCarga.value="";
        reader.readAsDataURL(file);
    }
  });

  //      -------------------------------------------------------------         PINTADO / GOMA

    let strokeLine, color, pencilWidth;
  document.getElementById('goma_borrar').addEventListener('click', function(){
      strokeLine = 'round';
      color = '#fff';
      pencilWidth = 6;
      document.addEventListener('mousedown',mouseDown,false);
  	  document.addEventListener('mousemove',mouseMove,false);
  	  document.addEventListener('mouseup',mouseUp,false);
  });
  document.getElementById('lapiz').addEventListener('click', function(){
      strokeLine = 'round';
      color = '#000';
      pencilWidth = 5;
  	document.addEventListener('mousedown',mouseDown,false);
  	document.addEventListener('mousemove',mouseMove,false);
  	document.addEventListener('mouseup',mouseUp,false);
  });
    let drawed = false;
  function mouseDown(click){
      drawed = true;
      let mousePos = getMousePos(canvasMain, click);
  	  ctx.beginPath();
  	  ctx.moveTo(mousePos.x,mousePos.y);
  }

  function mouseMove(click){
      let mousePos = getMousePos(canvasMain, click);
  	   if(drawed){
          ctx.lineJoin = ctx.lineCap = strokeLine;
          ctx.strokeStyle = color;
          ctx.lineWidth = pencilWidth;
  		ctx.lineTo(mousePos.x,mousePos.y);
  		ctx.stroke();
  	}
  }

  function mouseUp(click){
  	ctx.closePath();
  	drawed = false;
  }

  function getMousePos(canvasMain, click) {
      let rect = canvasMain.getBoundingClientRect();
      return {
            x: click.clientX - rect.left,
            y: click.clientY - rect.top
      };
    }
  window.onmousemove = function (){
      let x = window.event.clientX;
      let y = window.event.clientY;
    }

//      ---------------------------------------------------------------         DESCARGA DE LA IMAGEN.
document.getElementById("btnDescarga").addEventListener('click', function(){
  let canvasImage = document.getElementById('btnDescarga');
  canvasImage.setAttribute('download', 'File_Interfaces.png');
  canvasImage.setAttribute('href', canvasMain.toDataURL("image/png").replace("image/png", "image/octet-stream"));
});

//      --------------------------------------------------------------          SETEO DE COLORES
function getR(imageData , x , y){
    let index = (x + y * imageData.width)*4;
    return imageData.data[index+0];
}
function getG(imageData , x , y){
  let  index = (x + y * imageData.width)*4;
    return imageData.data[index+1];
}
function getB(imageData , x , y){
  let index = (x + y * imageData.width)*4;
    return imageData.data[index+2];
}

function setPixel(imageData, x, y, r, g, b, a){
    let index = (x + y * imageData.width) * 4;
    imageData.data[index + 0]= r;
    imageData.data[index + 1]= g;
    imageData.data[index + 2]= b;
    imageData.data[index + 3]= a;
}

//     ---------------------------------------------------------------          FILTROS
function FiltroON(filtro){
  let image = new Image();
  image.src = canvasMain.toDataURL("image/png");
  image.onload= function (){
    let imageAspectRatio = (1.0 * canvasMain.height)/canvasMain.width;
    let imageScaledWidth = canvasMain.width;
    let imageScaledHeight = canvasMain.width * imageAspectRatio;
    ctx.drawImage(canvasMain,0,0,imageScaledWidth,imageScaledHeight);
    let imageData = ctx.getImageData(0,0,imageScaledWidth,imageScaledHeight);
        switch (filtro) {
          case 1:{
                                                //        FILTRO GRIS
            let data = imageData.data;
            for (let i = 0; i < data.length; i += 4) {
              let brightness = 0.25 * data[i] + 0.75 * data[i + 1] + 0.05 * data[i + 2];
              data[i] = brightness;
              data[i + 1] = brightness;
              data[i + 1] = brightness;
                }
            ctx.putImageData(imageData,0,0);
                      }
          break;
          case 2:{
                                //        FILTRO SEPIA
            for ( let x = 0; x < imageData.width; x++){
              for( let y = 0; y < imageData.height; y++){
                let r=getR(imageData,x,y);
                let g=getG(imageData,x,y);
                let b=getB(imageData,x,y);
                let luminosidad = .3 * r + .6 * g + .1 * b;
                r = Math.min(luminosidad + 40, 255);
                g = Math.min(luminosidad + 15, 255);
                b = luminosidad;

                setPixel(imageData,x,y,r,g,b,255);
                    }
                }
            ctx.putImageData(imageData,0,0);

          }
          break;
          case 3:{
                                //        FILTRO BLUR
                for ( let x = 0; x < imageData.width; x++){
                  for( let y = 0; y < imageData.height; y++){
                    let curpos = x * 4 + canvasMain.width * y * 4;
                      let pixels = imageData.data;
                      for (let i = 0; i < pixels.length; i += 4) {
                      pixels[i] =     pixels[i] * curpos  + 3;
                      pixels[i + 1] = pixels[i + 1] * curpos + 7;
                      pixels[i + 2] = pixels[i + 2] * curpos - 1;
                           }
                      ctx.putImageData(imageData, 0, 0);
                        }
                      }}
                break;
                case 4:{
                  //        FILTRO BRILLO
                  var option= 50;
                  let data = imageData.data;
                    for (let i = 0; i < data.length; i += 4) {
                      let brightness = 0.3 * data[i] + 0.59 * data[i + 1] + 0.11 * data[i + 2];
                      data[i]=data[i]+option;
                      data[i+1]=data[i+1]+option;
                      data[i+2]=data[i+2]+option;
                      }
                      ctx.putImageData(imageData,0,0);
                  }
                  break;

                case 5:{
                  //        FILTRO RUIDO
                  let pixels = imageData.data;
                     for (let i = 0; i < pixels.length; i += 4) {
                      let color = Math.round(Math.random() * 255);
                      pixels[i] =     pixels[i] * color / 255;
                      pixels[i + 1] = pixels[i + 1] * color / 255;
                      pixels[i + 2] = pixels[i + 2] * color / 255;
                     }
                    ctx.putImageData(imageData, 0, 0);
                  }
                break;
                case 6:{
                  //        FILTRO NEGATIVO
                  for ( let x = 0; x < imageData.width; x++){
                    for( let y = 0; y < imageData.height; y++){
                      let r=getR(imageData,x,y);
                      let g=getG(imageData,x,y);
                      let b=getB(imageData,x,y);

                      r = 255 - r;
                      g = 255 - g;
                      b = 255 - b;

                      setPixel(imageData,x,y,r,g,b,255);
                  }
              }
              ctx.putImageData(imageData,0,0);
            }
        }
    }
}
