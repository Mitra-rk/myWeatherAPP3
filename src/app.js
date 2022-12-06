function findCity(event) {
  event.preventDefault();
  let city = document.querySelector("#citySearch");

  let apiKey = "0t0f733f3454c9aobbda64f6025e69d0";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city.value}&key=${apiKey}`;

  axios.get(apiUrl).then(giveInfo);
}
let btnSearch = document.querySelector("#search");
btnSearch.addEventListener("click", findCity);

function giveInfo(response) {
  console.log(response.data);
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
  let downIcon = document.querySelector("#image");
  downIcon.setAttribute("src", response.data.condition.icon_url);
  let week = [
    "Sunday",
    "Monday",
    "Tuseday",
    "Wednsday",
    "Thirsday",
    "Friday",
    "Saturday",
  ];
  let date = new Date(response.data.time);
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
  console.log(new Date());
  console.log(time);
  console.log(new Date(1670319300) * 1000);
  console.log(response.data.time);
}
