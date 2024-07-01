//The API key is required to access the weather data provided by OpenWeatherMap. It's a unique identifier for the API requests
const apiKey = "f2015de3037498f86f491dd2167601a9";

//Purpose: Ensures that the code inside this event listener runs only after the entire HTML document has been completely loaded and parsed.
//Significance: Prevents errors related to missing DOM elements by ensuring all elements are available before the script runs.
document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.querySelector('.search button');
    const input = document.querySelector('.search input');
//Purpose: Selects the search button and input field from the DOM.
//Significance: These variables are used to handle user input and initiate the weather data fetching process.

//Purpose: Adds a click event listener to the search button to trigger the weather data fetching process when clicked.
    //searchButton.addEventListener('click', () => { ... }); sets up a function to run when the search button is clicked.
    //const zipCode = input.value; retrieves the value entered in the input field.
    //if (zipCode) { checkWeather(zipCode); } checks if the input is not empty and then calls the checkWeather function with the ZIP code.
    searchButton.addEventListener('click', () => {
        const zipCode = input.value;
        if (zipCode) {
            checkWeather(zipCode);
        }
    });

//Purpose: Fetches weather data based on the provided ZIP code.
    //async function checkWeather(zipCode) { ... } defines an asynchronous function to handle asynchronous API requests.
    //const apiUrlZip = https://api.openweathermap.org/geo/1.0/zip?zip=${zipCode},US&appid=${apiKey}`;` constructs the URL to fetch geographic coordinates (latitude and longitude) based on the ZIP code.
    //const zipResponse = await fetch(apiUrlZip); makes a request to the OpenWeatherMap API to get geographic data.
    //const zipData = await zipResponse.json(); parses the response as JSON.
    //const { lat, lon } = zipData; destructures the latitude and longitude from the response data.
    async function checkWeather(zipCode) {
        try {
            const apiUrlZip = `https://api.openweathermap.org/geo/1.0/zip?zip=${zipCode},US&appid=${apiKey}`;
            const zipResponse = await fetch(apiUrlZip);
            const zipData = await zipResponse.json();

            const { lat, lon } = zipData;

            //const apiUrlWeather = https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;` constructs the URL to fetch weather data based on the geographic coordinates.
            //const weatherResponse = await fetch(apiUrlWeather); makes a request to the OpenWeatherMap API to get weather data.
            //const weatherData = await weatherResponse.json(); parses the response as JSON.
            const apiUrlWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
            const weatherResponse = await fetch(apiUrlWeather);
            const weatherData = await weatherResponse.json();

            //displayWeather(weatherData); calls the displayWeather function to display the fetched weather data.
            //catch (error) { console.error('Error fetching weather data:', error); } handles any errors that occur during the fetch process.
            displayWeather(weatherData);
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    }

//Purpose: Updates the DOM elements with the fetched weather data.
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


