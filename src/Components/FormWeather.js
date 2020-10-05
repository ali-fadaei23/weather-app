import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

const FormWeather = (props) => (
  <Form onSubmit={props.onSubmit}>
    <Card style={{ width: "auto", alignItems: "center" }}>
      <Card.Body>
        <Form.Control
          type="text"
          placeholder="City...."
          name="city"
          style={{ width: "150px" }}
        />
        <Button variant="primary" type="submit">
          Get Weather
        </Button>
      </Card.Body>
    </Card>
  </Form>
);

export default FormWeather;
