var canvas  = document.getElementsByTagName("canvas")[0],
    wrapper = document.getElementById("canvaswrapper"),
    ctx     = canvas.getContext("2d"),
    gif     = new GIFEncoder(),
    color   = document.getElementById("currentColor");

var W = 16, H = 16;

gif.setRepeat(0); //auto-loop
gif.setDelay(1000);
gif.setSize(W, H);
gif.start();

ctx.imageSmoothingEnabled = false;
ctx.fillStyle = "white";
ctx.fillRect(0, 0, W, H);

var mx, my, imgData = ctx.getImageData(0, 0, W, H), currentFrame = 0;

wrapper.addEventListener("mousemove", function(e) {
  mx = Math.round((e.offsetX - 5) / 40);
  my = Math.round((e.offsetY - 5) / 40);
});

wrapper.addEventListener("mouseout", function() {
  mx = -1;
  my = -1;
});

wrapper.addEventListener("click", function(e) {
  ctx.globalAlpha = 1.0;
  ctx.fillStyle = color.value;
  ctx.fillRect(mx, my, 1, 1);
  imgData = ctx.getImageData(0, 0, W, H);
  gif.addFrame(canvas);
})

document.getElementById("addFrame").addEventListener("click", function(e) {
    var img = new Image();
    img.id = "frame" + currentFrame;
    img.className = "frame";
    img.src = canvas.toDataURL("image/png");
    gif.addFrame(ctx);
    currentFrame++;
    wrapper.insertBefore(img, canvas);

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
  /*
  if(currentFrame > 0) {
    ctx.globalAlpha = 0.5;
    ctx.drawImage(document.getElementById("frame" + (currentFrame - 1)), 0, 0);
    ctx.globalAlpha = 1.0;
  }*/
  ctx.fillRect(mx, my, 1, 1);
  requestAnimationFrame(render);
}
render();
