var _log = require('../provider/lib/log');

exports.req = function(obj, cb)
{
	_log.d("Ticket results: " + JSON.stringify(obj));
	result =
	{
		req: obj.data.req,
		res: obj.data.res,
		msg: obj.data.msg
	};


	_log.d("Sending response...");
	obj.RESPONSE = {jobID: jobID, statusCode: obj.data.code, result: result};
	_log.d("Hander sent response " + JSON.stringify(obj));
	cb(obj);

}
