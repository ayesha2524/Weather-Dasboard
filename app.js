let cityInput = document.querySelector('#city-input');
let searchBtn = document.querySelector('#button');
let cities = [];

let find = document.querySelector('.find');
const container = document.querySelector('.container');
const weatherContainer = document.querySelector('.weather-container');
const weatherInfo = document.querySelector('.weather-info');
const weatherInfoContainer = document.querySelector('.weather-info-container');

let day = document.querySelector('#day');
let date = document.querySelector('#date');
let temperature = document.querySelector('#temp');
let humidity = document.querySelector('#humidity');
let wind = document.querySelector('#wind');
let condition = document.querySelector('#condition');
let description = document.querySelector('#desc');
let locationDisplay = document.querySelector('#location');

const today = new Date();
const todayDate = today.getDate();
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const dayName = days[today.getDay()];
const month = today.getMonth() + 1;
const year = today.getFullYear();

// Create Search History Section
let searchHistory = document.createElement('div');
searchHistory.classList.add('search-history');

let searchContainer = document.createElement('div');
searchContainer.classList.add('search-container');

let searchH2 = document.createElement('h2');
searchH2.innerText = 'Search History';
searchHistory.appendChild(searchH2);

let ul = document.createElement('ul');
searchHistory.appendChild(ul);

let searchX = document.createElement('div');
searchX.classList.add('x');
searchX.innerText = 'X';
searchHistory.appendChild(searchX);

// Add everything to DOM
searchContainer.appendChild(searchHistory);
weatherContainer.appendChild(searchContainer);
searchContainer.style.display = 'none';

// X Buttons
searchX.addEventListener('click', () => {
    searchHistory.remove();
    localStorage.removeItem('weatherHistory');
});

let xbtn = document.querySelector('.x'); // give this class to weather X button
if (xbtn) {
    xbtn.addEventListener('click', () => {
        weatherInfo.remove();
        localStorage.removeItem('weatherdata');
    });
}

