import React, { Component } from 'react';
import './App.css';
import Header from "./../../components/Header/Header"
import Films from "./../Films/Films"

class App extends Component {

  render() {
    return (
      <div>
        <Header />
        <Films />
      </div>
    );
  }
}

export default App;
