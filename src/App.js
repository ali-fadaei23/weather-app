import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import Button from "react-bootstrap/Button";
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
    forecast: [{}],
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
          forecast: [
            {
              temp: data.list[0].main.temp,
              humidity: data.list[0].main.humidity,
              condition: data.list[0].weather[0].description,
              speed: data.list[0].wind.speed,
              date: data.list[0].dt_txt,
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
      forecast: [{}],
      humidity: null,
      speed: null,
      error: null,
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
          date={this.state.forecast[0].date}
          temp={this.state.forecast[0].temp}
          humidity={this.state.forecast[0].humidity}
          condition={this.state.forecast[0].condition}
          speed={this.state.forecast[0].speed}
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
