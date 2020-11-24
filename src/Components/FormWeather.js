import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

const FormWeather = (props) => (
  <Form onSubmit={props.onSubmit}>
    <Card style={{ width: "50%", alignItems: "center", margin: " 15px auto " }}>
      <Card.Body style={{ margin: "5px auto" }}>
        <div>
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
      </Card.Body>
    </Card>
  </Form>
);

export default FormWeather;
