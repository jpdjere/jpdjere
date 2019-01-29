const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const axios = require('axios');
const { authorize, getNewToken, listMajors} = require('./../utils/spreadsheetImport');
const formatFilms = require('./../utils/formatFilms');
const config = require('./../config/config')

/* GET home page. */
router.get('/data', function(req, res, next) {
  // Load client secrets from a local file.
  fs.readFile(path.join(__dirname, './../config/credentials.json'), (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    // Authorize a client with credentials, then call the Google Sheets API.
    authorize(JSON.parse(content), listMajors)
      .then(data => {
        res.send(formatFilms(data));
      })
      .catch(e => {
        console.log(e);
        res.status(200).send(e);
      })
  });
});

;
router.get('/filmsByCode', (req, res) => {
  const reqParam = `https://api.themoviedb.org/3/find/${req.query.i}?api_key=${config.moviedbApiKey}&language=en-US&external_source=imdb_id`;
  axios(reqParam)
    .then(response => {
      const filmDataWithPoster = addPosterToFilmData(response.data.movie_results[0]);
      return res.send(filmDataWithPoster)
    })
    .catch(e => console.log(e) && res.status(500).send(e))

})

router.get('/filmsByTitle', (req, res) => {
  const reqParam = `https://api.themoviedb.org/3/search/movie?api_key=${config.moviedbApiKey}&language=en-US&query=${req.query.t}&page=1&include_adult=false`;
  axios(reqParam)
    .then(response => {

      const filmDataWithPoster = addPosterToFilmData(response.data.results[0]);
      return res.send(filmDataWithPoster)
    })
    .catch(e => console.log(e) && res.status(500).send(e))
})

function addPosterToFilmData(filmData){
  return {
    ...filmData,
    posterURL: `https://image.tmdb.org/t/p/w500/${filmData.poster_path}`
  }
}

module.exports = router;
