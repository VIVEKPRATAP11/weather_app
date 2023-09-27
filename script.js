// const apiKey = "22bcafbccdb5d775d4e3dcf5316d058d";
// const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// const searchBox = document.getElementById("cityInput");
// const searchBtn = document.getElementById("searchBtn");
// const weatherIcon = document.getElementById("weatherIcon");
// const errorMessage = document.getElementById("errorMessage");
// const cityNameElement = document.getElementById("cityName");
// const temperatureElement = document.getElementById("temperature");
// const humidityElement = document.getElementById("humidity");
// const windSpeedElement = document.getElementById("windSpeed");
// const weatherContainer = document.querySelector(".weather"); // Added this line

// async function checkWeather(city) {
//     try {
//         const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
//         if (response.status === 404) {
//             showError("Invalid City Name");
//             hideWeather();
//         } else {
//             const data = await response.json();
//             console.log(data);

//             cityNameElement.textContent = data.name;
//             temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
//             humidityElement.textContent = `${data.main.humidity}%`;
//             windSpeedElement.textContent = `${data.wind.speed} km/h`;

//             updateWeatherIcon(data.weather[0].main);
//             showWeather();
//         }
//     } catch (error) {
//         showError("An error occurred");
//         hideWeather();
//     }
// }

// function showError(message) {
//     errorMessage.textContent = message;
//     errorMessage.style.display = "block";
// }

// function hideWeather() {
//     weatherContainer.style.display = "none"; // Updated to hide the weather container
// }

// function showWeather() {
//     errorMessage.style.display = "none";
//     weatherContainer.style.display = "block"; // Updated to show the weather container
// }

// function updateWeatherIcon(weatherType) {
//     const iconMapping = {
//         "Clouds": "clouds.png",
//         "Clear": "clear.png",
//         "Rain": "rain.png",
//         "Drizzle": "drizzle.png",
//         "Mist": "mist.png",
//     };
//     const iconSrc = iconMapping[weatherType] || "default.png";
//     weatherIcon.src = `images/${iconSrc}`;
// }

// searchBtn.addEventListener("click", () => {
//     checkWeather(searchBox.value);
// });

// // Initial weather check
// checkWeather("New York");
const apiKey = "22bcafbccdb5d775d4e3dcf5316d058d";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const errorContainer = document.querySelector(".error");
const cityNameElement = document.querySelector(".city");
const temperatureElement = document.querySelector(".temp");
const humidityElement = document.querySelector(".humidity");
const windSpeedElement = document.querySelector(".wind");

async function fetchWeatherData(city) {
    try {
        const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
        if (response.status === 404) {
            showError("Invalid City Name");
        } else {
            const data = await response.json();
            displayWeatherData(data);
        }
    } catch (error) {
        showError("An error occurred");
    }
}

function showError(message) {
    errorContainer.style.display = "block";
    errorContainer.textContent = message;
    hideWeatherData();
}

function hideWeatherData() {
    document.querySelector(".weather").style.display = "none";
}

function displayWeatherData(data) {
    cityNameElement.textContent = data.name;
    temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
    humidityElement.textContent = `${data.main.humidity}%`;
    windSpeedElement.textContent = `${data.wind.speed} km/h`;

    updateWeatherIcon(data.weather[0].main);
    showWeatherData();
}

function showWeatherData() {
    errorContainer.style.display = "none";
    document.querySelector(".weather").style.display = "block";
}

function updateWeatherIcon(weatherType) {
    const iconMapping = {
        "Clouds": "clouds.png",
        "Clear": "clear.png",
        "Rain": "rain.png",
        "Drizzle": "drizzle.png",
        "Mist": "mist.png",
    };
    const iconSrc = iconMapping[weatherType] || "default.png";
    weatherIcon.src = `images/${iconSrc}`;
}

searchBtn.addEventListener("click", () => {
    const city = searchBox.value.trim();
    if (city) {
        fetchWeatherData(city);
    }
});

// Initial weather check for a default city (e.g., New York)
fetchWeatherData("New York");
