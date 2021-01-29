import React from "react";
import "./FormWeather.css";
import Button from "react-bootstrap/Button";
import { Container, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";

const FormWeather = (props) => (
  <Container>
    <Row>
      <Col>
        <Form id="form" onSubmit={props.onSubmit}>
          <div className="form-weather ">
            <Form.Control
              className="input-location "
              type="text"
              placeholder="Location . . ."
              name="city"
              value={props.inputValue}
              onChange={props.onChange}
            />
          </div>
          <div className="btn-weather ">
            <Button
              className="btn-get-weather"
              type="submit"
              onClick={props.reset}
            >
              Get Weather
            </Button>
          </div>
        </Form>
      </Col>
    </Row>
  </Container>
);

export default FormWeather;
