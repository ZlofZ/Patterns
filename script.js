window.onload = init;
var canvas, ctx;

var angleA = 0, angleB = 0, angleC = 0;
var changeA = 8.1, changeB = -11.9, changeC = 12;
var lengthA = 150, lengthB = 150, lengthC = 150;
var oldpos;

function init() {
  console.log("INIT");
  let viewportWidth = $(window).width();
  var viewportHeight = $(window).height()-4;
  $(".bodywrapper").append('<canvas id="canvas" height="'+viewportHeight+'" width="'+viewportWidth+'"></canvas>');
  canvas = $("#canvas")[0];
  ctx = canvas.getContext("2d");
  ctx.translate(viewportWidth/2, viewportHeight/2);
  window.requestAnimationFrame(step);

  $("#cA").keyup((evt) => {
      changeA = Number(evt.target.value);
  });
  $("#cB").on("keyup",(evt) => {
    changeB = Number(evt.target.value);
  });
  $("#cC").on("keyup",(evt) => {
    changeC = Number(evt.target.value);
  });

  $("#clearb").click(evt => clearCanvas());
}


function testdraw() {
  console.log("DRAW");
  ctx.beginPath();
  ctx.strokeStyle="#eee";
  ctx.weight=2;
  ctx.moveTo(0,0);
  let endCoords = calculateEndPos(0,0,lengthA, angleA);
  //console.log(endCoords);
  ctx.moveTo(endCoords[0],endCoords[1]);
  endCoords = calculateEndPos(endCoords[0],endCoords[1],lengthB,angleB);
  ctx.moveTo(endCoords[0],endCoords[1]);
  endCoords = calculateEndPos(endCoords[0],endCoords[1],lengthC,angleC);
  ctx.moveTo(endCoords[0],endCoords[1]);
  //ctx.arc(endCoords[0],endCoords[1],3,0,2*Math.PI);
  if(oldpos == undefined){
    oldpos = endCoords;
  }else{
    ctx.lineTo(oldpos[0], oldpos[1]);
    oldpos = endCoords;
  }

  //ctx.closePath();
  ctx.stroke();
}

function clearCanvas() {
  ctx.clearRect(-1000,-1000,2000,2000);
}

function updateLines() {
  angleA+=changeA;
  angleB+=changeB;
  angleC+=changeC;
}

function calculateEndPos(x,y,length, angle) {
  let x2 = (x+(length*Math.cos(degToRad(angle))));
  let y2 = (y+(length*Math.sin(degToRad(angle))));

  //console.log("x "+x2+", y "+y2);
  return [x2,y2];
}

function degToRad(degrees) {
  return degrees * (Math.PI / 180);
};

function radToDeg(rad) {
  return rad / (Math.PI / 180);
};

function step(timestamp) {
  updateLines();
  //clearCanvas();
  testdraw();

  window.requestAnimationFrame(step);
}
