import React from "react";
import { Tab, Col, Row, Nav } from "react-bootstrap";

const WeatherForecastData = (props) => (
  <Tab.Container id="left-tabs-example">
    <Row>
      <Col sm={2}>
        <Nav variant="pills" className="flex-column">
          <Nav.Item>
            <Nav.Link eventKey="first" active="enable" onClick={props.onClick}>
              Forecast 5 Days
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Col>
      <Col sm={9}>
        <Tab.Content>
          <Tab.Pane eventKey="first">
            <div style={{ color: "#ffffff" }}>
              <div>{props.date && <span>date: {props.date}</span>}</div>
              <div>{props.temp && <span>Temperature: {props.temp}</span>}</div>
            </div>
          </Tab.Pane>
        </Tab.Content>
      </Col>
    </Row>
  </Tab.Container>
);

export default WeatherForecastData;
