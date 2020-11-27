import React from "react";
import "./CurrentWeatherData.css";

const WeatherData = (props) => (
  <div id={"mainWeatherData"} >
    <div>
      {props.temperature && <span>Temperature: {props.temperature}</span>}
    </div>
    <div>
      {props.city && props.country && (
        <span>
          Location: {props.city}, {props.country}
        </span>
      )}
    </div>
    <div>{props.humidity && <span>Humidity: {props.humidity}</span>}</div>
    <div>
      {props.description && <span>Condition: {props.description}</span>}
    </div>
    <div>{props.speed && <span>Speed: {props.speed}</span>}</div>
    <div>{props.error && <span>Error: {props.error}</span>}</div>
  </div>
);

export default WeatherData;
