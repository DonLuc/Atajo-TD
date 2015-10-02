var log = require('../provider/lib/log');
var ticketModel = require('../provider/adapters/mongo/models/ticketModel');

exports.req = function(obj, cb)
{
	ticketModel.find().exec(function(err,data){
		if(!err)
		{
			_log.i("Reading tickets data..." + JSON.stringify(data));
			//var tickets = [];
			//tickets.push(data);
			obj.RESPONSE = data;
			cb(obj);
		}else
		{
			_log.d("Error occured while trying to read ticket data");
			obj.RESPONSE = false;
			cb(obj);
		}
	});
}
