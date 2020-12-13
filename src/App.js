import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import "./App.css";
import BackgroundClearSky from "./Asset/ClearSky/clear-sky-1.jpg";
import BackgroundHazeySky from "./Asset/Haze/haze.jpg";
import BackgroundCloudySky from "./Asset/Cloudy/cloudy-2.jpg";
import BackgroundSnowySky from "./Asset/Snowy/snowy-1.jpg";
import BackgroundRainySky from "./Asset/Rainy/rainy-1.jpg";
import BackgroundDrizzleSky from "./Asset/Drizzle/drizzle.jpg";
import BackgroundDefault from "./Asset/default.jpg";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { getWeatherInfo, getForecastWeather } from "./ApiService";
import FormWeather from "./Components/FormWeather";
import CurrentWeatherData from "./Components/CurrentWeatherData";
import ForecastWeatherData from "./Components/ForecastWeatherData";

class App extends Component {
  state = {
    backgroundWeather: BackgroundDefault,
    temperature: null,
    selectedCity: null,
    city: null,
    country: null,
    inputValue: "",
    description: null,
    forecast: [],
    humidity: null,
    date: new Date(),
    speed: null,
    error: null,
  };

  constructor(props) {
    super(props);
    // Bind
    this.getCurrentWeather = this.getCurrentWeather.bind(this);
    this.getForecastWeather = this.getForecastWeather.bind(this);
    this.reset = this.reset.bind(this);
    this.toCelsius = this.toCelsius.bind(this);
    this.backgroundWeather = this.backgroundWeather.bind(this);
    this.add = this.add.bind(this);
    this.updateInput = this.updateInput.bind(this);
  }

  backgroundWeather() {
    if (
      this.state.description === "Haze" ||
      this.state.description === "Fog" ||
      this.state.description === "Mist" ||
      this.state.description === "Smoke"
    ) {
      this.setState({ ...this.state, backgroundWeather: BackgroundHazeySky });
    } else if (this.state.description === "Snow") {
      this.setState({ ...this.state, backgroundWeather: BackgroundSnowySky });
    } else if (this.state.description === "Rain") {
      this.setState({ ...this.state, backgroundWeather: BackgroundRainySky });
    } else if (this.state.description === "Clouds") {
      this.setState({ ...this.state, backgroundWeather: BackgroundCloudySky });
    } else if (this.state.description === "Drizzle") {
      this.setState({ ...this.state, backgroundWeather: BackgroundDrizzleSky });
    } else {
      this.setState({ ...this.state, backgroundWeather: BackgroundClearSky });
    }
  }

  reset() {
    this.setState({
      temperature: null,
      selectedCity: null,
      city: null,
      country: null,
      description: null,
      forecast: [],
      humidity: null,
      speed: null,
      error: null,
    });
  }

  toCelsius(temp) {
    const celsius = temp - 273;
    const round = Math.floor(celsius);
    return round.toString().concat("\xB0C");
  }

  add(element, addedText) {
    return element.toString().concat(addedText);
  }

  updateInput(e) {
    this.setState({ inputValue: e.target.value });
  }

  getCurrentWeather(e) {
    e.preventDefault();
    this.setState({ selectedCity: e.target.city.value }, () => {
      getWeatherInfo(this.state.selectedCity)
        .then((data) => {
          this.setState(
            {
              temperature: this.toCelsius(data.main.temp),
              city: data.name,
              country: data.sys.country,
              humidity: this.add(data.main.humidity, "%"),
              description: data.weather[0].main,
              speed: data.wind.speed,
              error: null,
              inputValue: "",
            },
            this.backgroundWeather
          );
        })

        .catch((error) => {
          this.setState({
            temperature: null,
            city: null,
            country: null,
            description: null,
            humidity: null,
            speed: null,
            date: null,
            error: error.message,
          });
        });
    });
  }

