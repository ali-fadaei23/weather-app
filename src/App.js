import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import { getWeatherInfo, getForecastWeather } from "./ApiService";
import "./App.css";
import FormWeather from "./Components/FormWeather";
import CurrentWeatherData from "./Components/CurrentWeatherData";
import ForecastWeatherData from "./Components/ForecastWeatherData";

class App extends Component {
  state = {
    temperature: null,
    selectedCity: null,
    city: null,
    country: null,
    description: null,
    forecast: [],
    humidity: null,
    speed: null,
    error: null,
  };

  constructor(props) {
    super(props);
    // Bind
    this.getCurrentWeather = this.getCurrentWeather.bind(this);
    this.getForecastWeather = this.getForecastWeather.bind(this);
    this.reset = this.reset.bind(this);
  }

  getCurrentWeather(e) {
    e.preventDefault();
    this.setState({ selectedCity: e.target.city.value }, () => {
      getWeatherInfo(this.state.selectedCity)
        .then((data) => {
          this.setState({
            temperature: data.main.temp,
            city: data.name,
            country: data.sys.country,
            humidity: data.main.humidity,
            description: data.weather[0].description,
            speed: data.wind.speed,
            error: null,
          });
        })
        .catch((error) => {
          this.setState({
            temperature: null,
            city: null,
            country: null,
            description: null,
            humidity: null,
            speed: null,
            date: null,
            error: error.message,
          });
        });
    });
  }

  getForecastWeather(e) {
    e.preventDefault();
    getForecastWeather(this.state.selectedCity)
      .then((data) => {
        function formatDate(date) {
          return date.split(" ").slice(0, 1).toString().replace(/-/g, "/");
        }
        this.setState({
          forecast: [
            {
              temp: data.list[0].main.temp,
              humidity: data.list[0].main.humidity,
              condition: data.list[0].weather[0].description,
              speed: data.list[0].wind.speed,
              date: formatDate(data.list[0].dt_txt),
            },
            {
              temp: data.list[4].main.temp,
              humidity: data.list[4].main.humidity,
              condition: data.list[4].weather[0].description,
              speed: data.list[4].wind.speed,
              date: formatDate(data.list[4].dt_txt),
            },
            {
              temp: data.list[12].main.temp,
              humidity: data.list[12].main.humidity,
              condition: data.list[12].weather[0].description,
              speed: data.list[12].wind.speed,
              date: formatDate(data.list[12].dt_txt),
            },
            {
              temp: data.list[20].main.temp,
              humidity: data.list[20].main.humidity,
              condition: data.list[20].weather[0].description,
              speed: data.list[20].wind.speed,
              date: formatDate(data.list[20].dt_txt),
            },
            {
              temp: data.list[28].main.temp,
              humidity: data.list[28].main.humidity,
              condition: data.list[28].weather[0].description,
              speed: data.list[28].wind.speed,
              date: formatDate(data.list[28].dt_txt),
            },
          ],
        });
      })
      .catch((error) => {
        this.setState({
          temperature: null,
          city: null,
          country: null,
          description: null,
          humidity: null,
          speed: null,
          date: null,
          error: error.message,
        });
      });
  }

  getWeather() {
    return Promise.all([
      this.getCurrentWeather(),
      this.getForecastWeather(),
    ]).then(([res1, res2]) => {
      console.log("Result", res1, res2);
    });
  }

  reset() {
    this.setState({
      temperature: null,
      selectedCity: null,
      city: null,
      country: null,
      description: null,
      forecast: [],
      humidity: null,
      speed: null,
      error: null,
    });
  }

  render() {
    return (
      <div id="main">
        <FormWeather onSubmit={this.getCurrentWeather} />
        <CurrentWeatherData
          temperature={this.state.temperature}
          city={this.state.city}
          country={this.state.country}
          humidity={this.state.humidity}
          speed={this.state.speed}
          description={this.state.description}
          error={this.state.error}
        />
        <ForecastWeatherData
          onClick={this.getForecastWeather}
          forecast={this.state.forecast.map((item, index) =>
            this.state.forecast.length !== 0 ? (
              <div
                key={index}
                style={{
                  color: "#ffffff",
                  display: "flex",
                  padding: "20px",
                }}
              >
                <div style={{ border: "solid", marginRight: "5px" }}>
                  <div>
                    <span>Temperature: {item.temp}</span>
                  </div>
                  <div>
                    <span>Humidity: {item.humidity}</span>
                  </div>
                  <div>
                    <span>Condition: {item.condition}</span>
                  </div>
                  <div>
                    <span>Speed: {item.speed}</span>
                  </div>

                  <div>
                    <span>Date: {item.date}</span>
                  </div>
                </div>
              </div>
            ) : null
          )}
        />
        <Button
          variant="primary"
          type="click"
          style={{ margin: "5px" }}
          onClick={this.reset}
        >
          Reset Weather
        </Button>
      </div>
    );
  }
}

export default App;
