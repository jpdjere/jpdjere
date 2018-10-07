import React from "react";
import fetchFilm from "./../../utils/fetchFilm"

class FilmsResults extends React.Component {

    componentDidUpdate(prevProps){
      if(!prevProps.selectedDay || prevProps.selectedDay && this.props.selectedDay && prevProps.selectedDay.films[0].code !== this.props.selectedDay.films[0].code){
        const promises = this.props.selectedDay.films.map(film => {
          return fetchFilm(film.code)
        })
        Promise.all(promises)
          .then(films => {
            this.setState({
              apiFilmInfo:films
            })
          })
      }
    }

    render(){
      const { selectedDay } = this.props; 
      return (
        <div className="FilmsResults">
          {
            selectedDay &&
              <div>
                <p className="FilmsResults__date">{selectedDay.date}</p>
                <ul className="FilmsResults__list">
                  {selectedDay.films.map(film => {
                    return <li key={film.title}>{film.title}</li>;
                  })}
                </ul>
              </div>
          }
        </div>       
      )

    }
}

export default FilmsResults;