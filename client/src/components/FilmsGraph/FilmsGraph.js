import React, { Component } from "react";
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';

export default class FilmsGraph extends Component {

  constructor(){
    super();
    const lastDay = new Date();
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
  }

  componentDidMount(){
    fetch('/data')
        .then(res => res.json())
        .then(films => {
            this.setState({
                films:films
            })
        });
  }

  changeMonths = (months) => {
    this.setState({
      dates:{
        lastDay:new Date(this.state.dates.lastDay.setMonth(this.state.dates.lastDay.getMonth()+months)),
        firstDay:new Date(this.state.dates.firstDay.setMonth(this.state.dates.firstDay.getMonth()+months)),
      }
    })
  }

  render(){
    const {films , dates: { lastDay, firstDay }} = this.state;
    return (
      <div className="FilmsGraph">
        <div style={{width:"90%"}}>
          <CalendarHeatmap
            startDate={firstDay}
            endDate={lastDay}
            values={films}
            onMouseOver={(event, value) => this.props.selectDay(value)}
            onMouseOut={(event, value) => this.props.selectDay(null)}
            classForValue={(value) => {
              if (!value) {
                return 'color-empty';
              }
              return `color-scale-${value.count}`;
            }}
          />
        </div>
        <button onClick={() => this.changeMonths(-3)}>See previous month</button>
        <button onClick={() => this.changeMonths(3)}>See next month</button>
      </div>
    )
  }

}