const api = {
  key: 'f7493c1a7ca50563f4412f5cc0da93ef',
  base_url: 'https://api.openweathermap.org/data/2.5/',
};
const header = document.querySelector('header');
const inputDiv = document.querySelector('.input');
const outputDiv = document.querySelector('.output');
const searchInput = document.querySelector('.input input');
const searchBtn = document.querySelector('.input button');
const returnBtn = document.querySelector('.return');
const cityElement = document.querySelector('.info .city');
const weekDays = ['Sun', 'Mon', 'Thu', 'Wed', 'Thur', 'Fri', 'Sat'];
searchInput.addEventListener('keypress', setQuery);
searchBtn.addEventListener('click', setQueryBtn);
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

returnBtn.addEventListener('click', returnToMain);

function returnToMain() {
  inputDiv.classList.remove('transform');
  header.classList.remove('transform');
  outputDiv.classList.remove('opacity');
}
function setQuery(event) {
  if (event.keyCode == 13) {
    if (searchInput.value != '') {
      getResults(searchInput.value);
      inputDiv.classList.add('transform');
      header.classList.add('transform');
      outputDiv.classList.add('opacity');
    } else {
      const msg = document.createElement('h4');
      msg.className = 'msg';
      msg.innerHTML = 'Please type in something';
      inputDiv.append(msg);
      setTimeout(() => {
        msg.remove();
      }, 1000);
    }
  }
}
function setQueryBtn() {
  getResults(searchInput.value);
  inputDiv.classList.add('transform');
  header.classList.add('transform');
  outputDiv.classList.add('opacity');
  //   searchInput.value = '';
}
function getResults(query) {
  fetch(`${api.base_url}weather?q=${query}&units=metric&APPID=${api.key} `)
    .then((weather) => {
      return weather.json();
    })
    .then((weather) => {
      displayResults(weather);
    });
}

function displayResults(weather) {
  console.log(weather);

  const tempElement = document.querySelector('.temp');
  const feelsLikeElement = document.querySelector('.feels-like');
  const maxTemp = document.querySelector('.max');
  const minTemp = document.querySelector('.min');
  const windElem = document.querySelector('.wind');
  const dateElem = document.querySelector('.date');
  const descriptionElem = document.querySelector('.description');
  const humidityElem = document.querySelector('.humidity');
  const weatherImg = document.querySelector('.weather-img');
  const sentence = document.querySelector('.sentence');
  cityElement.innerHTML = `${weather.name} , ${weather.sys.country}`;
  tempElement.innerHTML = `${weather.main.temp} °C`;
  maxTemp.innerHTML = `Max Temp: ${weather.main.temp_max} °C`;
  minTemp.innerHTML = ` Min Temp: ${weather.main.temp_min} °C`;
  feelsLikeElement.innerHTML = `Feels like   ${weather.main.feels_like} °C`;
  windElem.innerHTML = `Wind: ${weather.wind.speed} km/h`;
  const currentDate = new Date();
  dateElem.innerHTML = ` ${
    weekDays[currentDate.getDay()]
  }   ${currentDate.getDate()} ${
    months[currentDate.getMonth()]
  } ${currentDate.getFullYear()} `;
  descriptionElem.innerHTML = weather.weather[0].description;
  humidityElem.innerHTML = ` Humidity: ${weather.main.humidity}%`;

  if (
    weather.weather[0].description == 'broken clouds' ||
    weather.weather[0].description == 'clouds' ||
    weather.weather[0].description == 'cloudy'
  ) {
    weatherImg.src = './images/cloud.png';
  } else if (
    weather.weather[0].description == 'clear sky' ||
    weather.weather[0].description == 'clear' ||
    weather.weather[0].description == 'sunny'
  ) {
    weatherImg.src = './images/sunny.png';
  } else if (
    weather.weather[0].description == 'rainy' ||
    weather.weather[0].description == 'rain' ||
    weather.weather[0].description == 'heavy rain' ||
    weather.weather[0].description == 'light rain'
  ) {
    weatherImg.src = './images/rain.svg';
    sentence.innerHTML = "Don't forget your umbrella.";
  }
}
