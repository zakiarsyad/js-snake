const canvas = document.getElementById("snake");
const ctx = canvas.getContext("2d");

const gridSize = 20;

const backGround = new Image();
backGround.src = "img/backGround.png";
const food = new Image();
food.src = "img/food.png";
const scoreBoard = new Image();
scoreBoard.src = "img/scoreBoard.png";

let score = 0;
let game;

// set sound effect
const moveEffect = new Audio("audio/move.mp3");
const eatEffect = new Audio("audio/eat.mp3");
const deadEffect = new Audio("audio/dead.mp3");

let snake = [];
snake[0] = {
  x: 9 * gridSize,
  y: 14 * gridSize
};

let foodPosition = {
  x: Math.floor(Math.random() * gridSize) * gridSize,
  y: Math.floor(Math.random() * gridSize) * gridSize + 60
};

let move;

// keyboard control
document.addEventListener("keydown", function(event) {
  let key = event.keyCode;
  if (key == 37 && move != "RIGHT") {
    move = "LEFT";
    moveEffect.play();
  } else if (key == 38 && move != "DOWN") {
    move = "UP";
    moveEffect.play();
  } else if (key == 39 && move != "LEFT") {
    move = "RIGHT";
    moveEffect.play();
  } else if (key == 40 && move != "UP") {
    move = "DOWN";
    moveEffect.play();
  }
});

// touch control
let up = document.getElementById("up");
let left = document.getElementById("left");
let right = document.getElementById("right");
let down = document.getElementById("down");

up.addEventListener("click", function(event) {
  move = "UP";
  moveEffect.play();
});
left.addEventListener("click", function(event) {
  move = "LEFT";
  moveEffect.play();
});
right.addEventListener("click", function(event) {
  move = "RIGHT";
  moveEffect.play();
});
down.addEventListener("click", function(event) {
  move = "DOWN";
  moveEffect.play();
});

function collision(head, snakeBody) {
  for (let i = 1; i < snakeBody.length; i++) {
    if (head.x == snakeBody[i].x && head.y == snakeBody[i].y) return true;
  }
  return false;
}

function drawSnake() {
  // buat background, dan kosongkan layar kembali
  ctx.drawImage(backGround, 0, 60);
  ctx.drawImage(food, foodPosition.x, foodPosition.y);
  ctx.drawImage(scoreBoard, 0, 0);

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = "black";
    ctx.fillRect(snake[i].x, snake[i].y, gridSize, gridSize);

    ctx.strokeStyle = "#9BCB9B";
    ctx.strokeRect(snake[i].x, snake[i].y, gridSize, gridSize);
  }

  // posisi awal
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  // moving snake
  if (move === "LEFT") snakeX -= gridSize;
  if (move === "UP") snakeY -= gridSize;
  if (move === "RIGHT") snakeX += gridSize;
  if (move === "DOWN") snakeY += gridSize;

  // jika bertemu makanan
  if (snakeX == foodPosition.x && snakeY == foodPosition.y) {
    eatEffect.play();
    score++;

    foodPosition = {
      x: Math.floor(Math.random() * gridSize) * gridSize,
      y: Math.floor(Math.random() * gridSize) * gridSize + 60
    };
  } else snake.pop();

  // pindahkan snake yang baru
  let snakeHead = {
    x: snakeX,
    y: snakeY
  };
  snake.unshift(snakeHead);

  // jika nabrak pinggir, stop
  if (
    snakeX < 0 ||
    snakeX > 20 * gridSize - gridSize ||
    snakeY < 60 ||
    snakeY > 20 * gridSize - gridSize + 60 ||
    collision(snakeHead, snake)
  ) {
    deadEffect.play();
    clearInterval(game);
    gameOver();
  }

  // show score
  ctx.fillStyle = "black";
  ctx.font = "30px pixelregular";
  ctx.textAlign = "left";
  ctx.fillText(`SCORE : ${score}`, gridSize, 2 * gridSize);
}

function gameOver() {
  ctx.fillStyle = "black";
  ctx.font = "50px pixelregular";
  ctx.textAlign = "center";
  ctx.fillText(`GAME OVER`, 200, 250);

  ctx.fillStyle = "black";
  ctx.font = "25px pixelregular";
  ctx.textAlign = "center";
  ctx.fillText(
    `RELOAD TO
  PLAY AGAIN`,
    200,
    350
  );
}

game = setInterval(drawSnake, 200);
