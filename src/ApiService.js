const API_KEY = "d14f4fe2ef55d830d97042742e784457";

export const getWeatherInfo = (city) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
  ).then((res) => {
    return res.json();
  });
};
