var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('sr5', { title: 'Chummer From Another' });
});

router.get('/angularminimum', function(req, res) {
  res.render('angularminimum.html');
});

router.get('/partials/:name', function(req, res) {
  var name = req.params.name;
  res.render('partials/' + name);
});

module.exports = router;
