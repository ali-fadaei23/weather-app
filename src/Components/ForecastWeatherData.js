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
          <Tab.Pane eventKey="first" style={{ display: "flex" }}>
            {props.forecast}
          </Tab.Pane>
        </Tab.Content>
      </Col>
    </Row>
  </Tab.Container>
);

export default WeatherForecastData;