  getForecastWeather(e) {
    e.preventDefault();
    getForecastWeather(this.state.selectedCity)
      .then((data) => {
        function formatDate(date) {
          return date.split(" ").slice(0, 1).toString().replace(/-/g, "/");
        }
        this.setState({
          forecast: [
            {
              temp: this.toCelsius(data.list[0].main.temp),
              humidity: this.add(data.list[0].main.humidity, "%"),
              condition: data.list[0].weather[0].main,
              speed: data.list[0].wind.speed,
              date: formatDate(data.list[0].dt_txt),
            },
            {
              temp: this.toCelsius(data.list[4].main.temp),
              humidity: this.add(data.list[4].main.humidity, "%"),
              condition: data.list[4].weather[0].main,
              speed: data.list[4].wind.speed,
              date: formatDate(data.list[4].dt_txt),
            },
            {
              temp: this.toCelsius(data.list[12].main.temp),
              humidity: this.add(data.list[12].main.humidity, "%"),
              condition: data.list[12].weather[0].main,
              speed: data.list[12].wind.speed,
              date: formatDate(data.list[12].dt_txt),
            },
            {
              temp: this.toCelsius(data.list[20].main.temp),
              humidity: this.add(data.list[20].main.humidity, "%"),
              condition: data.list[20].weather[0].main,
              speed: data.list[20].wind.speed,
              date: formatDate(data.list[20].dt_txt),
            },
            {
              temp: this.toCelsius(data.list[28].main.temp),
              humidity: this.add(data.list[28].main.humidity, "%"),
              condition: data.list[28].weather[0].main,
              speed: data.list[28].wind.speed,
              date: formatDate(data.list[28].dt_txt),
            },
          ],
        });
      })
      .catch((error) => {
        this.setState({
          temperature: null,
          city: null,
          country: null,
          description: null,
          humidity: null,
          speed: null,
          date: null,
          error: error.message,
        });
      });
  }

  getWeather() {
    return Promise.all([
      this.getCurrentWeather(),
      this.getForecastWeather(),
    ]).then(([res1, res2]) => {
      console.log("Result", res1, res2);
    });
  }

  render() {
    return (
      <Container id="main">
        <Row>
          <Col xs={10} md={8} style={{ paddingLeft: "0", paddingRight: "0" }}>
            <div>
              <div className="weather-info">
                <span className="temperature">{this.state.temperature}</span>
                <span className="location">{this.state.city}</span>
              </div>

              <img
                className="img-weather"
                src={this.state.backgroundWeather}
                alt={""}
              />
            </div>
          </Col>
          <Col xs={6} md={4}>
            <div id="background-weather">
              <div className="blur-background-weather">
                <FormWeather
                  onSubmit={this.getCurrentWeather}
                  inputValue={this.state.inputValue}
                  onChange={this.updateInput}
                />
                {this.state.city !== null ? (
                  <CurrentWeatherData
                    temperature={this.state.temperature}
                    city={this.state.city}
                    country={this.state.country}
                    humidity={this.state.humidity}
                    speed={this.state.speed}
                    description={this.state.description}
                  />
                ) : (
                  <div>
                    <CurrentWeatherData error={this.state.error} />
                  </div>
                )}

                <ForecastWeatherData
                  onClick={this.getForecastWeather}
                  forecast={this.state.forecast.map((item, index) =>
                    this.state.forecast.length !== 0 ? (
                      <div className="forecast-data" key={index}>
                        <div>
                          <span>Temperature {item.temp}</span>
                        </div>
                        <div>
                          <span>Humidity {item.humidity}</span>
                        </div>
                        <div>
                          <span>Condition {item.condition}</span>
                        </div>
                        <div>
                          <span>Speed {item.speed}</span>
                        </div>

                        <div>
                          <span>Date {item.date}</span>
                        </div>
                      </div>
                    ) : null
                  )}
                />

                <div>
                  <Button
                    className="btn-reset-weather"
                    variant="primary"
                    type="click"
                    onClick={this.reset}
                  >
                    Reset Weather
                  </Button>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
