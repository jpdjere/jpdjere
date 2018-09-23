const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const { authorize, getNewToken, listMajors} = require('./../utils/spreadsheetImport');
const formatFilms = require('./../utils/formatFilms');

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


module.exports = router;
