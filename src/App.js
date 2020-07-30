import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";

// Components
import Weather from "./Components/Weather";

import "./App.css";

const API_KEY = "d14f4fe2ef55d830d97042742e784457";

class App extends Component {
  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.city.value;
    const country = e.target.country.value;
    const api_call = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`
    );
    const data = await api_call.json();
    console.log(data);
  };
  render() {
    return (
      <div>
        <Weather getWeather={this.getWeather} />
      </div>
    );
  }
}

export default App;
