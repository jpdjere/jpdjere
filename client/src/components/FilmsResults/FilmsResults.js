import React from "react";
import fetchFilm from "./../../utils/fetchFilm"

class FilmsResults extends React.Component {
    state = {
      dates:{}
    };

    componentDidUpdate(prevProps){
      console.log("prevProps: ",prevProps);
      const { dates } = this.state;
      const { selectedDay } = this.props;
      if( !selectedDay ){
        return null;
      }
      if(
          !prevProps.selectedDay || 
          prevProps.selectedDay && this.props.selectedDay && this.props.selectedDay.films 
          && prevProps.selectedDay.films[0].code !== this.props.selectedDay.films[0].code
        ){
        if(dates[selectedDay.date]){
          this.setState(({dates}) => ({
            displayDate:dates[selectedDay.date].films
          }))         
        } else {

          const promises = this.props.selectedDay.films.map(film => {
            return fetchFilm(film)
          })
          Promise.all(promises)
            .then(films => {
              console.log(films)
              this.setState(({dates}) => ({
                dates:{
                  ...dates,
                  [selectedDay.date]:films
                },
                displayDate:films
              })) 
            })

        }
      }
    }

    render(){
      const { selectedDay, displayDate } = this.props; 
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
          {
            displayDate &&
              <div>
                { displayDate[0].movie_results[0].original_title }
              </div>
          }
        </div>       
      )

    }
}

export default FilmsResults;