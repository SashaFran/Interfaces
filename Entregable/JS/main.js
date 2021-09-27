"use strict"
//    -------------------------------------------------------------------       DECLARADO DE CANVAS/CONTEXT/
let canvasMain = document.getElementById('canvasDibujo');
let ctx = canvasMain.getContext('2d');
let imageData = ctx.getImageData(0, 0, canvasMain.width, canvasMain.height);
let imageDatarestore = ctx.getImageData(0, 0, canvasMain.width, canvasMain.height);


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
                imageDatarestore = ctx.getImageData(0, 0, canvasMain.width, canvasMain.height);
            });
            image.src = evt.target.result;
            saveBefore(imageDatarestore);
        });
        inputCarga.value="";
        reader.readAsDataURL(file);


    }
  });

  function saveBefore(){
    ctx.putImageData(imageDatarestore,0,0);
      //image.src= .target.result;
    }


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
/*document.getElementById("btnDescarga").addEventListener('click', function(){
  let canvasImage = document.getElementById('btnDescarga');
//  canvasImage.setAttribute('download', 'File_Interfaces.png');
  //canvasImage.setAttribute('href', canvasMain.toDataURL("image/png").replace(/^data:image\/[^;]/, 'data:application/octet-stream'));
//  canvasImage.setAttribute('href', canvasMain.toDataURL("image/png").replace(/^data:image\/[^;]/, 'data:application/octet-stream'));


}
});*/
function descargar_Imagen(){

 let value = prompt("Ingrese nombre del archivo a guardar junto a su extension (.png/.jpg/.jpge): (png por defecto)");
 let canvasImage = document.getElementById('btnDescarga');
 if (value!= null){
 if (value.includes(".png")){
   canvasImage.setAttribute('download', value );
   canvasImage.setAttribute('href', canvasMain.toDataURL("image/png").replace(/^data:image\/[^;]/, 'data:application/octet-stream'));
 }else if(value.includes(".jpg")){
   canvasImage.setAttribute('download', value );
   canvasImage.setAttribute('href', canvasMain.toDataURL("image/jpg").replace(/^data:image\/[^;]/, 'data:application/octet-stream'));
 }else if(value.includes(".jpge")){
   canvasImage.setAttribute('download', value );
   canvasImage.setAttribute('href', canvasMain.toDataURL("image/jpge").replace(/^data:image\/[^;]/, 'data:application/octet-stream'));
 }else{
   canvasImage.setAttribute('download', value + '.png');
   canvasImage.setAttribute('href', canvasMain.toDataURL("image/png").replace(/^data:image\/[^;]/, 'data:application/octet-stream'));
 }}else{
   return
 }

//  canvasImage.setAttribute('href', canvasMain.toDataURL("image/png").replace(/^data:image\/[^;]/, 'data:application/octet-stream'));

}

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
let filterActive = false;
function FiltroON(filtro){
  let image = new Image();
  image.src = canvasMain.toDataURL("image/png");
      image.addEventListener('load', function()  {
    let imageAspectRatio = (1.0 * canvasMain.height)/canvasMain.width;
    let imageScaledWidth = canvasMain.width;
    let imageScaledHeight = canvasMain.width * imageAspectRatio;
    ctx.drawImage(canvasMain,0,0,imageScaledWidth,imageScaledHeight);
    let imageData = ctx.getImageData(0,0,imageScaledWidth,imageScaledHeight);


  if(!filterActive){
    while(!filterActive){
        switch (filtro) {
          case 1:{
                                              //        FILTRO GRIS
            let data = imageData.data;
            for (let i = 0; i < data.length; i += 4) {
              let brightness = 0.25 * data[i] + 0.75 * data[i + 1] + 0.05 * data[i + 2];
          //  let brightness = ((data[i] + data[i+1] + data[i+2])/3);
              data[i] = brightness;
              data[i + 1] = brightness;
              data[i + 2] = brightness;
                }
            ctx.putImageData(imageData,0,0);
            filterActive = true;
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
            filterActive = true;
          }
          break;

          case 3:{
                                //        FILTRO BLUR
            let mat = [1 / 9, 1 / 9, 1 / 9,
                       1 / 9, 1 / 9, 1 / 9,
                       1 / 9, 1 / 9, 1 / 9];
            let size = Math.sqrt(mat.length);
            let half = Math.floor(size / 2);

            let inputData = ctx.getImageData(0, 0, canvasMain.width, canvasMain.height).data;
            let data = imageData.data;
            for (let j = 0; j < canvasMain.width; j++) {
                for (let i = 0; i < canvasMain.height; i++) {
                      let r = 0;
                      let g = 0;
                      let b = 0;
                      for (let y = 0; y < size; y++) {
                        for (let x = 0; x < size; x++) {
                            let weight = (mat[y * size + x]);
                            let neighborY = Math.min(canvasMain.height - 1, Math.max(0, i + y - half));
                              let neighborX = Math.min(canvasMain.width  - 1, Math.max(0, j + x - half));
                              let inputIndex = (neighborY * canvasMain.width + neighborX) * 4;
                              r += inputData[inputIndex] * weight;
                              g += inputData[inputIndex + 1] * weight;
                              b += inputData[inputIndex + 2] * weight;
                          }
                      }
              let outputIndex = ((i * canvasMain.width + j) * 4);
              data[outputIndex] = r;
              data[outputIndex + 1] = g;
              data[outputIndex + 2] = b;
                    }
                  }
              ctx.putImageData(imageData,0,0);
              filterActive = true;
            }
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
                      filterActive = true;
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
                    filterActive = true;
                  }
                break;

            case 6:{
                  //       FILTRO NEGATIVO
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
                    filterActive = true;
                  }
                  break;

              case 7:{
                          //            FILTRO SATURACION
            let mat = [1 / 9, 1 / 9, 1 / 9,
                       1 / 9, 1 / 9, 1 / 9,
                       1 / 9, 1 / 9, 1 / 9];
            let size = Math.sqrt(mat.length);
            let half = Math.floor(size / 2);

            let inputData = ctx.getImageData(0, 0, canvasMain.width, canvasMain.height).data;
            let data = imageData.data;
            for (let j = 0; j < canvasMain.width; j++) {
              for (let i = 0; i < canvasMain.height; i++) {

          let r = 0;
          let g = 0;
          let b = 0;

          for (let y = 0; y < size; y++) {
              for (let x = 0; x < size; x++) {
                  let weight = (mat[y * size + x]*2);
                  let neighborY = Math.min(canvasMain.height - 1, Math.max(0, i + y - half));
                  let neighborX = Math.min(canvasMain.width  - 1, Math.max(0, j + x - half));
                  let inputIndex = (neighborY * canvasMain.width + neighborX) * 4;
                  r += inputData[inputIndex] * weight;
                  g += inputData[inputIndex + 1] * weight;
                  b += inputData[inputIndex + 2] * weight;
                }
              }
              let outputIndex = ((i * canvasMain.width + j) * 4);
              data[outputIndex] = r;
              data[outputIndex + 1] = g;
              data[outputIndex + 2] = b;
              }
            }
          ctx.putImageData(imageData, 0, 0);
          filterActive = true;
        }
        break;
}
}
}else{
  comrpobarFiltro();
}
    });
  }
    function comrpobarFiltro() {

            if (imageData) {
                if (filterActive) {
                    filterActive = false;
                    saveBefore(imageData);
                }
                else {

                  //  ctx.clearRect(0, 0, canvasMain.width, canvasMain.height);
                }
            }
        }
