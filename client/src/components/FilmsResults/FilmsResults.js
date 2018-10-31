import React from "react";
import fetchFilm from "./../../utils/fetchFilm"

class FilmsResults extends React.Component {
    state = {
      dates:{}
    };

    componentDidUpdate(prevProps){
      console.log("New prevProps: ",JSON.stringify(prevProps,null,2));
      const { dates } = this.state;
      const { selectedDay } = this.props;
      if( !selectedDay ){
        return null;
      }
      if(prevProps.selectedDay){
        console.log('prevProps.selectedDay.films[0].code !== this.props.selectedDay.films[0].code')
        console.log(prevProps.selectedDay.films[0].title +' !==  '+this.props.selectedDay.films[0].title)
      }
      if(
          !prevProps.selectedDay || 
          (prevProps.selectedDay.films[0].title !== this.props.selectedDay.films[0].title)
        ){
        if(dates[selectedDay.date]){
          this.setState(({dates}) => ({
            displayDate:dates[selectedDay.date]
          }))     
        } else {

          const promises = this.props.selectedDay.films.map(film => {
            return fetchFilm(film)
          })
          Promise.all(promises)
            .then(films => {
              this.setState(({dates}) => ({
                dates:{
                  ...dates,
                  [selectedDay.date]:films
                },
                displayDate:films
              }),() => {
                console.log("State updated after request")
              }) 
            })

        }
      }else {
        console.log("Conditions not met.")
      }
    }

    render(){
      const { selectedDay } = this.props; 
      const { displayDate } = this.state; 
      return (
        <div className="FilmsResults">
          <div>
            {
              displayDate && displayDate.map(film => {
                return (
                  film && 
                  <div key={film.title}>
                    <p><b>{film.original_title}</b> - {film.release_date.slice(0,4)}</p>
                    <p>{film.overview}</p>
                  </div>
                )
              })
            }
          </div>
        </div>       
      )

    }
}

export default FilmsResults;