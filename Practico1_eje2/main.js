//pedimos al document por id.
var ctx = document.getElementById("myCanvas").getContext("2d");
//usamos el contexto para pintarlo, en este caso de rojo. RGBA
ctx.fillStyle = "#ff0000";
//al contexto, le decimo pintalo en cordenadas.
//empieza a dibujar en el 20, 20 de la pagina. Para cambiar, agrandamos
//el canvas.
ctx.fillRect(0,0,150,150);
