const submitBtn = document.getElementById('submitBtn')
const cityInput = document.getElementById('city');

const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const d = new Date();
const currentMonth = d.getMonth();
const currentMonthName = month[currentMonth];
let dd = d.getDate();
let yyyy = d.getFullYear();
let mm;

if (currentMonth === 5 || currentMonth === 6) {
  mm = currentMonthName; // Keep full name for June and July
} else {
  mm = currentMonthName.slice(0, 3); // Shorten other month names
}

let todayDate = `${mm} ${dd}, ${yyyy}`
// console.log(todayDate)



submitBtn.addEventListener('click', () => {
  const city = cityInput.value;
  const apiKey = 'd1845658f92b31c64bd94f06f7188c9c';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  report(url);
})

const report = (url) => {
  fetch(url)
  .then(response => response.json())
  .then((data) => {
    const temp = data.main.temp;
    const descrip = data.weather[0].description;
    const humid = data.main.humidity;
    const wind = data.wind.speed;
    const icon = data.weather[0].icon;
    const iconUrl = `http://openweathermap.org/img/w/${icon}.png`;
    updateData(temp, descrip, humid, wind, iconUrl);
  })
  .catch((err) => {
    console.error("Error fetching weather data : ", err);
    const weatherInfo = document.querySelector(".weatherInfo");
    weatherInfo.innerHTML = `<p>Failed to fetch weather data</p>`;
  })
};

const updateData = (temp, descrip, humid, wind, iconUrl) => {
  const weatherInfo = document.querySelector(".weatherInfo");
  let ct = cityInput.value;

  temperature = Math.round(temp)
  let city = ct.charAt(0).toUpperCase() + ct.slice(1);
  weatherInfo.innerHTML = `
  <p id="right">${todayDate}</p>

  <div class="center">
    <p class="city">${city}</p> 
    <p class="temp">${temperature}&deg;C</p>
  </div>
  <div class="table1">
    <p>Description</p> 
    <p>Humidity</p>
    <p>Wind</p> 
  </div>
  <div class="table2">
    <p>${descrip}</p>
    <p>${humid}%</p>
    <p>${wind}mph</p>
  </div>
  `
}


