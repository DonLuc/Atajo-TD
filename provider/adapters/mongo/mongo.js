var mongoose = require('mongoose');
mongoose.connect('mongodb://trafficadmin:trafficadmin@ds033123.mongolab.com:33123/trafficdepartdb');

//mongoose.connect('mongodb://localhost/trafficdb');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error'));
db.once('open', function(){
	var d = new Date();
	var connTime = d.getHours() + ":" + d.getMinutes();


	console.log("Connected to TrafficDB\n" + "Connected time: " + connTime);
});
module.exports = db;