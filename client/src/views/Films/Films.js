import React, { Component } from "react";
import FilmsGraph from './../../components/FilmsGraph/FilmsGraph'
import FilmsResults from './../../components/FilmsResults/FilmsResults'
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

    render(){
        return (
            <div className="FilmsContainer">
                <div>
                    <FilmsGraph selectDay={this.selectDay} />
                </div>
                <div className="FilmsResults" >
                    <FilmsResults selectedDay={this.state.selectedDay} />
                </div>
            </div>
        )
    }
}