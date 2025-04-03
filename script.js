document.addEventListener("DOMContentLoaded", () => {
    const apiKey = "https://api.api-ninjas.com/v1/weather";
    const searchBtn = document.getElementById("search-btn");
    const cityInput = document.getElementById("city-input");
    const cityName = document.getElementById("city-name");
    const temperature = document.getElementById("temperature");
    const description = document.getElementById("description");
    const mapDiv = document.getElementById("map");
    
    searchBtn.addEventListener("click", () => {
        const city = cityInput.value.trim();
        if (city) {
            fetchWeather(city);
        }
    });
    
    async function fetchWeather(city) {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
            const data = await response.json();
            if (data.cod === 200) {
                cityName.textContent = data.name;
                temperature.textContent = `Temperature: ${data.main.temp}°C`;
                description.textContent = `Weather: ${data.weather[0].description}`;
                updateMap(data.coord.lat, data.coord.lon);
            } else {
                alert("City not found!");
            }
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    }
    
    function updateMap(lat, lon) {
        mapDiv.innerHTML = `<iframe width="100%" height="300" src="https://www.google.com/maps?q=${lat},${lon}&output=embed"></iframe>`;
    }
});