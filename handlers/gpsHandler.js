var _log = require('../provider/lib/log');

exports.req = function(obj, cb)
{
	obj.RESPONSE =
	[
		{
			lat: -25.5226464,
			lon: 28.100572599999964
		}
	]

	_log.d("Assigned coordinates: " + JSON.stringify(obj));
	cb(obj);
}
