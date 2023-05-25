import { useState } from "react";
import { Card } from "react-bootstrap";
import Col from 'react-bootstrap/Col';
const WeatherDetails = (props) => {
  console.log(props)
   let imageurl = "http://openweathermap.org/img/w/" + props.info.iconcode + ".png"
  return (
    // <div>
    //     <h2>{props.info.date}</h2>
    //     <p>Temperature: {props.info.temp} °F </p>
    //     <p>Feels like: {props.info.feels_like} °F </p>
    //     <p>Low: {props.info.temp_min} °F </p>
    //     <p>High: {props.info.temp_max} °F </p>
    //     <br></br>

    // <div className="cardflex">

    // <div className="container">
      <Col className="align-items-center">
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={imageurl} />
            <Card.Body>
              <Card.Title>Forecast</Card.Title>
              <h2>{props.info.date}</h2>
              <p>Temperature: {props.info.temp} °F </p>
              <p>Feels like: {props.info.feels_like} °F </p>
              <p>Low: {props.info.temp_min} °F </p>
              <p>High: {props.info.temp_max} °F </p>
              <br></br>
            </Card.Body>
          </Card>
      </Col>

      
    // </div>
    // </div>
  );
};

export default WeatherDetails;
