import React, { Component } from 'react';
import Titles from './components/titles';
import Form from './components/form';
import Weather from './components/weather';
import './App.css';

class App extends Component {

  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  }

  getWeather = async (e) => {

    e.preventDefault();
    
    const Api_key = '0ebd90fc2a8521b83cdd94b1fb9ac32f';
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${Api_key}`);
    const response = await api_call.json();
    console.log(response);

    if(city && country){
      this.setState({
        temperature: response.main.temp,
        city: response.name,
        country: response.sys.country,
        humidity: response.main.humidity,
        description: response.weather[0].description,
        error: ""
      })
    } else {
      this.setState({
        error: "Please enter the values..."
      })
    }
  }

  render() {
    return (
      <div>
        <Titles />
        <Form loadWeather={this.getWeather}/>
        <Weather 
          temperature={this.state.temperature} 
          country={this.state.country}
          humidity={this.state.humidity}
          description={this.state.description}
          error={this.state.error} />
      </div>
    ) 
  }
}

export default App;
