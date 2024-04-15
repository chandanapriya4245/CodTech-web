document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.querySelector('.search-box button');
    
    searchButton.addEventListener('click', () => {
        const APIkey = 'fb01a754a2a5c54525f911db7f2f14a3';
        const cityInput = document.querySelector('.search-box input');
        const cityName = cityInput.value;

        if (cityName === '') return;

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${APIkey}`)
            .then(response => response.json())
            .then(weatherData => {
                updateWeather(weatherData);
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
            });
    });
 
    function updateWeather(weatherData) {
        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');

        switch (weatherData.weather[0].main) {
            case 'Clear':
                image.src = 'images/clear.png';
                break;
            case 'Rain':
                image.src = 'images/rain.png';
                break;
            case 'Snow':
                image.src = 'images/snow.png';
                break;
            case 'Mist':
                image.src = 'images/mist.png';
                break;
            case 'Haze':
                image.src = 'images/haze.png';
                break;
            default:
                image.src = 'images/cloud.png';
        }

        temperature.innerHTML = `${parseInt(weatherData.main.temp)}<span>c</span>`;
        description.innerHTML = `${weatherData.weather[0].description}`;
        humidity.innerHTML = `${weatherData.main.humidity}%`;
        wind.innerHTML = `${parseInt(weatherData.wind.speed)}km/h`;
    }
});
