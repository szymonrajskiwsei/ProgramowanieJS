const board = document.getElementById('board');
board.width = window.innerWidth / 2;
board.height = window.innerHeight / 2;

let beta = 0;
let gamma = 0;
let alpha = 0;

const ctx = board.getContext('2d');
let game = true;

class Ball
{
    constructor(speed, diameter, x, y)
    {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.diameter = diameter;
    }

    draw()
    {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.diameter / 2, 0, Math.PI * 2, true);
        ctx.fillStyle = 'red';
        ctx.fill();
    }

    move()
    {
        this.x += gamma * 0.05;
        this.y += beta * 0.05;
    }

    checkAngle(ev)
    {
        beta = ev.beta;
        gamma = ev.gamma;
        alpha = ev.alpha;
    }
}

class Hole
{
    constructor(diameter, quantity)
    {
        this.board = board;
        this.holes = [];
        this.diameter = diameter;
        this.quantity = quantity;
    }

    draw()
    {
        for (let i = 0; i < this.quantity; i++)
        {
            let x = Math.floor(Math.random() * window.innerWidth / 2);
            let y = Math.floor(Math.random() * window.innerHeight / 2);

            ctx.beginPath();
            this.holes.push({x, y, diameter: this.diameter, shift: (Math.random() * 6) - 3, speed: Math.random() + 1});
            
            ctx.arc(this.holes[i].x, this.holes[i].y, this.diameter / 2, 0, (Math.PI * 2), true);
            ctx.fillStyle = 'black';
            ctx.fill();
        }

        console.log(this.holes);
    }

    move()
    {
        for (let i = 0; i < this.holes.length; i++)
        {
            if (this.holes[i].y > window.innerHeight / 2 + 15) this.holes[i].y = -15;

            if (this.holes[i].x < -15) this.holes[i].x = window.innerWidth / 2 + 15;
            if (this.holes[i].x > window.innerWidth / 2 + 15) this.holes[i].x = -15;

            ctx.beginPath();
            ctx.arc(this.holes[i].x += this.holes[i].shift,
                    this.holes[i].y += this.holes[i].speed,
                    this.diameter / 2, 0, (Math.PI * 2), true);

            ctx.fillStyle = 'black';
            ctx.fill();           
        }
    }

    checkCollision(ball)
    {
        let ballXCenter = ball.x + ball.diameter / 2;
        let ballYCenter = ball.y + ball.diameter / 2;

        for (let i = 0; i < this.holes.length; i++)
        {
            let distanse = Math.sqrt(Math.pow(ballXCenter - this.holes[i].x + 7.5, 2) + Math.pow(ballYCenter - this.holes[i].y + 7.5, 2));
            if (distanse <= ball.diameter / 2 + this.holes[i].diameter / 2)
            {
                console.log('wpadło');
                game = false;
            }
        }
    }
}

const ball = new Ball(2, 10, board.width / 2, board.height / 2);
const hole = new Hole(30, 6);

hole.draw();

setInterval(() => {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    if (game)
    {
        ball.draw();
        ball.move();
        hole.move();
        hole.checkCollision(ball);
    }   
}, 20);

window.addEventListener('deviceorientation', ev => ball.checkAngle(ev));
