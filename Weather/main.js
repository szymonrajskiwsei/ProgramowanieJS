// TO DO Wysłać do url nazwę miasta w zapytaniu

const btnAddCity = document.getElementById("btnAddCity");
const citiesDiv = document.getElementById('citiesDiv');

let cityName = "";
let opwApiKey = "50d53005c0fd5f556bb4ef15224c4209";
let url = `http://api.openweathermap.org/data/2.5/weather?q=Warszawa&APPID=${opwApiKey}`;
let citiesArray = [];
let ls = window.localStorage.getItem("cities");
if (ls == null) ls = window.localStorage.setItem("cities", citiesArray);

let http = new XMLHttpRequest();
http.addEventListener("readystatechange", httpStateChange);
//http.addEventListener("progress", httpProgressChange);
//http.addEventListener("error", httpError);

http.open("GET", url, true);
http.send();

function AddCity()
{
    cityName = document.getElementById("inputCity").value;
    
    citiesArray.push(cityName);
    url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${opwApiKey}`;  
}

function CreateCityDiv(cityInfo)
{
    let city = document.createElement("div");
    let cityName = document.createElement("p");

    city.classList.add("city");
    cityName.classList.add("cityName");

    cityName.innerHTML = cityInfo;

    city.appendChild(cityName);
    citiesDiv.appendChild(city);
}

function httpStateChange(e)
{
    console.log(`Http state change: ${e.target.readyState}`);
    console.log(`Http status code: ${e.target.status}`);

    if (e.target.readyState == "4")
    {
        console.log(e.target.responseText);
        btnAddCity.addEventListener("click", () => CreateCityDiv(e.target.responseText));
    }
}