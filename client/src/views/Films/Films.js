import React, { Component } from "react";
import FilmsGraph from './../../components/FilmsGraph/FilmsGraph'
import FilmsResults from './../../components/FilmsResults/FilmsResults'
import Typography from '@material-ui/core/Typography';
import './Films.css'

export default class Films extends Component {
    constructor(){
        super()
        this.state = {
            selectedDay: null
        }
        this.selectDay = this.selectDay.bind(this);
    }

    selectDay(value){
        this.setState({
            selectedDay:value
        })
    }

    displayDate(selectedDay){
        if(!selectedDay){
            return <Typography variant="title" color="inherit" className="typo">Select a date</Typography>;
        }
        const dateObj = new Date(selectedDay.date);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const displayDate = dateObj.toLocaleDateString('en-GB', options);
        return (
            <Typography variant="title" color="inherit" className="typo">
            {displayDate}
            </Typography>
        )
    }

    render(){
        return (
            <div className="FilmsContainer">
                <div>
                    <FilmsGraph selectDay={this.selectDay} />
                </div>
                <div className="FilmsResults" >
                    <div>{this.displayDate(this.state.selectedDay)}</div>
                    <FilmsResults selectedDay={this.state.selectedDay} />
                </div>
            </div>
        )
    }
}