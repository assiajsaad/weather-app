const form = document.querySelector("form");
const errSpan = document.querySelector(".error");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const search = document.querySelector("#search");

  if (search.value == "") {
    errSpan.textContent = "Please enter a value";
  } else {
    getWeather(search.value);

    search.value = "";
    errSpan.textContent = "";
  }
});

async function getWeather(city) {
  try {
    const data = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=4002a1d79b09491d8a9125511242604&q=${city}`,
      { mode: "cors" }
    );
    const result = await data.json();

    uiCreator(result);
  } catch (error) {}
}

function errorHandler(message) {
  const error = document.querySelector(".error");
  error.textContent = message;
}

function uiHandler(city) {
  const oldCity = document.querySelector(".city");
  if (oldCity == null) {
    document.body.appendChild(city);
  } else {
    document.body.removeChild(oldCity);
    document.body.appendChild(city);
  }
}

function uiCreator(data) {
  const name = document.querySelector(".name");
  name.textContent = data.location.name;

  const region = document.querySelector(".region");
  region.textContent = data.location.region;

  const country = document.querySelector(".country");
  country.textContent = data.location.country;

  const timeZone = document.querySelector(".timezone");
  timeZone.textContent = data.location.tz_id;

  const localTime = document.querySelector(".local-time");
  localTime.textContent = data.location.localtime;

  const lastUpdated = document.querySelector(".last-updated");
  lastUpdated.textContent = data.current.last_updated;

  const tempC = document.querySelector(".temp-c");
  tempC.textContent = data.current.temp_c;

  const tempF = document.querySelector(".temp-f");
  tempF.textContent = data.current.temp_f;

  const condition = document.querySelector(".condition");
  condition.textContent = data.current.condition.text;

  const conditionImg = document.querySelector(".condition-img");
  conditionImg.src = data.current.condition.icon;

  const humidity = document.querySelector(".humidity");
  humidity.textContent = data.current.humidity;
}