// Main Weather Fetch
const checkWeather = async function (city) {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=418ff1f815c9ae65e72f4616207b5197&units=metric`;
    try {
        let res = await fetch(url);
        let data = await res.json();
        if (data.cod === "404") {
            find.style.display = 'block';
            find.innerHTML = `❌ City not found`;
            return false;
        }

        // Show Info Box
        weatherInfoContainer.style.display = 'block';

        // Fill content
        day.innerHTML = `${dayName}`;
        date.innerHTML = `${todayDate}/${month}/${year}`;
        temperature.innerHTML = `${data.main.temp}°C `;
        let country = data.sys.country ?? 'country';
        locationDisplay.innerHTML = `📍 ${data.name}, ${country}`;

        humidity.innerHTML = `${data.main.humidity}%`;
        wind.innerHTML = `${data.wind.speed} km/h `;
        condition.innerHTML = `${data.weather[0].main}`;
        description.innerHTML = `${data.weather[0].description}`;
        saveData();

        // Theme change
        setTheme(data.weather[0].main.toLowerCase())

        return true;
    } catch (err) {
        find.style.display = 'block';
        find.innerHTML = `⚠️ Error fetching weather`;
        return false;
    }
};

function setTheme(condition) {
    const inputBox = document.querySelector('#city-input');
    switch (condition) {
        case 'clear':
            container.style.backgroundColor = '#ffffff';
            inputBox.style.backgroundColor = '#ffffff';
            searchBtn.style.backgroundColor = '#90caf9';
            container.style.color = '#000';
            weatherInfo.style.background = 'linear-gradient(to bottom, #d0e8ff 20%, #90caf9 50%)';
            searchHistory.style.background = 'linear-gradient(to bottom, #d0e8ff 20%, #90caf9 50%)';
            break;

        case 'clouds':
            container.style.backgroundColor = '#eceff1';
            inputBox.style.backgroundColor = '#eceff1';
            searchBtn.style.backgroundColor = '#b0bec5';
            container.style.color = '#000';
            weatherInfo.style.background = 'linear-gradient(to bottom, #cfd8dc 20%, #b0bec5 80%)';
            searchHistory.style.background = 'linear-gradient(to bottom, #cfd8dc 20%, #b0bec5 80%)';
            break;

        case 'rain':
        case 'drizzle':
            container.style.backgroundColor = '#cfd8dc';
            inputBox.style.backgroundColor = '#cfd8dc';
            searchBtn.style.backgroundColor = '#607d8b';
            container.style.color = '#fff';
            weatherInfo.style.background = 'linear-gradient(to bottom, #b0bec5 20%, #607d8b 80%)';
            searchHistory.style.background = 'linear-gradient(to bottom, #b0bec5 20%, #607d8b 80%)';
            break;

        case 'sunny':
            container.style.backgroundColor = '#fff8e1';
            inputBox.style.backgroundColor = '#fff8e1';
            searchBtn.style.backgroundColor = '#ffca28';
            container.style.color = '#000';
            weatherInfo.style.background = 'linear-gradient(to bottom, #fff59d 20%, #ffca28 80%)';
            searchHistory.style.background = 'linear-gradient(to bottom, #fff59d 20%, #ffca28 80%)';
            break;

        case 'thunderstorm':
            container.style.backgroundColor = '#9e9e9e';
            inputBox.style.backgroundColor = '#9e9e9e';
            searchBtn.style.backgroundColor = '#424242';
            container.style.color = '#fff';
            weatherInfo.style.background = 'linear-gradient(to bottom, #757575 20%, #424242 80%)';
            searchHistory.style.background = 'linear-gradient(to bottom, #757575 20%, #424242 80%)';
            break;

        case 'snow':
            container.style.backgroundColor = '#ffffff';
            inputBox.style.backgroundColor = '#ffffff';
            searchBtn.style.backgroundColor = '#90a4ae';
            container.style.color = '#000';
            weatherInfo.style.background = 'linear-gradient(to bottom, #e0f7fa 20%, #90a4ae 80%)';
            searchHistory.style.background = 'linear-gradient(to bottom, #e0f7fa 20%, #90a4ae 80%)';
            break;

        case 'mist':
        case 'fog':
            container.style.backgroundColor = '#e0e0e0';
            inputBox.style.backgroundColor = '#e0e0e0';
            searchBtn.style.backgroundColor = '#90a4ae';
            container.style.color = '#000';
            weatherInfo.style.background = 'linear-gradient(to bottom, #d0e8ff 20%, #90caf9 50%)';
            searchHistory.style.background = 'linear-gradient(to bottom, #d0e8ff 20%, #90caf9 50%)';
            break;

        default:
            container.style.backgroundColor = '#cfd8dc';
            inputBox.style.backgroundColor = '#ffffff';
            searchBtn.style.backgroundColor = '#90caf9';
            container.style.color = '#000';
            weatherInfo.style.background = 'linear-gradient(to bottom, #e0e0e0 20%, #90a4ae 80%)';
            searchHistory.style.background = 'linear-gradient(to bottom, #e0e0e0 20%, #90a4ae 80%)';
    }
}

// Search Button Click
searchBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    let city = cityInput.value.trim();
    if (!city) {
        alert("Please! Enter the city name");
        return;
    }

    let checkweather = await checkWeather(city);
    if (checkweather) {
        searchContainer.style.display = 'block';

        if (!cities.includes(city)) {
            cities.push(city);
        }

        // Update History UI
        ul.innerHTML = "";
        for (let ci of cities) {
            let li = document.createElement('li');
            li.innerText = ci;
            ul.appendChild(li);
        }

        cityInput.value = "";
        saveData();
    }
});

// Save to localStorage
function saveData() {
    localStorage.setItem('weatherHistory', JSON.stringify(cities));
    let weatherData = {
        day: day.innerText,
        date: date.innerText,
        temperature: temperature.innerText,
        humidity: humidity.innerText,
        wind: wind.innerText,
        condition: condition.innerText,
        description: description.innerText,
        location: locationDisplay.innerText
    };
    localStorage.setItem('weatherdata', JSON.stringify(weatherData));
}

// Load History
function loadData() {
    let storedcities = localStorage.getItem('weatherHistory');
    if (storedcities) {
        cities = JSON.parse(storedcities);
        if (cities.length > 0) {
            searchContainer.style.display = 'block';
        }
        ul.innerHTML = "";
        for (let city of cities) {
            let li = document.createElement('li');
            li.innerText = city;
            ul.appendChild(li);
        }
    }
}

// Load Weather Info
function loadWeather() {
    let storedweather = localStorage.getItem('weatherdata');
    if (storedweather) {
        let data = JSON.parse(storedweather);
        if (data.day && data.date) {
            day.innerText = data.day;
            date.innerText = data.date;
            temperature.innerText = data.temperature;
            humidity.innerText = data.humidity;
            wind.innerText = data.wind;
            condition.innerText = data.condition;
            description.innerText = data.description;
            locationDisplay.innerText = data.location;
            weatherInfoContainer.style.display = 'block';
            setTheme(data.condition.toLowerCase())
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadData();
    loadWeather();
});
