window.onload = init;
var canvas, ctx;

var angleA = 0, angleB = 0, angleC = 0;
var changeA = 5, changeB = -6, changeC = 7;
var lengthA = 150, lengthB = 150, lengthC = 150;
var oldpos;

var path = true, lines = false, dots = false;

function init() {
  console.log("INIT");
  let viewportWidth = $(window).width()-$(".input-wrapper").width();
  var viewportHeight = $(window).height()-20;
  $(".canvas-wrapper").append('<canvas id="canvas" height="'+viewportHeight+'" width="'+viewportWidth+'"></canvas>');
  canvas = $("#canvas")[0];
  ctx = canvas.getContext("2d");
  ctx.translate(viewportWidth/2, viewportHeight/2);
  window.requestAnimationFrame(step);

  $("#slider-A").on("input",(evt) => {
    let val = evt.target.value/10.0;
    changeA = Number(val);
    $("#val-A").text(val);
  });
  $("#slider-B").on("input",(evt) => {
    let val = evt.target.value/10.0;
    changeB = Number(val);
    $("#val-B").text(val);
  });
  $("#slider-C").on("input",(evt) => {
    let val = evt.target.value/10.0;
    changeC = Number(val);
    $("#val-C").text(val);
  });

  $("#path-toggle").click(() => path=!path);
  $("#lines-toggle").click(() => lines=!lines);
  $("#dots-toggle").click(() => dots=!dots);
  $("#clear-button").click(() => clearCanvas());
}


function draw() {
  console.log("DRAW");
  ctx.beginPath();
  ctx.strokeStyle="#eee";
  ctx.weight=2;
  ctx.moveTo(0,0);
  let endCoords = calculateEndPos(0,0,lengthA, angleA);
  //console.log(endCoords);
  if (lines) {
    $("#lines-toggle").css("background","#223");
    ctx.lineTo(endCoords[0],endCoords[1]);
    endCoords = calculateEndPos(endCoords[0],endCoords[1],lengthB,angleB);
    ctx.lineTo(endCoords[0],endCoords[1]);
    endCoords = calculateEndPos(endCoords[0],endCoords[1],lengthC,angleC);
    ctx.lineTo(endCoords[0],endCoords[1]);
  }else{
    $("#lines-toggle").css("background","#112");
    ctx.moveTo(endCoords[0],endCoords[1]);
    endCoords = calculateEndPos(endCoords[0],endCoords[1],lengthB,angleB);
    ctx.moveTo(endCoords[0],endCoords[1]);
    endCoords = calculateEndPos(endCoords[0],endCoords[1],lengthC,angleC);
    ctx.moveTo(endCoords[0],endCoords[1]);
  }
  
  
  //
  if(oldpos == undefined){
    oldpos = endCoords;
  }else{
    if(path) {
      $("#path-toggle").css("background","#334");
      ctx.lineTo(oldpos[0], oldpos[1]);
    }else $("#path-toggle").css("background","#112");
    if(dots) {
      $("#dots-toggle").css("background","#334");
      ctx.arc(endCoords[0],endCoords[1],3,0,2*Math.PI);
    } else $("#dots-toggle").css("background","#112");
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
  draw();

  window.requestAnimationFrame(step);
}
