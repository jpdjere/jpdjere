module.exports = (films) => {
     return films.reduce((acc, currentValue, currentIndex) => {
        if(
            currentIndex === 0 || 
            (acc[acc.length-1] && acc[acc.length-1].date !== currentValue[1])
        ){
            return acc.concat([{
                date:currentValue[1],
                films:[currentValue[0]]
            }])
        }
        else if(acc[acc.length-1] && acc[acc.length-1].date === currentValue[1]){
            const lastFilms = [...acc].slice(-1)[0].films;
            const last = [...lastFilms,currentValue[0]];
            const tempAcc = [...acc];
            tempAcc[tempAcc.length-1].films = last;
            return [...tempAcc]
        }
        return acc;
    },[]).map(film => {
        return {
            ...film,
            count:film.films.length
        }
    });
};