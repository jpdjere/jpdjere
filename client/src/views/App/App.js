import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
class App extends Component {
  state = { films: [] }
  componentDidMount(){
    console.log("If proxy works, should return users object. Remember to start backend server on localhost:3001:");
    fetch('/data')
     .then(res => res.json())
     .then(films => {
       console.log(films);
       this.setState({
         films:films
       })
     });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div style={{width:"50%",height:"50px"}}>
          <CalendarHeatmap
            startDate={new Date('2018-08-01')}
            endDate={new Date('2018-09-25')}
            values={this.state.films}
            onMouseOver={(event, value) => this.setState({
              selectedDay:value
            })}
            classForValue={(value) => {
              if (!value) {
                return 'color-empty';
              }
              return `color-scale-${value.count}`;
            }}
          />
        </div>
        <div>
          <p>{this.state.selectedDay && this.state.selectedDay.title}</p>
        </div>
      </div>
    );
  }
}

export default App;
