import { useState } from "react";
import { Button } from "react-bootstrap";
import { Card } from "react-bootstrap";
import Row from "react-bootstrap/Row";

import WeatherDetails from "./WeatherDetails";
import Input from "./Input";

const WeatherApp = () => {
  const [name, setName] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [forecast, setForecast] = useState([]);

  const fetchWeatherApp = async () => {
    const apiKey = "efdd832268c65d9d80425369707ef308";
    let apiUrl = "";

    
    if (zipcode) {
      apiUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zipcode},us&units=imperial&exclude=current,minutely,hourly,alerts&APPID=${apiKey}`;
    } else if (name) {
      
      apiUrl = `https://api.openweathermap.org/data/2.5/weather?name=${name}&units=imperial&exclude=current,minutely,hourly,alerts&APPID=${apiKey}`;
    }

    try {
      if (apiUrl) {
        const dataCurrent = await getWeather(apiUrl);
        const dataForecast = await getWeather(
          `https://api.openweathermap.org/data/2.5/forecast?zip=${zipcode},us&units=imperial&APPID=${apiKey}`
        );

    
        const forecast = dataForecast.list
          .filter((data) => data.dt_txt.includes("12:00:00"))
          .map((data) => {
            data.main.description = data.weather[0].description;
            return {
              ...data.main,
              iconcode: data.weather[0].icon,
            };
          });

        const combinedData = combineCurrentAndForecast(dataCurrent, forecast);

        setName(combinedData.name);
        setForecast(combinedData.forecast);
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const handleTextChange = (input) => {
    const isZipCode = /^\d+$/.test(input);

    if (isZipCode) {
      setZipcode(input);
    } else {
      setName(input);
    }
  };

  const getWeather = async (url) => {
    const data = await fetch(url);
    const weatherData = await data.json();
    return weatherData;
  };

  const combineCurrentAndForecast = (current, forecast) => {
    let name = current?.name || "";
    let daysOfWeek = getDaysOfWeek(forecast);

    const completeForecast = forecast.map((info, id) => {
      return {
        ...info,
        date: daysOfWeek[id] || "",
      };
    });

    return { name, forecast: completeForecast };
  };

  const getDaysOfWeek = (forecast) => {
    const date = new Date();
    return forecast.map(
      (info, id) =>
        `${date.getMonth() + 1}-${date.getDate() + id}-${date.getFullYear()}`
    );
  };

  return (
    <div>
      <Input onInputChange={handleTextChange}></Input>
      <h2>{name}</h2>
      <Row lg={3} md={3} sm={2}>
        {!forecast || forecast.length <= 0
          ? null
          : forecast.map((info) => (
              <WeatherDetails info={info} key={info.date} />
            ))}
      </Row>
      <Button onClick={fetchWeatherApp}>More Weather</Button>
    </div>
  );
};

export default WeatherApp;
