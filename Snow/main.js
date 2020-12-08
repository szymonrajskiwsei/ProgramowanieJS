const sky = document.body;
let snowflakeCounter = 0;

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

//const x = new Snowflake();
const x = new Snowflake();;

x.CreateSnowflake();

const tab = [x]; 

/*setInterval( function(){
    if (snowflakeCounter % 2 == 0) x.CreateSnowflake();
    if (snowflakeCounter % 3 == 0) x.DeleteSnowflake();

    snowflakeCounter++;
    x.FallSnowflake();
}, 200 );*/

setInterval( function(){

    tab[0].FallSnowflake();
    console.log("hmm");

}, 500);