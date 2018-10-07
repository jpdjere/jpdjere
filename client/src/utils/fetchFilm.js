export default (code) => {
    return new Promise((resolve, reject) => {
        fetch(`/films?i=${code}`)
            .then(res => resolve(res))
            .catch(e => reject(e))
    })
}