//Counter schema
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

Counters = new Schema({
	_id: String,
	seq: Number
});
module.exports = Counters;