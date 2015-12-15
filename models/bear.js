var mongoose = require('mongoose');

var bearSchema = new mongoose.Schema({
  name: String,
  flavor: {type: String, default: 'grizzly'},
  fishPreference: {type: String, default: 'salmons'},
  wranglerID: String
});

module.exports = mongoose.model('Bear', bearSchema);
