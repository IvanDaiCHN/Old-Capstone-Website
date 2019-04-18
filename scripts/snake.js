//Constant Canvas
const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

//Size of a box
const box = 32;

//images
const ground = new Image();
ground.src = "img/snake-game/ground.png";

const foodImg = new Image();
foodImg.src = "img/snake-game/food.png";

//Snake

let snake = [];
snake[0] = {
    x : 9 * box,
    y : 10 * box
}

//Food
let food = {
    x : Math.floor(Math.random() * 17 + 1) * box,
    y : Math.floor(Math.random() * 15 + 3) * box
}

//score
let score = 0;

let d;

document.addEventListener("keydown", direction);

function direction(event){
    if(event.keyCode == 65 && d != "RIGHT"){
        d = "LEFT";
    }else if(event.keyCode == 87 && d != "DOWN"){
        d = "UP";
    }else if(event.keyCode == 68 && d != "LEFT"){
        d = "RIGHT";
    }else if(event.keyCode == 83 && d != "UP"){
        d = "DOWN";
    }
}

//game

function draw(){
    ctx.drawImage(ground,0,0);

    for( let i = 0; i < snake.length; i++){
        ctx.fillStyle = (i == 0)? "green" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, box,box);

        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x, snake[i].y, box,box);
    }
    ctx.drawImage(foodImg, food.x, food.y);

    //old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    //direction
    if( d == "LEFT") snakeX -= box;
    if( d == "UP") snakeY -= box;
    if( d == "RIGHT") snakeX += box;
    if( d == "DOWN") snakeY += box;

    //eating food
    if( snakeX == food.x && snakeY == food.y){
        score++;
        food = {
            x : Math.floor(Math.random() * 17 + 1) * box,
            y : Math.floor(Math.random()* 15 + 3) * box
        }
    }
    else{
        snake.pop();
    }

    let newHead = {
        x : snakeX,
        y : snakeY
    }
    //gameover
    if(snakeX < box || snakeX > 17 * box || snakeY < 3 * box || snakeY > 17 * box || collision(newHead,snake)){
        clearInterval(game);
    }
    
    function collision( head, array){
        for(let i = 0; i < array.length; i++){
            if(head.x == array[i].x && head.y == array[i].y){
                return true;
            }
        }
        return false;
    }
    

    snake.unshift(newHead);

    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText(score, 2 * box, 1.6 * box);
}

//call draw function every 100ms
let game = setInterval(draw,100);