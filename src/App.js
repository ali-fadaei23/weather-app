import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";

// Components
import Weather from "./Components/Weather";
import WeatherData from "./Components/WeatherData";
import "./App.css";

const API_KEY = "d14f4fe2ef55d830d97042742e784457";

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
  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.city.value;
    const api_call = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    const data = await api_call.json();
    console.log(data);
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
  };
  render() {
    return (
      <div>
        <Weather getWeather={this.getWeather} />
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
