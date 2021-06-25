let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Tuesday",
  "Friday",
  "Saturday"
];

let now = new Date();
let h2 = document.querySelector("h2");
let day = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();
h2.innerHTML = `${day} ${hours}:${minutes}`;

function showTemperature(response) {
  let city = document.querySelector("h1");
  city.innerHTML = response.data.name;

  celsiusTemperature = response.data.main.temp;

  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#hightemp");
  let description = document.querySelector("#temperature-description");
  temperatureElement.innerHTML = `${temperature}°C`;
  description.innerHTML = response.data.weather[0].description;

  let humidityElement = document.querySelector("#humidity-description");
  humidityElement.innerHTML = `Humidity: ${response.data.main.humidity}%`;

  let windElement = document.querySelector("#wind-description");
  windElement.innerHTML = ` Wind: ${Math.round(response.data.wind.speed)} Km/h`;

  let apiKey = "ffaccaafb0cd0bc2751c964f4b59ab9b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

//display searched city//
function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let citySearched = document.querySelector("h1");
  let city = searchInput.value.trim();
  citySearched.innerHTML = city;
  searchInput.value = "";

  let apiKey = "ffaccaafb0cd0bc2751c964f4b59ab9b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

//Geoloction//
function showPosition(position) {
  let h1 = document.querySelector("h1");
  h1.innerHTML = `Your Latitude is ${position.coords.latitude} 
  and your longitute is ${position.coords.longitude}`;
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
let button = document.querySelector("button");
button.addEventListener("click", getCurrentPosition);

//Temperature Conversion//
let celsiusTemperature = null;

function displayFahernheitTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#hightemp");
  let fahrenheitTemperature = `${(celsiusTemperature * 9) / 5 + 32}`;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let fahernheitLink = document.querySelector("#hightemp");
fahernheitLink.addEventListener("click", displayFahernheitTemp);

function displayCelsiusTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#hightemp");
  temperatureElement.innerHTML = celsiusTemperature;
}
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemp);
