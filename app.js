const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");

search.addEventListener("click", () => {
  const APIKey = "16aef503fb4a8a8ca77449b134a07bfb";
  const city = document.querySelector(".search-box input").value;

  if (city === "") return;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.cod === "404") {
        container.style.height = "400px";
        weatherBox.style.display = "none";
        weatherDetails.style.display = "none";
        error404.style.display = "block";
        error404.classList.add("fadeIn");
        return;
      }

      error404.style.display = "none";
      error404.classList.remove("fadeIn");

      const image = document.querySelector(".weather-box img");
      const temperature = document.querySelector(".weather-box .temperature");
      const description = document.querySelector(".weather-box .description");
      const humidity = document.querySelector(
        ".weather-details .humidity span"
      );
      const wind = document.querySelector(".weather-details .wind span");

      switch (json.weather[0].main) {
        case "Clear":
          image.src = "images/clear.png";
          break;

        case "Rain":
          image.src = "images/rain.png";
          break;

        case "Snow":
          image.src = "images/snow.png";
          break;

        case "Clouds":
          image.src = "images/cloud.png";
          break;

        case "Haze":
          image.src = "images/mist.png";
          break;

        default:
          image.src = "";
      }

      temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
      description.innerHTML = `${json.weather[0].description}`;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

      weatherBox.style.display = "";
      weatherDetails.style.display = "";
      weatherBox.classList.add("fadeIn");
      weatherDetails.classList.add("fadeIn");
      container.style.height = "600px";
    });
});


// const apiKey = "16aef503fb4a8a8ca77449b134a07bfb";
// const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";


// const searchBox = document.querySelector( ".search input" );
// const sBtn = document.querySelector( "#btn" );

// async function checkWeather (city){
//     const response = await fetch( apiUrl + city + `&appid=${ apiKey }` );
//     var data = await response.json();
//     console.log( data );

//     document.querySelector( ".city" ).innerHTML = data.name;
//     document.querySelector( ".temp" ).innerHTML = Math.round(data.main.temp) + "°c";
//     document.querySelector( ".humidity" ).innerHTML = data.main.humidity + "%";
//     document.querySelector( ".wind" ).innerHTML = data.wind.speed + "km/h";
// }
// // console.log( seBtn );
// sBtn.addEventListener( "click", () =>
// {   checkWeather( searchBox.value );
// } )

