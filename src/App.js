import React from "react";
import Titles from "./components/titles";
import Form from "./components/form";
import Weather from "./components/weather";
import Icon from "./components/icon";

class App extends React.Component {
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined,
    icon: undefined,
    originalTemp: undefined,
    fColor: "#333333",
    cColor: "#808080",
    lat: undefined,
    lon: undefined,
    res: undefined,
    loadingImage: false,
    container: false
  };
  render() {
    return (
      <div className="app">
        <Titles />
        <Form loadWeather={this.getWeather} loadLocation={this.getLocation} />
        <div className="container">
          {this.state.container && <Weather
            temperature={this.state.temperature}
            city={this.state.city}
            country={this.state.country}
            humidity={this.state.humidity}
            description={this.state.description}
            error={this.state.error}
            originalTemp={this.state.originalTemp}
            cColor={this.state.cColor}
            fColor={this.state.fColor}
            changeToC={this.changeToC}
            changeToF={this.changeToF}
          />}
          {this.state.loadingImage && <div className="spinner">
        <div className="cube1"></div>
        <div className="cube2"></div>
        </div>}
          {this.state.container && <Icon
            showIcon={this.state.city}
            icon={this.getIcon(this.state.icon)}
          />}
        </div>
      </div>
    );
  }

  getLocation = () => {
    navigator.geolocation.getCurrentPosition(pos => {
      this.setState({
        lon: pos.coords.longitude.toString(),
        lat: pos.coords.latitude.toString()
      });
    });
    const apiKey = "573afc957413e9e09af33290f06c7669";
    setTimeout(
      function() {
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${
            this.state.lat
          }&lon=${this.state.lon}&appid=${apiKey}`
        )
          .then(res => res.json())
          .then(json => (json &&
            this.setState({
              container: true,
              loadingImage: false,
              res: json,
              temperature: json.main.temp,
              city: json.name,
              country: json.sys.country,
              humidity: json.main.humidity,
              description: json.weather[0].description,
              error: "",
              icon: json.weather[0].icon,
              originalTemp: Math.round((json.main.temp * 9) / 5 - 459.67)
            }))
          );
    
          console.log(this.state.res);
      }.bind(this), 
      8000
    );
    this.setState({
      loadingImage: true,
      container: false
    })

  };
  changeToC = () => {
    const newC = Math.round((this.state.temperature - 32) * (5 / 9));
    this.setState({
      cColor: "#333333",
      fColor: "#808080",
      originalTemp: newC
    });
  };
  changeToF = () => {
    const newF = Math.round((this.state.temperature * 9) / 5 - 459.67);
    this.setState({
      cColor: "#808080",
      fColor: "#333333",
      originalTemp: newF
    });
  };
  getWeather = async e => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const apiKey = "573afc957413e9e09af33290f06c7669";
    const apiCall = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}`
    );
    const response = await apiCall.json();
    if (city && country) {
      this.setState({
        container: true,
        temperature: response.main.temp,
        city: response.name,
        country: response.sys.country,
        humidity: response.main.humidity,
        description: response.weather[0].description,
        error: "",
        icon: response.weather[0].icon,
        originalTemp: Math.round((response.main.temp * 9) / 5 - 459.67)
      });
    } else {
      this.setState({
        error: "Please enter the values..."
      });
    }
    console.log(response);
  };
  getIcon = iconCode => {
    switch (iconCode) {
      case "01d":
        return "CLEAR_DAY";
      case "01n":
        return "CLEAR_NIGHT";
      case "02n":
        return "PARTLY_CLOUDY_NIGHT";
      case "02d":
        return "PARTLY_CLOUDY_DAY";
      case "03n":
        return "CLOUDY";
      case "03d":
        return "CLOUDY";
      case "04d":
        return "CLOUDY";
      case "09d":
        return "RAIN";
      case "10d":
        return "RAIN";
      case "11d":
        return "CLOUDY";
      case "13d":
        return "SNOW";
      case "50d":
        return "FOG";
      case "04n":
        return "CLOUDY";
      case "09n":
        return "RAIN";
      case "10n":
        return "RAIN";
      case "11n":
        return "CLOUDY";
      case "13n":
        return "SNOW";
      case "50n":
        return "FOG";
      default:
        return "clear-day";
    }
    // const iconurl = "http://openweathermap.org/img/w/" + iconCode + ".png";
    // return iconurl;
  };
}
export default App;
