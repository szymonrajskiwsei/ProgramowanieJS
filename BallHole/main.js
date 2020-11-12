window.addEventListener('deviceorientation', onDeviceMove);
document.body.addEventListener('keypress', onKeyPress); // dla testów

let playerBall = document.querySelector('#ball');
const holes = document.querySelectorAll('.hole');

class Ball
{
    constructor(ball)
    {
        this.posX = ball.style.top = "10px";
        this.posY = ball.style.left = "30px";
    }

    moveUp()
    {
        return this.posY -= 10;
    }
    moveDown()
    {
        return this.posY += 10;
    }
}

function onDeviceMove(ev)
{
    console.log(ev.alpha, ev.beta, ev.gamma);
}

for(let i = 1; i <= holes.length; i++)
{
    holes[i - 1].style.top = `${(i * 80)}px`;
    holes[i - 1].style.left = `${i * 160}px`;
}

let ball = new Ball(playerBall);

function onKeyPress(ev)
{
    switch(ev.code) // ruch kulki
    {     
        case 'KeyA':

            break;

        case 'KeyW':
            ball.moveUp();
            break;
        case 'KeyS':
            ball.moveDown();
            break;
        case 'KeyD':

            break;
    }
}