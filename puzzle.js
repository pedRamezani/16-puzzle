"use strict"

function init() {
  setTimeout(
    function() {
      requestAnimationFrame(init);
      drawpuzzle();
  },100);
}

window.onload = function() {
  for (var l = 280; (l < window.innerWidth * 0.7) && (l < window.innerHeight * 0.7); l += 40) {
    puzzle.width = l
  }
  puzzle.height = puzzle.width;
  pieces.sort(function(a,b) {return 0.5 - Math.random();});
  puzzlesize = puzzle.width/16;
  init();
}

window.onresize = function() {
  for (var l = 280; (l < window.innerWidth * 0.7) && (l < window.innerHeight * 0.7); l += 40) {
    puzzle.width = l
  }
  puzzle.height = puzzle.width;
  puzzlesize = puzzle.width/16;
}


//Puzzle

var puzzle = document.getElementById('puzzle');
var puzzlesize;
var pctx = puzzle.getContext('2d');
var pieces = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0];
var gameover = false;
var puzx;
var puzy;
var hole;

function drawpuzzle() {
  pctx.fillStyle = "#212121";
  pctx.fillRect(0,0,puzzle.width,puzzle.height);
  for (var i = 0; i < pieces.length; i++) {
    if (gameover) {
      pctx.fillStyle = "#212121";
      pctx.fillRect(0,0,puzzle.width,puzzle.height);
      pctx.textBaseline ="middle";
      pctx.textAlign = "center";
      pctx.font = canvas.width/8 + "px Arial"
      pctx.fillStyle = "#FF4081";
      pctx.fillText("You have won!",puzzle.height/2,puzzle.width/2);
    }
    else if (pieces[i] == 0) {hole = i;}
    else {
      puzy = ((i- i % 4) / 4) * puzzle.height/4;
      puzx = (i%4 * puzzle.width/4);
      pctx.fillStyle = "#333";
      pctx.fillRect(puzx,puzy,puzzle.width/4,puzzle.height/4);
      // console.log(((i - i%4) / 4) * puzzle.height/4,(i%4 * puzzle.width/4));
      pctx.strokeStyle = "#FF4081";
      pctx.strokeRect(puzx,puzy,puzzle.width/4,puzzle.height/4);
      pctx.textBaseline ="middle";
      pctx.textAlign = "center";
      pctx.font = puzzlesize + "px Arial"
      pctx.fillStyle = "#FF4081";
      pctx.fillText(pieces[i],puzx + puzzle.height/8,puzy + puzzle.width/8);
    }
  }
}

puzzle.addEventListener("click", function(evt) {
  if (gameover) {puzzlereset();}
  else {
    var position = mouseclick(evt);
    var index = 0;
    if (position.x > puzzle.width*3/4) {index += 4}
    else if (position.x > puzzle.width*2/4) {index += 3}
    else if (position.x > puzzle.width*1/4) {index += 2}
    else {index += 1}
    if (position.y > puzzle.height*3/4) {index += 12}
    else if (position.y > puzzle.height*2/4) {index += 8}
    else if (position.y > puzzle.height*1/4) {index += 4}
    else {index += 0}
    index--;
    if ((index == hole - 1) || (index == hole + 1) || (index == hole - 4) || (index == hole + 4)){
      movepiece(index);
    }
  }
});

function mouseclick(evt) {
  var rect = puzzle.getBoundingClientRect();
  var mousex = evt.clientX - rect.left;
  var mousey = evt.clientY - rect.top;
  return {x: mousex,y: mousey};
}

function movepiece(index) {
  pieces[hole] = pieces[index];
  pieces[index] = 0;
  hole = index;
  if (pieces.toString() == "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0") {
    gameover = true;
  }
  if (pieces.toString() == "0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15") {
    gameover = true;
  }
}

function puzzlereset() {
  gameover = false;
  // pieces = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0];
  pieces.sort(function(a,b) {return 0.5 - Math.random();});
}

(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());
