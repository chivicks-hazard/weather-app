const dates = document.querySelectorAll('.weather-item h3');
const weatherImgs = document.querySelectorAll('.weather-img');
const weatherCndtns = document.querySelectorAll('.weather-condition');
const minTemps = document.querySelectorAll('.temp .min');
const maxTemps = document.querySelectorAll('.temp .max');
const city = document.querySelector('.weather-display h2');

// The Search Form
const cityForm = document.getElementById('cityForm');
const cityInput = document.getElementById('city');
const submitBtn = document.getElementById('submit');

// URL and Options for the API
const url = 'https://weatherapi-com.p.rapidapi.com/forecast.json?q=Lagos&days=3';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'ef04bb25f7msh213900c577585e1p1f01e0jsna21b2c903032',
		'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
	}
};

async function weather(url, options) {
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
        const forecast = result.forecast;

        for (let i = 0; i < forecast.forecastday.length; i++) {
            weatherImgs[i].src = `${forecast.forecastday[i].day.condition.icon}`;
            weatherImgs[i].alt = forecast.forecastday[i].day.condition.text;
            weatherCndtns[i].innerHTML = forecast.forecastday[i].day.condition.text;
            minTemps[i].innerHTML = forecast.forecastday[i].day.mintemp_c + '&#x2103';
            maxTemps[i].innerHTML = forecast.forecastday[i].day.maxtemp_c + '&#x2103';
            
            var date = new Date(forecast.forecastday[i].date);
            dates[i].innerHTML = date.toDateString();
        }

        city.textContent = `${result.location.name}, ${result.location.country}`;

    } catch (error) {
        console.error(error);
    }
}

weather(url, options);

cityForm.addEventListener('submit', (e) => {
    e.preventDefault();

    var url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${cityInput.value}&days=3`;
    try {
        city.textContent = cityInput.value;
        weather(url, options);
    } catch (error) {
        console.error(error);
    }
})