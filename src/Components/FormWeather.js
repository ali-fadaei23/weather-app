import React from "react";
import "./FormWeather.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const FormWeather = (props) => (
  <Form id="form" onSubmit={props.onSubmit}>
    <div className="form-weather">
      <Form.Control
        className="input-location"
        type="text"
        placeholder="City...."
        name="city"
      />

      <Button className="btn-get-weather btn-primary" type="submit">
        Get Weather
      </Button>
    </div>
  </Form>
);

export default FormWeather;
