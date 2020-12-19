import React from "react";
import "./CurrentWeatherData.css";
import { Container, Row, Col } from "react-bootstrap";

const WeatherData = (props) => (
  <Container>
    <Row>
      <Col lg={12} style={{ padding: "0" }}>
        <div id="main-weather-data">
          <div className="leftside-current-weather">
            <div>{props.temperature && <span> Temperature </span>}</div>
            <div>{props.city && props.country && <span> Location</span>}</div>
            <div>{props.humidity && <span> Humidity </span>}</div>
            <div>{props.description && <span> Condition </span>}</div>
            <div>{props.speed && <span> Speed </span>}</div>
            <div>{props.error && <span> Error </span>}</div>
          </div>
          <div className="rightside-current-weather">
            <div>{props.temperature && <span>{props.temperature}</span>}</div>
            <div>
              {props.city && props.country && (
                <span>
                  {props.city},{props.country}
                </span>
              )}
            </div>
            <div>{props.humidity && <span>{props.humidity}</span>}</div>
            <div>{props.description && <span>{props.description}</span>}</div>
            <div>{props.speed && <span>{props.speed}</span>}</div>
            <div>{props.error && <span>{props.error}</span>}</div>
          </div>
        </div>
      </Col>
    </Row>
  </Container>
);

export default WeatherData;
