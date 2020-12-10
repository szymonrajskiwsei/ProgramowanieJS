let cityName = "";
let opwApiKey = "50d53005c0fd5f556bb4ef15224c4209";
let url = `http://api.openweathermap.org/data/2.5/weather?q=Tarnów&APPID=${opwApiKey}`;

function AddCity()
{
    cityName = document.getElementById("inputCity").value;
    
    alert(cityName);
    alert(url);   
}

let http = new XMLHttpRequest();

http.addEventListener("readystatechange", httpStateChange);
//http.addEventListener("progress", httpProgressChange);
//http.addEventListener("error", httpError);

http.open("GET", url, true);
http.send();

function httpStateChange(e)
{
    console.log(`Http state change: ${e.target.readyState}`);
    console.log(`Http status code: ${e.target.status}`);

    if(e.target.readyState == "4")
    {
        console.log(e.target.responseText);
    }
}