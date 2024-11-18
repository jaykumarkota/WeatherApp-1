const searchBtn = document.querySelector(".search-btn");
const searchInput = document.querySelector(".search-input");
const container = document.querySelector(".container");
const weatherDetails = document.querySelector(".wheather-details");
// const weatherDetailsImg = document.querySelector(".wheather-img");
const humWind = document.querySelector(".hum-wind");
const apiKey = `c291dc923f5927d31e69cf33a772b554`;
const error404Msg = document.querySelector(".error-404");
// const city = `hyderabad`;

function createAPIURL() {
  let city = searchInput.value;
  if (city === "") {
    return;
  }
  const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  checkWheather(apiURL);
}

searchBtn.addEventListener("click", () => {
  createAPIURL();
});

// searchInput.addEventListener('event', callbackfun);
searchInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    createAPIURL();
  }
});

async function checkWheather(apiURL) {
  const response = await fetch(apiURL);
  let data = await response.json();
  console.log(data);

  if (data.cod == "404") {
    weatherDetails.style.display = "none";
    humWind.style.display = "none";
    error404Msg.style.display = "block";
    error404Msg.classList.add("fade-in");
    container.style.height = "600px";
    return;
  }
  weatherDetails.classList.add("fade-in");
  humWind.classList.add("fade-in");

  humWind.style.display = "flex";
  weatherDetails.style.display = "block";
  error404Msg.style.display = "none";
  container.style.height = "600px";

  let weatherImg = document.querySelector(".wheather-img");
  document.querySelector(".temparature").innerHTML = Math.round(data.main.temp);
  document.querySelector(".temparature-name").innerHTML = data.weather[0].main;
  document.querySelector(".hum-percentage").innerHTML =
    data.main.humidity + `%`;
  document.querySelector(".wind-speed").innerHTML = data.wind.speed + ` Km/h`;

  switch (data.weather[0].main) {
    case "Haze":
      weatherImg.src = "images/haze.png";
      break;
    case "Clear":
      weatherImg.src = "images/clear.png";
      break;
    case "Clouds":
      weatherImg.src = "images/clouds.png";
      break;
    case "Drizzle":
      weatherImg.src = "images/drizzle.png";
      break;
    case "Mist":
      weatherImg.src = "images/mist.png";
      break;
    case "Rain":
      weatherImg.src = "images/rain.png";
      break;
    case "Snow":
      weatherImg.src = "images/snow.png";
      break;
    case "Smoke":
      weatherImg.src = "images/smoke.png";
      break;
    default:
      weatherImg.src = "";
      break;
  }
}
