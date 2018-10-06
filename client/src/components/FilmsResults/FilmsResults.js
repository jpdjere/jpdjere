import React from "react";

const FilmsResults = ({selectedDay}) => {
    return (
      <div className="FilmsResults">
        {
          selectedDay &&
            <div>
              <p className="FilmsResults__date">{selectedDay.date}</p>
              <ul className="FilmsResults__list">
                {selectedDay.films.map(film => {
                  return <li key={film}>{film}</li>;
                })}
              </ul>
            </div>
        }
      </div>       
    )
}

export default FilmsResults;