var log = require('../provider/lib/log');
var ticketModel = require('../provider/adapters/mongo/models/ticketModel');

exports.req = function(obj,cb)
{


	_log.d("Example Index: " + JSON.stringify(obj));
	
	try
	{
		ticketModel.remove({_id: obj.data.msg},function(err){
			if(!err)
			{
				
				result = {req: obj.data.req, res: obj.data.res, msg: obj.data.msg};
				obj.RESPONSE = {jobID: obj.jobID, statusCode: obj.data.code, result: result};
				
				cb(obj);
			}else
			{
				obj.RESPONSE = false;
				cb(obj);
			}
		});
	}catch(err)
	{
		_log.d("Error: " + err);
	}
	
}