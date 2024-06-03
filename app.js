async function fetchWeather() {
    const city = document.getElementById('cityInput').value;
    const apiKey = '5fdda82be9e9e48994ad67348299f77e';
    const urlCurrent = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const responseCurrent = await fetch(urlCurrent);
        const dataCurrent = await responseCurrent.json();
        displayCurrentWeather(dataCurrent);

        const responseForecast = await fetch(urlForecast);
        const dataForecast = await responseForecast.json();
        displayForecast(dataForecast);
    } catch (error) {
        console.error("Weather data fetching error:", error);
    }
}

function displayCurrentWeather(data) {
    const weatherHTML = `
        <h2>Current Weather in ${data.name}</h2>
        <p>Temperature: ${data.main.temp} °C</p>
        <p>Feels like: ${data.main.feels_like} °C</p>
        <p>Weather: ${data.weather[0].main}</p>
    `;
    document.getElementById('currentWeather').innerHTML = weatherHTML;
}

function displayForecast(data) {
    let forecastHTML = '<h2>5-Day Forecast:</h2>';
    data.list.forEach((forecast, index) => {
        if (index % 8 === 0) {
            forecastHTML += `
                <div class="forecast-day">
                    <h3>${new Date(forecast.dt_txt).toLocaleDateString()}</h3>
                    <p>Temp: ${forecast.main.temp} °C</p>
                    <p>Weather: ${forecast.weather[0].main}</p>
                </div>
            `;
        }
    });
    document.getElementById('forecast').innerHTML = forecastHTML;
}

document.getElementById('cityInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        fetchWeather();
    }
});
