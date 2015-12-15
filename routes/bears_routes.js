var express = require('express');
var bodyParser = require('body-parser');
var Bear = require(__dirname + '/../models/bear');
var handleError = require(__dirname + '/../lib/handleServerError');
var eatAuth = require(__dirname + '/../lib/eat_auth');

var bearsRouter = module.exports = exports = express.Router();

bearsRouter.use(bodyParser.json());
bearsRouter.get('/bears', eatAuth, function(req, res) {
  Bear.find({wranglerId: req.user._id}, function(err, data) {
    if (err) return handleError(err, res);

    res.json(data);
  });
});

bearsRouter.get('/allbears', function(req, res) {
  Bear.find({}, function(err, data) {
    if (err) return handleError(err, res);

    res.json(data);
  });
});

bearsRouter.post('/bears', eatAuth, function(req, res) {
  var newBear = new Bear(req.body);
  newBear.wranglerId = req.user._id;
  newBear.wrangler = req.user.username;
  newBear.save(function(err, data) {
    if (err) return handleError(err, res);

    res.json(data);
  });
});

bearsRouter.put('/bears/:id', eatAuth, function(req, res) {
  var bearData = req.body;
  delete bearData._id;
  Bear.update({_id: req.params.id}, bearData, function(err) {
    if (err) return handleError(err, res);

    res.json({msg: 'success!'});
  });
});

bearsRouter.delete('/bears/:id', eatAuth, function(req, res) {
  Bear.remove({_id: req.params.id}, function(err) {
    if (err) return handleError(err, res);

    res.json({msg: 'success!'});
  });
});