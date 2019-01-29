module.exports = (films) => {
     return films.reduce((acc, currentValue, currentIndex) => {
        if(
            currentIndex === 0 || 
            (acc[acc.length-1] && acc[acc.length-1].date !== currentValue[1])
        ){
            return acc.concat([{
                date:currentValue[1],
                films:[{title:currentValue[0],code:currentValue[2]}]
            }])
        }
        else if(acc[acc.length-1] && acc[acc.length-1].date === currentValue[1]){
            const lastFilms = [...acc].slice(-1)[0].films;
            const last = [...lastFilms,{title:currentValue[0],code:currentValue[2]}];
            const tempAcc = [...acc];
            tempAcc[tempAcc.length-1].films = last;
            return [...tempAcc]
        }
        return acc;
    },[]).map(film => {
        // console.log('\n\n\n\n\nfilm',film)
        return {
            ...film,
            count:film.films.length
        }
    });
};