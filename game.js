let canvas;
let canvasContext;
let ballPosX = 50;
let ballPosY = 50;
let ballSpeedX = 5;
let ballSpeedY = 5;
let leftPaddle = 250;
let rightPaddle = 250;
const PADDLE_THICKNESS = 10;
const PADDLE_HEIGHT = 100;

function calcMousePos(evt) {
    let rect = canvas.getBoundingClientRect();
    let root = document.documentElement;
    let mouseX = evt.clientX - rect.left - root.scrollLeft;
    let mouseY = evt.clientY - rect.top - root.scrollTop;
    return {
        x:mouseX,
        y:mouseY,
    };
}

window.onload = function () {
    // Game Canvas
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    let fps = 30;
    setInterval(function() {
        moveEverything();
        drawEverything();
    }, 1000/fps);

    canvas.addEventListener('mousemove', function(evt) {
        let mousePos = calcMousePos(evt);
        if (mousePos.x < canvas.width / 2) {
            leftPaddle = mousePos.y - (PADDLE_HEIGHT / 2);    
        } else {
            rightPaddle = mousePos.y - (PADDLE_HEIGHT / 2);
        }
        
    });
}

function moveEverything() {
    ballPosX = ballPosX + ballSpeedX;
    ballPosY = ballPosY + ballSpeedY;
    if (ballPosX < 0) {
        if (ballPosY > leftPaddle && ballPosY < leftPaddle + PADDLE_HEIGHT) {
            ballSpeedX = -ballSpeedX;
        } else {
            ballReset();
        }
    }
    if (ballPosX > canvas.width) {
        if (ballPosY > rightPaddle && ballPosY < rightPaddle + PADDLE_HEIGHT) {
        ballSpeedX = -ballSpeedX;
        } else {
            ballReset();
        }
    }
    if (ballPosY > canvas.height) {
        ballSpeedY = -ballSpeedY;
    }
    if (ballPosY < 0) {
        ballSpeedY = -ballSpeedY;
    }
}

function drawEverything() {
    canvasContext.fillStyle = 'black';
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
    // Dividing Line
    colorRect(400, 50, 5, 10, 'grey');
    colorRect(400, 100, 5, 10, 'grey');
    colorRect(400, 150, 5, 10, 'grey');
    colorRect(400, 200, 5, 10, 'grey');
    colorRect(400, 250, 5, 10, 'grey');
    colorRect(400, 300, 5, 10, 'grey');
    colorRect(400, 350, 5, 10, 'grey');
    colorRect(400, 400, 5, 10, 'grey');
    colorRect(400, 450, 5, 10, 'grey');
    colorRect(400, 500, 5, 10, 'grey');
    colorRect(400, 550, 5, 10, 'grey');
    // Paddles
    colorRect(0, leftPaddle, PADDLE_THICKNESS, PADDLE_HEIGHT, 'white');
    colorRect(canvas.width - 10, rightPaddle, PADDLE_THICKNESS, PADDLE_HEIGHT, 'white');
    // Ball
    colorCircle(ballPosX, ballPosY, 10, 0, Math.PI*2, true);
}

function colorRect(x, y, w, h, color) {
    canvasContext.fillStyle = color;
    canvasContext.fillRect(x, y, w, h);
}

function colorCircle(x, y, r, color) {
    canvasContext.fillStyle = color;
    canvasContext.beginPath();
    canvasContext.arc(x, y, r, 0, Math.PI*2, true);
    canvasContext.fill();
}

function ballReset() {
    ballSpeedX = -ballSpeedX;
    ballPosX = canvas.width / 2;
    ballPosY = canvas.height / 2;
}