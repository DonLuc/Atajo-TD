var mongo = require('../mongo');
var mongoose = require('mongoose');
var counterSchema = require('../schema/counters.js');
var _log = require('../../../lib/log');

var counterModel = mongoose.model('Counter',counterSchema);

var getNext = function getNextSeq(name, cb)
{
	_log.i('Find the next sequence: ' + name);
	counterModel.findById({_id: 'userid'}, function(err,curr){
		if(err)
		{
			_log.d("Error occured while attemting to retrieve a sequential value");
		}else
		{
			if(curr.seq > -1)
			{
				curr.seq = curr.seq + 1;
				console.log("Current sequence value: " + curr.seq);
				curr.save(function(err,resp){
					console.log("Respond: " + resp);
					cb(curr.seq);
				});
			}else
			{
				cb(false);
			}
		}
	});
}
module.exports.counterMod = counterModel;
module.exports.getNext = getNext;