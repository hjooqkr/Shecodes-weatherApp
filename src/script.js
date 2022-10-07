function formattedTime(dates) {
  let hour = dates.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = dates.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }

  let days = dates.getDay();
  let dayIndex = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = dayIndex[days];
  let date = dates.getDate();
  return `${date} ${day} ${hour}:${minute}`;
}

let now = new Date();
let today = document.querySelector("#today");
today.innerHTML = formattedTime(now);

function showWeather(response) {
  document.querySelector("#current-temp").innerHTML =
    Math.round(response.data.main.temp) + "º";
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temp-max").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#temp-min").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
}

function search(city) {
  let apiKey = "f29fc001ad97c677a130205f96332e8d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function submitting(event) {
  event.preventDefault();
  let city = document.querySelector("#city-typed").value;
  search(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", submitting);

search("New York");
