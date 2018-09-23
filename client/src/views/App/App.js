import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
class App extends Component {
  constructor(){
    super();
    const lastDay = new Date();
    // today.setDate(1);
    const firstDay = new Date()
    firstDay.setDate(1);
    firstDay.setMonth(lastDay.getMonth()-6);
    this.state = { 
      films: [],
      dates: {
        lastDay,
        firstDay
      }
    }
    this.seePrevMonth = this.seePrevMonth.bind(this);
  }
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

  seePrevMonth(){
    this.setState({
      dates:{
        lastDay:new Date(this.state.dates.lastDay.setMonth(this.state.dates.lastDay.getMonth()-3)),
        firstDay:new Date(this.state.dates.firstDay.setMonth(this.state.dates.firstDay.getMonth()-3)),
      }
    })
  }

  render() {
    const {films , dates: { lastDay, firstDay }, selectedDay} = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div style={{width:"50%",height:"50px"}}>
          <CalendarHeatmap
            startDate={firstDay}
            endDate={lastDay}
            values={films}
            onMouseOver={(event, value) => {
              console.log(value);
              this.setState({
                selectedDay:value
              }
            )}}
            classForValue={(value) => {
              if (!value) {
                return 'color-empty';
              }
              return `color-scale-${value.count}`;
            }}
          />
        </div>
        <button onClick={this.seePrevMonth}>See previous month</button>
        <div>
            {
              selectedDay &&
                <div>
                  <p>{selectedDay.date}</p>
                  <ul>
                    {selectedDay.films.map(film => {
                      return <li>{film}</li>;
                    })}
                  </ul>
                </div>
            }
        </div>
      </div>
    );
  }
}

export default App;
