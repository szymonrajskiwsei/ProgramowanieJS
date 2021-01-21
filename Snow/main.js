const field = document.getElementById('field');
const ctx = field.getContext('2d');

field.width = window.innerWidth;
field.height = window.innerHeight;

class Snowflake
{
    constructor(diameter, quantity)
    {
        this.snowflakes = [];
        this.diameter = diameter;
        this.speed = 0;
        this.quantity = quantity;
        this.draw();
    }

    draw()
    {
        for (let i = 0; i < this.quantity; i++)
        {
            let x = Math.floor(Math.random() * window.innerWidth);
            let y = Math.floor(Math.random() * window.innerHeight);

            ctx.beginPath();
            this.snowflakes.push({x, y, shift: (Math.random() * 4) - 2, speed: (Math.random() * 2) + 3});
            
            ctx.arc(this.snowflakes[i].x, this.snowflakes[i].y, this.diameter, 0, (Math.PI * 2), true);
            ctx.fillStyle = 'white';
            ctx.fill();
        }        
    }

    moveDown()
    {
        ctx.clearRect(0, 0, innerWidth, innerHeight);

        for (let i = 0; i < this.snowflakes.length; i++)
        {
            ctx.beginPath();
            ctx.arc(this.snowflakes[i].x += this.snowflakes[i].shift,
                    this.snowflakes[i].y += this.snowflakes[i].speed,
                    this.diameter, 0, (Math.PI * 2), true);

            ctx.fillStyle = 'white';
            ctx.fill();
        }
    }

    moveToUp()
    {
        for (let i = 0; i < this.snowflakes.length; i++)
        {
            if (this.snowflakes[i].y >= field.height)
            {
                this.snowflakes[i].y = -15;
            }
        }
    }

    movementToTheSide()
    {
        for (let i = 0; i < this.snowflakes.length; i++)
        {
            if (this.snowflakes[i].x < -10) this.snowflakes[i].x = field.width + 10;
            if (this.snowflakes[i].x > field.width + 10) this.snowflakes[i].x = -10;
        }
    }
}

const snowflake = new Snowflake(5, 100);
setInterval(() => {
    snowflake.moveDown();
    snowflake.moveToUp();
    snowflake.movementToTheSide();
}, 20);
