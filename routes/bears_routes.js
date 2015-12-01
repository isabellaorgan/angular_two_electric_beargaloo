var express = require('express');
var bodyParser = require('body-parser');
var Bear = require(__dirname + '/../models/bear');
var handleError = require(__dirname + '/../lib/handleServerError');

var bearsRouter = module.exports = exports = express.Router();

bearsRouter.get('/bears', function(req, res) {
  Bear.find({}, function(err, data) {
    if (err) return handleError(err, res);

    res.json(data);
  });
});

bearsRouter.post('/bears', bodyParser.json(), function(req, res) {
  var newBear = new Bear(req.body);
  newBear.save(function(err, data) {
    if (err) return handleError(err, res);

    res.json(data);
  });
});

bearsRouter.put('/bears/:id', bodyParser.json(), function(req, res) {
  var bearData = req.body;
  delete bearData._id;
  Bear.update({_id: req.params.id}, bearData, function(err) {
    if (err) return handleError(err, res);

    res.json({msg: 'success!'});
  });
});

bearsRouter.delete('/bears/:id', function(req, res) {
  Bear.remove({_id: req.params.id}, function(err) {
    if (err) return handleError(err, res);

    res.json({msg: 'success!'});
  });
});