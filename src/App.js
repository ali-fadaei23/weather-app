import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import "./App.css";
import BackgroundClearSky from "./Asset/ClearSky/clear-sky-1.jpg";
import BackgroundHazeySky from "./Asset/Haze/haze.jpg";
import BackgroundCloudySky from "./Asset/Cloudy/cloudy-1.jpg";
import BackgroundSnowySky from "./Asset/Snowy/snowy-1.jpg";
import BackgroundRainySky from "./Asset/Rainy/rainy-1.jpg";
import BackgroundDrizzleSky from "./Asset/Drizzle/drizzle.jpg";
import BackgroundDefault from "./Asset/default.jpg";
import ClearIcon from "./Asset/Icons/clear.png";
import CloudyIcon from "./Asset/Icons/cloudy.png";
import RainyIcon from "./Asset/Icons/rainy.png";
import MistIcon from "./Asset/Icons/mist.png";
import SnowyIcon from "./Asset/Icons/snowy.png";
import DrizzleIcon from "./Asset/Icons/drizzle.png";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { getWeatherInfo, getForecastWeather } from "./ApiService";
import FormWeather from "./Components/FormWeather";
import CurrentWeatherData from "./Components/CurrentWeatherData";
import ForecastWeatherData from "./Components/ForecastWeatherData";

class App extends Component {
  state = {
    visible: false,
    animation: false,
    backgroundWeather: BackgroundDefault,
    icon: null,
    temperature: null,
    selectedCity: null,
    city: null,
    country: null,
    inputValue: "",
    description: null,
    forecast: [],
    humidity: null,
    date: null,
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
    this.add = this.add.bind(this);
    this.updateInput = this.updateInput.bind(this);
    this.styleWeather = this.styleWeather.bind(this);
  }

  styleWeather() {
    this.backgroundWeatherUpdate();
    this.iconWeatherUpdate();
  }

  iconWeatherUpdate() {
    if (
      this.state.description === "Haze" ||
      this.state.description === "Fog" ||
      this.state.description === "Mist" ||
      this.state.description === "Smoke"
    ) {
      this.setState((prevState) => ({ ...prevState, icon: MistIcon }));
    } else if (this.state.description === "Snow") {
      this.setState((prevState) => ({ ...prevState, icon: SnowyIcon }));
    } else if (this.state.description === "Rain") {
      this.setState((prevState) => ({ ...prevState, icon: RainyIcon }));
    } else if (this.state.description === "Clouds") {
      this.setState((prevState) => ({ ...prevState, icon: CloudyIcon }));
    } else if (this.state.description === "Drizzle") {
      this.setState((prevState) => ({ ...prevState, icon: DrizzleIcon }));
    } else {
      this.setState((prevState) => ({ ...prevState, icon: ClearIcon }));
    }
  }

  backgroundWeatherUpdate() {
    if (
      this.state.description === "Haze" ||
      this.state.description === "Fog" ||
      this.state.description === "Mist" ||
      this.state.description === "Smoke"
    ) {
      this.setState((prevState) => ({
        ...prevState,
        backgroundWeather: BackgroundHazeySky,
      }));
    } else if (this.state.description === "Snow") {
      this.setState((prevState) => ({
        ...prevState,
        backgroundWeather: BackgroundSnowySky,
      }));
    } else if (this.state.description === "Rain") {
      this.setState((prevState) => ({
        ...prevState,
        backgroundWeather: BackgroundRainySky,
      }));
    } else if (this.state.description === "Clouds") {
      this.setState((prevState) => ({
        ...prevState,
        backgroundWeather: BackgroundCloudySky,
      }));
    } else if (this.state.description === "Drizzle") {
      this.setState((prevState) => ({
        ...prevState,
        backgroundWeather: BackgroundDrizzleSky,
      }));
    } else {
      this.setState((prevState) => ({
        ...prevState,
        backgroundWeather: BackgroundClearSky,
      }));
    }
  }

