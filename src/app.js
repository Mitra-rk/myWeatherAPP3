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
}
