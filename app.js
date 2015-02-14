var canvas  = document.getElementsByTagName("canvas")[0],
    wrapper = document.getElementById("canvaswrapper"),
    ctx     = canvas.getContext("2d"),
    gif     = new GIFEncoder(),
    color   = document.getElementById("currentColor");

var W = 32, H = 32;

gif.setRepeat(0); //auto-loop
gif.setDelay(1000);
gif.setSize(W, H);
gif.start();

ctx.imageSmoothingEnabled = false;
ctx.fillStyle = "white";
ctx.fillRect(0, 0, W, H);

var mx, my, imgData = ctx.getImageData(0, 0, W, H), currentFrame = 0;

wrapper.addEventListener("mousemove", function(e) {
  mx = Math.round((e.offsetX - 5) / 20);
  my = Math.round((e.offsetY - 5) / 20);
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
});

function addFrame() {
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
}

document.getElementById("addFrame").addEventListener("click", addFrame);
document.body.addEventListener("keyup", function(e) {
  if(e.keyCode == 32) addFrame();
});
document.body.addEventListener("keydown", function(e) {
  if(e.keyCode == 32) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }
});

document.getElementById("export").addEventListener("click", function(e) {
    gif.finish();
    window.open('data:image/gif;base64,'+encode64(gif.stream().getData()));
});

function render() {
  ctx.putImageData(imgData, 0, 0);
  ctx.fillStyle = color.value;
  ctx.fillRect(mx, my, 1, 1);
  requestAnimationFrame(render);
}
render();
