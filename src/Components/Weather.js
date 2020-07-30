import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const Weather = (props) => (
  <Form onSubmit={props.getWeather}>
    <Form.Control
      type="text"
      placeholder="City...."
      name="city"
      style={{ width: "150px" }}
    />
    
    <Form.Control
      type="text"
      placeholder="Country...."
      name="country"
      style={{ width: "150px" }}
    />

    <Button variant="primary" type="submit">
      Get Weather
    </Button>
  </Form>
);

export default Weather;
