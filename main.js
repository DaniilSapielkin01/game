let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let MassRect = [];
let time, animation;
let cheked = 0;
let outGame = 0;
let colors = [
  "red",
  "blue",
  "green",
  "orange",
  "aqua",
  "violet",
  "black",
  "yellow",
  "gray"
];

let btnStart = (document.getElementById("btn-start").onclick = function() {
  MassRect = [];
  cheked = 0;
  outGame = 0;
  pointScore.innerText = cheked;
  pointLose.innerText = outGame;
  newRect();
  animated();
});

let btnStop = (document.getElementById("btn-stop").onclick = function() {
  cancelAnimationFrame(animation);
  clearTimeout(time);
  clearCanvas();
});

let clickArea = (document.getElementById("canvas").onclick = function(event) {
  for (let i = 0; i < MassRect.length; i++) {
    if (
      MassRect[i].x < event.clientX - canvas.offsetLeft &&
      MassRect[i].x + 60 > event.clientX - canvas.offsetLeft &&
      event.clientY - canvas.offsetTop < MassRect[i].y + 30 &&
      event.clientY - canvas.offsetTop > MassRect[i].y
    ) {
      MassRect[i].y = 500;
      cheked++;
      pointScore.innerText = cheked;
    }
  }
});

let pointScore = document.getElementById("score");
let pointLose = document.getElementById("lose");
let resultGame = document.getElementById("result");

class Rect {
  constructor() {
    this.x = Math.round(Math.random() * 500);
    this.y = 0;
    this.w = 20;
    this.h = 20;
    this.color = colors[Math.round(Math.random() * colors.length)];
    this.speedRect = Math.round(Math.random() * 2 + 0.5);
  }
  Draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }
}

let newRect = function() {
  newElement = new Rect();
  MassRect.push(newElement);
  time = setTimeout(() => newRect(), 1500);
};

let moveRect = function() {
  for (let i = 0; i < MassRect.length; i++) {
    MassRect[i].y += MassRect[i].speedRect;
  }
};

let deleteRect = function() {
  for (let i = 0; i < MassRect.length; i++) {
    if (MassRect[i].y >= 529) {
      // debugger;
      if (MassRect[i].y <= 530) {
        // debugger;
        outGame++;
        pointLose.innerText = outGame;
      }
      MassRect.splice(i, 1);
    }
  }
};

let clearCanvas = function() {
  ctx.clearRect(0, 0, 500, 500);
  MassRect = [];
};

let chekResult = function() {
  if (cheked >= 5 || outGame >= 5) {
    btnStop();
  }
  if (cheked >= 5) {
    resultGame.innerText = "You win !";
    setTimeout(() => (resultGame.innerText = ""), 1500);
  }
  if (outGame >= 5) {
    resultGame.innerText = "You lose ! ";
    setTimeout(() => (resultGame.innerText = ""), 1500);
  }
};

function animated() {
  ctx.clearRect(0, 0, 500, 500);
  moveRect();
  deleteRect();
  chekResult();

  for (let i = 0; i < MassRect.length; i++) {
    MassRect[i].Draw(ctx);
  }
  animation = requestAnimationFrame(animated);
}
