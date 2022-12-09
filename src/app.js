var degree = 0;

function findCity(event) {
  event.preventDefault();
  let city = document.querySelector("#citySearch");

  let apiKey = "0t0f733f3454c9aobbda64f6025e69d0";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city.value}&key=${apiKey}`;

  axios.get(apiUrl).then(giveInfo);
}

function giveInfo(response) {
  let citySearch = document.querySelector("#city");
  citySearch.innerHTML = response.data.city;
  let currentWind = document.querySelector("#wind");
  currentWind.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} Km/h`;
  let currentHumidity = document.querySelector("#humid");
  currentHumidity.innerHTML = `Humidity: ${response.data.temperature.humidity} %`;
  let currentCondition = document.querySelector("#condition");
  currentCondition.innerHTML = response.data.condition.description;
  let currentTemp = document.querySelector("#temprature");
  currentTemp.innerHTML = Math.round(response.data.temperature.current);
  degree = Math.round(response.data.temperature.current);

  let downIcon = document.querySelector("#image");
  downIcon.setAttribute("src", response.data.condition.icon_url);
  let week = [
    "Sunday",
    "Monday",
    "Tuseday",
    "Wednsday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let date = new Date(response.data.time * 1000);
  let day = week[date.getDay()];
  let hour = date.getHours();
  let min = date.getMinutes();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  if (min < 10) {
    min = `0${min}`;
  }
  let currentDay = document.querySelector("#day");
  currentDay.innerHTML = `Last updated at :${day} ${hour}:${min}`;
}

function convertTOfara() {
  let fara = degree * 1.8 + 32;
  let convertedTemp = document.querySelector("#temprature");
  convertedTemp.innerHTML = Math.round(fara);
  cantiItem.classList.add("active");
  faraItem.classList.remove("active");
}
function convertTOcanti() {
  let convertedTemp = document.querySelector("#temprature");
  convertedTemp.innerHTML = degree;
  cantiItem.classList.remove("active");
  faraItem.classList.add("active");
  cantiItem.ena;
}
let btnSearch = document.querySelector("#search");
btnSearch.addEventListener("click", findCity);

let cantiItem = document.querySelector("#canti");
let faraItem = document.querySelector("#fara");
faraItem.addEventListener("click", convertTOfara);
cantiItem.addEventListener("click", convertTOcanti);

function makeCoulmns(sample) {
  let days = ["Sun", "Mon", "Tus", "Wed", "Thu", "Fri", "Sat"];
  days.forEach(function (days, index) {
    if (index < 6) {
      copyCol.innerHTML =
        copyCol.innerHTML +
        `<div class="col-2" id="">
               <div>${days}</div>
                <img id="forecastImg"></img>
                <div> 
                <span id="max">b</span>
                <span id="min">k</span>
                </div>
            </div>`;
    }
  });
}
let copyCol = document.querySelector("#columns");

makeCoulmns(copyCol);
