window.addEventListener('deviceorientation', onDeviceMove);

const board = document.querySelector('#playBoard');
const ballSpeed = 10;

let beta = 0;
let gamma = 0;
let alpha = 0;

const x = setInterval(() => {
    let ball = document.querySelector('.ball');
    let currentPosY = parseInt(ball.style.top);

    if(beta > 0)
    {
        ball.style.top = `${currentPosY + 1}px`;
    }
    else if(beta < 0)
    {
        if(ball.style.top < 0) board.removeChild(playerBall);
        ball.style.top = `${currentPosY - 1}px`;
    }
}, 10);

function onDeviceMove(ev)
{
    beta = ev.beta;
    gamma = ev.gamma;
    alpha = 0;
}

class Ball
{
    createBall()
    {
        let b = document.createElement('div');
        b.classList.add('ball');

        b.style.top = "10px";
        b.style.left = "570px";

        board.appendChild(b);
    }

    moveDown(speed)
    {
        setInterval(() => {
            let ball = document.querySelector('.ball');
            let currentPosY = parseInt(ball.style.top);
            ball.style.top = `${currentPosY + speed * 0.05}px`;
        }, 200);
    }

    moveUp(speed)
    {
        setInterval(() => {
            let ball = document.querySelector('.ball');
            let currentPosY = parseInt(ball.style.top);
            ball.style.top = `${currentPosY - speed * 0.05}px`;
        }, 200);
    }

    moveLeft(speed)
    {
        let ball = document.querySelector('.ball');
        let currentPosX = parseInt(ball.style.left);
        ball.style.left = `${currentPosX - speed}px`;
    }

    moveRight(speed = 5)
    {
        let ball = document.querySelector('.ball');
        let currentPosX = parseInt(ball.style.left);
        ball.style.left = `${currentPosX + speed}px`;
    }
}

class Hole
{
    constructor()
    {
        const min = 30;
        const maxWidth = board.clientWidth;
        const maxHeight = board.clientHeight;

        let h = document.createElement('div');
        h.classList.add('hole');

        Math.random()
        h.style.top = `${Math.floor(Math.random() * (maxHeight - min))}px`;
        h.style.left = `${Math.floor(Math.random() * (maxWidth - min))}px`;
        
        board.appendChild(h);
    }
}

const holes = [new Hole(), new Hole(), new Hole(), new Hole(), new Hole()];
const playerBall = new Ball();
playerBall.createBall();

let ball = document.querySelector('.ball');

const checkCollision = setInterval(() => {

    for(let i = 0; i < holes.length; i++)
    {
        let kulaY = (parseInt(ball.style.top) + 10);
        let kulaX = (parseInt(ball.style.left) + 10);

        let dziuraY = (parseInt(document.querySelectorAll('.hole')[i].style.top) + 30);
        let dziuraX = (parseInt(document.querySelectorAll('.hole')[i].style.left) + 30);

        if(Math.abs(kulaX - dziuraX) < 35 && Math.abs(kulaY - dziuraY) < 35)
        {
            board.removeChild(ball);
            clearInterval(checkCollision);
        }
    }
}, 100);

const timeBar = document.querySelector('.timeInfo');
let seconds = 0;
let minutes = 0;

setInterval(() => {

    if(seconds == 59)
    {
        minutes++;
        seconds = 0;
    }
    else
    {
        seconds++;
    }
    if(seconds < 10) timeBar.innerHTML = minutes + ":" + "0" + seconds;
    else timeBar.innerHTML = minutes + ":" + seconds;

}, 1000);