  reset() {
    this.setState({
      temperature: null,
      backgroundWeather: BackgroundDefault,
      icon: null,
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
              speed: this.add(data.wind.speed, " mi/h"),
              error: null,
              date: new Date().toLocaleString(),
              inputValue: "",
              visible: true,
              animation: true,
            },
            this.styleWeather
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
              speed: this.add(data.list[0].wind.speed, " mi/h"),
              date: formatDate(data.list[0].dt_txt),
            },
            {
              temp: this.toCelsius(data.list[4].main.temp),
              humidity: this.add(data.list[4].main.humidity, "%"),
              condition: data.list[4].weather[0].main,
              speed: this.add(data.list[4].wind.speed, " mi/h"),
              date: formatDate(data.list[4].dt_txt),
            },
            {
              temp: this.toCelsius(data.list[12].main.temp),
              humidity: this.add(data.list[12].main.humidity, "%"),
              condition: data.list[12].weather[0].main,
              speed: this.add(data.list[12].wind.speed, " mi/h"),
              date: formatDate(data.list[12].dt_txt),
            },
            {
              temp: this.toCelsius(data.list[20].main.temp),
              humidity: this.add(data.list[20].main.humidity, "%"),
              condition: data.list[20].weather[0].main,
              speed: this.add(data.list[20].wind.speed, " mi/h"),
              date: formatDate(data.list[20].dt_txt),
            },
            {
              temp: this.toCelsius(data.list[28].main.temp),
              humidity: this.add(data.list[28].main.humidity, "%"),
              condition: data.list[28].weather[0].main,
              speed: this.add(data.list[28].wind.speed, " mi/h"),
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
          <Col lg={8} md={4} style={{ paddingLeft: "0", paddingRight: "0" }}>
            <Col className="weather-info">
              <span
                className="temperature"
                style={{
                  animation: this.state.temperature
                    ? "Weather 3s ease 0s forwards"
                    : "",
                }}
              >
                {this.state.temperature}
              </span>
              <div>
                <span className="date">{this.state.date}</span>

                <span className="location">{this.state.city}</span>
              </div>
              {this.state.icon && (
                <img
                  className="icon-weather"
                  style={{
                    animation: this.state.icon
                      ? "backgroundWeather 3s ease 0s forwards"
                      : "",
                  }}
                  src={this.state.icon}
                  alt={""}
                />
              )}
            </Col>
            <img
              className="img-weather"
              style={{
                animation: this.state.temperature
                  ? "backgroundWeather 3s ease -1s forwards"
                  : "",
              }}
              src={this.state.backgroundWeather}
              alt={""}
            />
          </Col>
          <Col lg={4}>
            <div id="background-weather">
              <div className="blur-background-weather">
                <div>
                  <FormWeather
                    reset={this.reset}
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
                    isVisible={this.state.visible}
                    onClick={this.getForecastWeather}
                    forecast={this.state.forecast.map((item, index) =>
                      this.state.forecast.length !== 0 ? (
                        <div className="forecast-data" key={index}>
                          <div className="leftside-forecast-weather">
                            <div>
                              <span>Temperature </span>
                            </div>
                            <div>
                              <span>Humidity </span>
                            </div>
                            <div>
                              <span>Condition </span>
                            </div>
                            <div>
                              <span>Speed </span>
                            </div>
                            <div>
                              <span>Date </span>
                            </div>
                          </div>
                          <div className="rightside-forecast-weather">
                            <div>
                              <span>{item.temp}</span>
                            </div>
                            <div>
                              <span>{item.humidity}</span>
                            </div>
                            <div>
                              <span>{item.condition}</span>
                            </div>
                            <div>
                              <span>{item.speed}</span>
                            </div>
                            <div>
                              <span>{item.date}</span>
                            </div>
                          </div>
                        </div>
                      ) : null
                    )}
                  />
                </div>
              </div>
              <div></div>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
