import React from "react";
import "./ForecastWeatherData.css";
import { Button } from "react-bootstrap";

const WeatherForecastData = (props) => (
  <div id="forecast-container">
    <div>
      <Button className="btn-forecast-weather" onClick={props.onClick}>
        Forecast 5 Days
      </Button>
    </div>
    <div>
      <div className="forecast-info">{props.forecast}</div>
    </div>
  </div>
);

export default WeatherForecastData;
