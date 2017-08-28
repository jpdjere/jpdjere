import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class App extends Component {

  componentDidMount(){
    fetch('/users')
      .then(res => res.json())
      .then(data => console.log(data));
    fetch('/nlu')
      .then(res => res.json())
      .then(data => console.log(data));
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <a href="/users">Click me</a>
      </div>
    );
  }
}

export default App;
