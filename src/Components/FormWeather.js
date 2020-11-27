import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const FormWeather = (props) => (
  <Form
    onSubmit={props.onSubmit}
    style={{ width: "50%", alignItems: "center", margin: " 15px auto " }}
  >
    <div style={{ margin: "5px auto" }}>
      <Form.Control
        type="text"
        placeholder="City...."
        name="city"
        style={{ width: "150px" }}
      />
      <Button variant="primary" type="submit" style={{ margin: "5px" }}>
        Get Weather
      </Button>
    </div>
  </Form>
);

export default FormWeather;
