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
    console.log(result);
    const ui = uiCreator(result);
    uiHandler(ui);
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
  const div = document.createElement("div");
  div.className = "city";
  const cityName = document.createElement("div");

  cityName.textContent = data.location.name;
  div.appendChild(cityName);

  return div;
}
