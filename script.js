window.onload = init;
var canvas, ctx;

var angleA = 0, angleB = 0, angleC = 0;
var changeA = 7, changeB = -6, changeC = 1;
var lengthA = 150, lengthB = 150, lengthC = 150;
var oldpos;

var path = true, lines = false, dots = false, clear = false;

function init() {
  console.log("INIT");
  let viewportWidth = $(window).width()-$(".input-wrapper").width();
  var viewportHeight = $(window).height()-20;
  $(".canvas-wrapper").append('<canvas id="canvas" height="'+viewportHeight+'" width="'+viewportWidth+'"></canvas>');
  canvas = $("#canvas")[0];
  ctx = canvas.getContext("2d");
  ctx.translate(viewportWidth/2, viewportHeight/2);
  window.requestAnimationFrame(step);
  

  $("#slider-A").on("input",(evt) => sliderInputHandler(evt, "A"));
  $("#slider-A").on("wheel", (evt) => sliderWheelEvHandler(evt, "A"));
  
  $("#slider-B").on("input",(evt) => sliderInputHandler(evt, "B"));
  $("#slider-B").on("wheel", (evt) => sliderWheelEvHandler(evt, "B"));
  
  $("#slider-C").on("input",(evt) => sliderInputHandler(evt, "C"));
  $("#slider-C").on("wheel", (evt) => sliderWheelEvHandler(evt, "C"));

  $("#path-toggle").click(() => path=!path);
  $("#lines-toggle").click(() => lines=!lines);
  $("#dots-toggle").click(() => dots=!dots);
  $("#clear-button").click(() => clear=!clear);
  $(canvas).on("click keyup", (evt) => {
    console.log(evt);
    if(evt.originalEvent.code=="Space" && evt.type == "keyup"){
      clearCanvas();
    }else if(evt.type == "click"){
      clearCanvas();
    }
  });
}

function sliderInputHandler(evt, sliderid) {
  let val = evt.target.value;
  switch (sliderid) {
    case "A":
      changeA = Number(val);
      $("#val-A").text(val);
      break;
    case "B":
      changeB = Number(val);
      $("#val-B").text(val);
      break;
    case "C":
      changeC = Number(val);
      $("#val-C").text(val);
      break;
    default:
      
  }
}

function sliderWheelEvHandler(evt, sliderid) {
  console.log(evt);
  let addition = evt.originalEvent.wheelDelta > 0 ? 0.1 : -0.1;
  let val = Number(evt.target.value)+addition;
  val = Math.round(val * 10) / 10;
  evt.target.value=val;
  switch (sliderid) {
    case "A":
      changeA = Number(val);
      $("#val-A").text(val);
      break;
    case "B":
      changeB = Number(val);
      $("#val-B").text(val);
      break;
    case "C":
      changeC = Number(val);
      $("#val-C").text(val);
    default:
      
  }
}

function draw() {
  console.log("DRAW");
  if(clear)clearCanvas();
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
