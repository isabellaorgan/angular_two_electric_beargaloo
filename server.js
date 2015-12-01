var mongoose = require('mongoose');
var express = require('express');
var app = express();
var bearsRouter = require(__dirname + '/routes/bears_routes');

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/bear_stream_dev');

app.use(express.static(__dirname + '/build'));

app.use('/api', bearsRouter);

app.listen(process.env.PORT || 3000, function() {
  console.log('server up');
});