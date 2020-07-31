import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

const Weather = (props) => (
  <Form onSubmit={props.getWeather}>
    <DropdownButton name="city" title="Dropdown button">
      <Dropdown.Item>Tehran</Dropdown.Item>
      <Dropdown.Item>Shiraz</Dropdown.Item>
      <Dropdown.Item>Ahvaz</Dropdown.Item>
    </DropdownButton>
    <Form.Control
      type="text"
      placeholder="City...."
      name="city"
      style={{ width: "150px" }}
    />
    <Button variant="primary" type="submit">
      Get Weather
    </Button>
  </Form>
);

export default Weather;
