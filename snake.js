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

let snake = [];
snake[0] = {
  x: 9 * gridSize,
  y: 14 * gridSize
};

let foodPosition = {
  x: Math.floor(Math.random() * gridSize) * gridSize,
  y: Math.floor(Math.random() * gridSize) * gridSize + 60
};

let isGameOver = false;

let move;

document.addEventListener("keydown", function(event) {
  let key = event.keyCode;
  if (key == 37 && move != "RIGHT") {
    move = "LEFT";
  } else if (key == 38 && move != "DOWN") {
    move = "UP";
  } else if (key == 39 && move != "LEFT") {
    move = "RIGHT";
  } else if (key == 40 && move != "UP") {
    move = "DOWN";
  }
});

let up = document.getElementById("up");
let left = document.getElementById("left");
let right = document.getElementById("right");
let down = document.getElementById("down");

up.addEventListener("click", function(event) {
  move = "UP";
});
left.addEventListener("click", function(event) {
  move = "LEFT";
});
right.addEventListener("click", function(event) {
  move = "RIGHT";
});
down.addEventListener("click", function(event) {
  move = "DOWN";
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
    isGameOver = true;
    clearInterval(game);
  }

  // show score
  ctx.fillStyle = "black";
  ctx.font = "30px pixel";
  ctx.fillText(`SCORE : ${score}`, gridSize, 2 * gridSize);
}

let game = setInterval(drawSnake, 200);

function gameOver() {
  ctx.fillStyle = "black";
  ctx.font = "50px pixel";
  ctx.fillText(`GAMEOVER`, 200, 200);
}

if (isGameOver) gameOver();
