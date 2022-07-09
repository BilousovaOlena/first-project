let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let now = new Date();
let day = days[now.getDay()];
let changeDay = document.querySelector("#week-day");
changeDay.innerHTML = `${day}`;
let hours = now.getHours();
let minut = now.getMinutes();
let changeHours = document.querySelector("#hours-now");
if (hours < 10) {
  changeHours.innerHTML = `0${hours}`;
} else {
  changeHours.innerHTML = `${hours}`;
}
let changeMin = document.querySelector("#min-now");
if (minut < 10) {
  changeMin.innerHTML = `0${minut}`;
} else {
  changeMin.innerHTML = `${minut}`;
}
function showDataWeather(response) {
  console.log(response.data);
  let tempNew = Math.round(response.data.main.temp);
  let showTemp = document.querySelector("#temp-set");
  showTemp.innerHTML = `${tempNew}`;
  let myCity = response.data.name;
  let changeCity = document.querySelector("#city-now");
  changeCity.innerHTML = `${myCity}`;
  let sky = document.querySelector("#clouds-now");
  sky.innerHTML = `${response.data.weather[0].description}`;
  let changeHumidity = document.querySelector("#humidity-now");
  changeHumidity.innerHTML = `${response.data.main.humidity}%`;
  let windNew = Math.round(response.data.wind.speed);
  let changeWind = document.querySelector("#wind-new");
  changeWind.innerHTML = `${windNew} km/h`;
  let changePressure = document.querySelector("#pressure-new");
  changePressure.innerHTML = `${response.data.main.pressure} hPa`;
}

function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#type-city");
  let cityNew = searchInput.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityNew}&appid=eaf040dff7892fc80bc32a2d99e6ebec&units=metric`;

  axios.get(apiUrl).then(showDataWeather);
}
let formInp = document.querySelector("#enter-city");
formInp.addEventListener("submit", searchCity);

function showPosition(position) {
  console.log(position);
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=eaf040dff7892fc80bc32a2d99e6ebec&units=metric`;
  axios.get(apiUrl).then(showDataWeather);
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let buttonCur = document.querySelector("#button-current");
buttonCur.addEventListener("click", getCurrentPosition);
