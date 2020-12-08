let snowflakes = [50];
let canvas = document.getElementById("field");
let ctx = canvas.getContext("2d");

let height = window.innerHeight;
let width = window.innerWidth;

canvas.width = 1530;
canvas.height = 700;

class Snowflake
{
    Draw()
    {

    }

    FallDown()
    {

    }
}

window.onload = function ()
{
    let max = 10;
    
    for (var i = 0; i < max; i++) {
      snowflakes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 7 + 1,
        d: Math.random() * 100,
      });
    }
  
    function draw() {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "rgba(255,255,255,0.5)";
      ctx.beginPath();
  
      for (var i = 0; i < max; i++) {
        var s = snowflakes[i];
        ctx.moveTo(s.x, s.y);
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2, true);
      }
  
      ctx.fill();
      update();
    }
  
    var angle = 0;
    function update() {
      angle += 0.05;
      for (var i = 0; i < max; i++) {
        var s = snowflakes[i];
  
        s.y += Math.cos(angle + s.d) + 1 + s.r / 2;
        s.x += Math.sin(angle) * 2;
  
        if (s.x > width + 5 || s.x < -5 || s.y > height) {
          if (i % 3 > 0) {
            snowflakes[i] = {
              x: Math.random() * width,
              y: -10,
              r: s.r,
              d: s.d,
            };
          } else {
            if (Math.sin(angle) > 0) {
              snowflakes[i] = {
                x: -5,
                y: Math.random() * width,
                r: s.r,
                d: s.d,
              };
            } else {
              snowflakes[i] = {
                x: width + 5,
                y: Math.random() * width,
                r: s.r,
                d: s.d,
              };
            }
          }
        }
      }
    }
  
    setInterval(draw, 30);
  };

/*const sky = document.body;

class Snowflake
{
    CreateSnowflake()
    {
        let spawnRange = window.innerWidth;
        let startPositionX = Math.floor(Math.random() * spawnRange);

        let snowflake = document.createElement('canvas');
        snowflake.className = "snowflake";
        snowflake.classList.add('snowflake');
        snowflake.style.left = `${startPositionX}px`;
        sky.appendChild(snowflake);
    }

    DeleteSnowflake()
    {
        let snowflake = sky.getElementsByTagName('canvas')[0];
        sky.removeChild(snowflake);
    }

    FallSnowflake()
    {
        let allSnowflakes = sky.getElementsByTagName('canvas');
        for (let i = 0; i < allSnowflakes.length; i++)
        {
            allSnowflakes[i].style.top += `${50}px`;
        }
    }
}

setInterval( function(){
    if (snowflakeCounter % 2 == 0) x.CreateSnowflake();
    if (snowflakeCounter % 3 == 0) x.DeleteSnowflake();

    snowflakeCounter++;
    x.FallSnowflake();
}, 200 );*/
