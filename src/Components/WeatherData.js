import React from "react";

const WeatherData = (props) => (
  <div>
    {props.temperature && <span>Temperature: {props.temperature}</span>}
    {
      (props.city && props.country && <span>Location: {props.city}</span>,
      (<span>{props.country}</span>))
    }
    {props.humidity && <span>Humidity: {props.humidity}</span>}
    {props.description && <span>Condition: {props.description}</span>}
    {props.speed && <span>Speed: {props.speed}</span>}
    {props.error && <span>Error: {props.error}</span>}
  </div>
);

export default WeatherData;
