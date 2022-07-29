// Get all necessary elements from the DOM
const app = document.querySelector('.weather-app');
const temp = document.querySelector('.temp');
const dateOutput = document.querySelector('.date');
const timeOutput = document.querySelector('.time');
const conditionOutput = document.querySelector('.condition');
const nameOutput = document.querySelector('.name');
const icon = document.querySelector('.icon');
const cloudOutput = document.querySelector('.cloud');
const humidityOutput = document.querySelector('.humidity');
const windOutput = document.querySelector('.wind');
const windDirOutput = document.querySelector('.windDir');
const windPressure = document.querySelector('.pressure');
const form = document.getElementById('locationInput');
const search = document.querySelector('.search');
const btn = document.querySelector('.submit');
const cities = document.querySelectorAll('.city');


// Default Values
let cityInput = "Mumbai";

cities.forEach((city) => {
    city.addEventListener('click', (e) => {
        cityInput = e.target.innerHTML;
        fetchWeatherData();
        app.style.opacity = "0";
    });
})

// Add submit event to the form
form.addEventListener('submit', (e) => {
    /*If the input field(search bar)
    is empty,throw an alert*/
    if (search.value.length == 0) {
        alert('Please enter a city name');
    } else {
        /*Change from default city to the
        one written in the input field*/
        cityInput = search.value;
        /*Function that fetches and displays
        all the data from the Weather API
        (We will write it soon)*/
        fetchWeatherData();
        // Remove all text from the input field
        search.value = "";
        // Faae out the app(simple animation)
        app.style.opacity = "0";
    }
    e.preventDefault();
});

/* Function that returns a day of the week (Monday, Tuesday, Friday...) froma date(12 03 2021)
We will use this function Later */

function fetchWeatherData() {
    fetch(`https://api.weatherapi.com/v1/current.json?key=540899c2bf494270911143034221606&q=${cityInput}`).then(response => response.json()).then(data => {
        // console.log(data);
        temp.innerHTML = data.current.temp_c + "&#176";
        conditionOutput.innerHTML = data.current.condition.text;
        const date = data.location.localtime;
        const y = parseInt(date.substr(2, 4));
        // const m = parseInt(date.substr(5, 2));

        function monthOfTheDate() {
            const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            let month = months[new Date(date).getMonth()];
            return month;
        };
        const d = parseInt(date.substr(8, 2));

        function dayOfTheWeek() {
            const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            let days = weekday[new Date(date).getDay()];
            return days;
        };
        const time = date.substr(11);
        dateOutput.innerHTML = `${dayOfTheWeek()}, ${d} ${monthOfTheDate()}' ${y}`;
        timeOutput.innerHTML = time;
        let country = data.location.country
        if (country == "United States of America") {
            country = "USA";
        }
        nameOutput.innerHTML = data.location.name + ", " + country;
        const iconId = data.current.condition.icon.substr("//cdn.weatherapi.com/weather/64x64/".length);
        icon.src = "./icons/" + iconId;
        cloudOutput.innerHTML = data.current.cloud + " %";
        humidityOutput.innerHTML = data.current.humidity + " %";
        windOutput.innerHTML = data.current.wind_kph + " km/h";
        windDirOutput.innerHTML = data.current.wind_dir;
        windPressure.innerHTML = data.current.pressure_mb + " MM";

        let timeOfday = "day";
        const code = data.current.condition.code;
        if (!data.current.is_day) {
            timeOfday = "night";
        }
        if (code == 1000) {
            app.style.backgroundImage = `url(./images/${timeOfday}/clear.jpg)`
            btn.style.background = "#e5ba92";
            if (timeOfday == "night") {
                btn.style.background = "#181e27";
            }
        } else if (code == 1003 || code == 1006 || code == 1009 || code == 1030 || code == 1069 || code == 1087 || code == 1135 || code == 1273 || code == 1276 || code == 1279 || code == 1282) {
            app.style.backgroundImage = `url(./images/${timeOfday}/cloudy.jpg)`
            btn.style.background = "#fa6d1b";
            if (timeOfday == "night") {
                btn.style.background = "#181e27";
            }
        } else if (code == 1063 || code == 1069 ||

            code == 1072 ||

            code == 1150 ||

            code == 1153 ||

            code == 1180 ||

            code == 1183 ||

            code == 1186 ||

            code == 1189 ||

            code == 1192 ||

            code == 1195 ||

            code == 1204 ||

            code == 1207 ||

            code == 1240 ||

            code == 1243 ||

            code == 1246 ||

            code == 1249 || code == 1252

        ) {
            app.style.backgroundImage = `url(./images/${timeOfday}/rainy.jpg)`
            btn.style.background = "#647d75";
            if (timeOfday == "night") {
                btn.style.background = "#325c80";
            }
        } else {
            app.style.backgroundImage = `url(./images/${timeOfday}/snowy.jpg)`
            btn.style.background = "#4d72aa";
            if (timeOfday == "night") {
                btn.style.background = "#1b1b1b";
            }

        }
        app.style.opacity = "1";
    }).catch(() => {
        alert('City not found, please try again');
        app.style.opacity = "1";
    });
}
fetchWeatherData();

const elements = document.getElementsByClassName('jump');

for (let i = 0; i <= elements.length; i++) {
    elements[i].addEventListener('animationend', function(e) {
            elements[i].classList.remove('animated');
        }

    );
    elements[i].addEventListener('mouseover', function(e) {
            elements[i].classList.add('animated');
        }

    )
}
app.style.opacity = "1";
app.style.opacity = "1";