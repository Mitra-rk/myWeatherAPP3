var degree = 0;

function findCity(event) {
  event.preventDefault();
  let city = document.querySelector("#citySearch");

  let apiKey = "0t0f733f3454c9aobbda64f6025e69d0";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city.value}&key=${apiKey}`;

  axios.get(apiUrl).then(giveInfo);
}
let lon = 52.5727236;
let lat = 28.845604;

function giveInfo(response) {
  lat = response.data.coordinates.latitude;
  lon = response.data.coordinates.longitude;

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

  let downIcon = document.querySelector("#weatherImage");
  downIcon.setAttribute("src", response.data.condition.icon_url);
  document.getElementById("weatherImage").style.display = "block";
  document.getElementById("cf").style.display = "inline";
  document.getElementById("canti").style.display = "inline";

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

  takeInfo(lon, lat);
}

function takeInfo(lon, lat) {
  let apiKey = "0t0f733f3454c9aobbda64f6025e69d0";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${lon}&lat=${lat}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(makeCoulmns);
}

let btnSearch = document.querySelector("#search");
btnSearch.addEventListener("click", findCity);

function formatDate(timeStamp) {
  let week = ["Sun", "Mon", "Tus", "Wed", "Thu", "Fri", "Sat"];
  let date = new Date(timeStamp * 1000);
  let day = date.getDay();

  return week[day];
}

function makeCoulmns(response) {
  let dailyArray = response.data.daily;

  let forecast1 = `<div class="row" id="row">`;

  dailyArray.forEach(function (forecast, index) {
    if (index < 6) {
      forecast1 =
        forecast1 +
        `<div class="col-2" id="col">
               <div id="day-forecast">${formatDate(dailyArray[index].time)}</div>
                <img id="img-forecast" src="${
                  dailyArray[index].condition.icon_url
                }" id="forecastImg"></img>
                <div id="max-min"> 
                <span id="max">${Math.round(
                  dailyArray[index].temperature.maximum
                )}°</span>
                <span id="min">${Math.round(
                  dailyArray[index].temperature.minimum
                )}°</span>
                </div>
            </div>`;
    }
  });
  forecast1 = forecast1 + `</div>`;
  let forecastElement = document.querySelector("#forecast");

  forecastElement.innerHTML = forecast1;
}
