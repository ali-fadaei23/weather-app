import React from "react";
import "./ForecastWeatherData.css";
import { Button } from "react-bootstrap";

const WeatherForecastData = (props) => (
  <div id="forecast-container">
    <div>
      <Button
        className="btn-forecast-weather"
        onClick={props.onClick}
        style={{
          display: props.isVisible ? "" : "none",
        }}
      >
        Forecast 5 Days
      </Button>
    </div>
    <div className="forecast-info">
      <div className="forecast-detail">
        <div>{props.forecast}</div>
      </div>
    </div>
  </div>
);

export default WeatherForecastData;
