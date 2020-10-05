import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import { getWeatherInfo } from "./ApiService";
import "./App.css";
import FormWeather from "./Components/FormWeather";
import WeatherData from "./Components/WeatherData";

class App extends Component {
  state = {
    temperature: null,
    city: null,
    country: null,
    description: null,
    humidity: null,
    speed: null,
    error: null,
  };

  constructor(props) {
    super(props);
    this.getCurrentWeather = this.getCurrentWeather.bind(this)
  }

  getCurrentWeather(e) {
    e.preventDefault();
    const city = e.target.city.value;
    getWeatherInfo(city).then((data) => {
      if (city) {
        this.setState({
          temperature: data.main.temp,
          city: data.name,
          country: data.sys.country,
          humidity: data.main.humidity,
          description: data.weather[0].description,
          speed: data.wind.speed,
          error: " ",
        });
      } else {
        this.setState({
          temperature: null,
          city: null,
          country: null,
          description: null,
          humidity: null,
          speed: null,
          error: "please Enter The City..",
        });
      }
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
      </div>
    );
  }
}

export default App;
