import React from "react";
import "./ForecastWeatherData.css";
import { Button } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";

const WeatherForecastData = (props) => (
  <Container>
    <Row>
      <Col style={{ padding: "0" }}>
        <div id="forecast-container">
          <div
            style={{
              marginTop: "1%",
            }}
          >
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
      </Col>
    </Row>
  </Container>
);

export default WeatherForecastData;
