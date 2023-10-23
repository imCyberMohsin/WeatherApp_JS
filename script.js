//* Weather App Script 

// Weather API Used (built-in API request by city name): https://openweathermap.org/
// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}&units=metric


const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const apiKey = "9186f057c5930960f87815ed12cabcd3";

const cityInput = document.querySelector('.search input');  // selected input tag
const searchBtn = document.querySelector('.search button');  // selected button

//! Check Weather Function 
const checkWeather = async (city) => {
    try {
        const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
        const data = await response.json();
        // console.log(data); // Display the api data on console

        if (response.status == 404) {
            document.querySelector('.error').style.display = 'block';
        } else {
            document.querySelector('.error').style.display = 'none';
        }

        //* Dynamically Updating : city, temp, humidity, windspeed
        document.querySelector('.city').innerHTML = data.name;
        document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector('.humidity').innerHTML = data.main.humidity + "%";
        document.querySelector('.windspeed').innerHTML = data.wind.speed + "km/h";

        // Update weather image accoring to the weather
        const weatherIcon = document.querySelector('.weatherIcon');
        if (data.weather[0].main === "Clouds") {
            weatherIcon.src = "./img/clouds.png";
        }
        else if (data.weather[0].main === "Clear") {
            weatherIcon.src = "./img/clear.png";
        }
        else if (data.weather[0].main === "Drizzle") {
            weatherIcon.src = "./img/drizzle.png";
        }
        else if (data.weather[0].main === "Mist") {
            weatherIcon.src = "./img/mist.png";
        }
        else if (data.weather[0].main === "Rain") {
            weatherIcon.src = "./img/rain.png";
        }
        else if (data.weather[0].main === "Snow") {
            weatherIcon.src = "./img/snow.png";
        }

        // unhide .weather container
        // document.querySelector('.weather').style.display = 'block';

    } catch (err) {
        console.log(err);
    }
};

//! Dark Mode  Toggle Function - Event Listener
let darkModeFlag = false;
const darkModeDiv = document.querySelector('.dark-mode-icon');
const darkModeToggle = () => {
    if (!darkModeFlag) {
        document.body.style.backgroundColor = '#2f2f2f';

        // chanage the dark Mode div text
        document.querySelector('.dark-onoff').innerHTML = "Turn OFF DarkMode"
        darkModeFlag = true;
    } else {
        document.body.style.backgroundColor = '#82b7cf';

        // chanage the dark Mode div text
        document.querySelector('.dark-onoff').innerHTML = "Turn ON DarkMode"
        darkModeFlag = false;
    }
}


//? Event Listener to check weather when search button is clicked 
searchBtn.addEventListener('click', () => {
    checkWeather(cityInput.value);
})

//? Enter button is pressed on the input 
cityInput.addEventListener('keypress', (event) => {
    if (event.key === "Enter") {
        checkWeather(cityInput.value);
    }
})

//? Dark Mode Toggle Evenet Listener
darkModeDiv.addEventListener('click', darkModeToggle); 