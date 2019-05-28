
// Variables
const squareWidth = 10;
const squareBaseColor = "#365207";
const squareStrokeColor = "#8FBB06";
const squareFoodColor= "yellow";
const speed = 10;
const canvas = document.getElementById("gameCanvas");
const width = canvas.width;
const height = canvas.height;
const ctx = gameCanvas.getContext("2d");

let x = 10;
let y = 10; 
let dy = 0;
let dx = speed;
let snakeGrowth = 4;
let snake = [];
let food = {x: 180, y: 10};

document.addEventListener("keydown", changeDirection);

// Functions
function changeDirection(event) {
    const leftKey = 37;
    const rightKey = 39;
    const upKey = 38;
    const downKey = 40;
    const keyPressed = event.keyCode;

    if (keyPressed === leftKey) {
        dx = -speed
        dy = 0;
    }
    if (keyPressed === upKey) {
        dx = 0;
        dy = -speed;
    }
    if (keyPressed === rightKey) {
        dx = speed;
        dy = 0;
    }
    if (keyPressed === downKey) {
        dx = 0;
        dy = speed;
    }
}

function drawSquare(x, y, fill) {
    ctx.font = "10px verdana"
    ctx.fillText(`Score: ${snake.length}`, 240, 25);
    ctx.fillStyle = fill;
    ctx.strokeStyle = squareStrokeColor;
    ctx.fillRect(x, y, squareWidth, squareWidth);
    ctx.strokeRect(x, y, squareWidth, squareWidth);
}

function drawSnake() {
    for( const square of snake) {
        drawSquare(square.x, square.y, squareBaseColor);
    }
}

function moveSnake() {
    snake.unshift({
        x: x + dx,
        y: y + dy
    });
    x += dx;
    y += dy;

    if(snakeGrowth > 0) {
        snakeGrowth--;
    }else {
        snake.pop();
    }
}

function drawFood() {
    drawSquare(food.x, food.y, squareFoodColor);
}

function generateRandomFood() {
    const x = Math.round((Math.random() * canvas.width) / 10) * 10;
    const y = Math.round((Math.random() * canvas.height) / 10) * 10;
    food = { x, y};
}

function foodCollide() {
    if(food.x === x && food.y === y) {
        snakeGrowth += 2;
        generateRandomFood();
    }
}

function gameOver() {
    window.alert(`Game over! Score: ${snake.length}`)
    snake = [];
    x = 10; 
    y = 10;
    dx = 10;
    dy = 0;
    snakeGrowth = 5;
    generateRandomFood();
}

function collitionDetection() {
    // walls
    if(x < 0 || x >= width || y < 0 || y >= height) {
        gameOver();
    }
    // itself
    for (let i = 4; i < snake.length; i++ ) {
        if(snake[i].x === x && snake[i].y ===y){
            gameOver();
        }
    }
}

function main() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSquare(snake.x, snake.y);
    drawSnake();
    moveSnake();
    setTimeout(main, 100);
    drawFood();
    foodCollide();
    collitionDetection();
}

main();