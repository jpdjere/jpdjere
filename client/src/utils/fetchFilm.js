export default (film) => {
    return new Promise((resolve, reject) => {
        if(film.code){
            fetch(`/filmsByCode?i=${film.code}`)
                .then(res => resolve(res))
                .catch(e => reject(e))
        } else {
            fetch(`/filmsByTitle?t=${film.title}`)
            .then(res => resolve(res))
            .catch(e => reject(e))           
        }
    })
}