const apiKey = "f2015de3037498f86f491dd2167601a9";

document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.querySelector('.search button');
    const input = document.querySelector('.search input');

    searchButton.addEventListener('click', () => {
        const zipCode = input.value;
        if (zipCode) {
            checkWeather(zipCode);
        }
    });

    async function checkWeather(zipCode) {
        try {
            const apiUrlZip = `https://api.openweathermap.org/geo/1.0/zip?zip=${zipCode},US&appid=${apiKey}`;
            const zipResponse = await fetch(apiUrlZip);
            const zipData = await zipResponse.json();

            const { lat, lon } = zipData;

            const apiUrlWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
            const weatherResponse = await fetch(apiUrlWeather);
            const weatherData = await weatherResponse.json();

            displayWeather(weatherData);
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    }

    function displayWeather(data) {
        const cityElement = document.querySelector('.city');
        const tempElement = document.querySelector('.temp');
        const dateElement = document.querySelector('.date');
        const hiLoElement = document.querySelector('.hi-lo');
        const conditionElement = document.querySelector('.condition');
        const humidityElement = document.querySelector('.humidity');
        const windElement = document.querySelector('.wind');

        const currentDate = new Date().toLocaleDateString();
        const cityName = `${data.name}, ${data.sys.country}`;
        const currentTemp = `${Math.round(data.main.temp)}°F`;
        const hiTemp = `${Math.round(data.main.temp_max)}°F`;
        const loTemp = `${Math.round(data.main.temp_min)}°F`;
        const currentCondition = data.weather[0].description;
        const currentHumidity = `${data.main.humidity}%`;
        const currentWind = `${Math.round(data.wind.speed)} mph`;

        dateElement.textContent = `Date: ${currentDate}`;
        cityElement.textContent = cityName;
        tempElement.textContent = currentTemp;
        hiLoElement.textContent = `Hi: ${hiTemp} / Lo: ${loTemp}`;
        conditionElement.textContent = `Conditions: ${currentCondition}`;
        humidityElement.textContent = `Humidity: ${currentHumidity}`;
        windElement.textContent = `Wind: ${currentWind}`;
    }
});


