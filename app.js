var canvas = document.getElementsByTagName("canvas")[0],
    ctx    = canvas.getContext("2d"),
    gif    = new GIFEncoder();

var W = 16, H = 16;

gif.setRepeat(0); //auto-loop
gif.setDelay(1000);
gif.setSize(W, H);
gif.start();

ctx.imageSmoothingEnabled = false;
ctx.fillStyle = "white";
ctx.fillRect(0, 0, W, H);

var mx, my, imgData = ctx.getImageData(0, 0, W, H);

canvas.addEventListener("mousemove", function(e) {
  mx = Math.round((e.offsetX - 5) / 40);
  my = Math.round((e.offsetY - 5) / 40);
});

canvas.addEventListener("click", function(e) {
  ctx.fillStyle = "black";
  ctx.fillRect(mx, my, 1, 1);
  imgData = ctx.getImageData(0, 0, W, H);
  gif.addFrame(canvas);
})

document.getElementById("addFrame").addEventListener("click", function(e) {
    var img = new Image();
    img.src = canvas.toDataURL("image/png");
    gif.addFrame(ctx);
    document.body.appendChild(img);

    // Clear

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, W, H);
    imgData = ctx.getImageData(0, 0, W, H);

});


document.getElementById("export").addEventListener("click", function(e) {
    gif.finish();
    document.getElementById('output').src = 'data:image/gif;base64,'+encode64(gif.stream().getData())
});

function render() {
  ctx.putImageData(imgData, 0, 0);
  ctx.fillRect(mx, my, 1, 1);
  requestAnimationFrame(render);
}
render();
