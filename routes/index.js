var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/users', function(req, res, next) {
  res.send({"from":"me"});
});

router.get('/nlu', function(req, res, next) {
  var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
  var natural_language_understanding = new NaturalLanguageUnderstandingV1({
    'username': 'a463eb17-4d0b-45fd-8cbe-4d04acbc78fc',
    'password': 'sjykdqbLQwrO',
    'version_date': '2017-02-27'
  });

  var parameters = {
    'text': 'IBM is an American multinational technology company headquartered in Armonk, New York, United States, with operations in over 170 countries.',
    'features': {
      'entities': {
        'emotion': true,
        'sentiment': true,
        'limit': 2
      },
      'keywords': {
        'emotion': true,
        'sentiment': true,
        'limit': 2
      }
    }
  }

  natural_language_understanding.analyze(parameters, function(err, response) {
    if (err)
      console.log('error:', err);
    else
      console.log(JSON.stringify(response, null, 2));
      res.send(response);
  });

});

module.exports = router;
