import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import { getWeatherInfo, getForecastWeather } from "./ApiService";
import "./App.css";
import FormWeather from "./Components/FormWeather";
import WeatherData from "./Components/WeatherData";
import WeatherForecastData from "./Components/WeatherForecastData";

class App extends Component {
  state = {
    temperature: null,
    selectedCity: null,
    city: null,
    country: null,
    description: null,
    date: [],
    humidity: null,
    speed: null,
    error: null,
  };

  constructor(props) {
    super(props);
    this.getCurrentWeather = this.getCurrentWeather.bind(this);
    this.getForecastWeather = this.getForecastWeather.bind(this);
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
            error: " ",
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
        this.setState({
          date: [data.list[8].dt_txt, data.list[2].main.temp],
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

  render() {
    return (
      <div id="main">
        <FormWeather onSubmit={this.getCurrentWeather} />
        <WeatherData
          temperature={this.state.temperature}
          city={this.state.city}
          country={this.state.country}
          humidity={this.state.humidity}
          speed={this.state.speed}
          description={this.state.description}
          error={this.state.error}
        />
        <WeatherForecastData
          onClick={this.getForecastWeather}
          date={this.state.date[0]}
          temp={this.state.date[1]}
        />
      </div>
    );
  }
}

export default App;
