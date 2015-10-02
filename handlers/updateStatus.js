var _log = require('../provider/lib/log');

exports.req = function(obj, cb) {
 
 _log.d("RUN EXAMPLEHANDLER " + JSON.stringify(obj)); 
 _log.d("RUN EXAMPLEHANDLER " + JSON.stringify(cb)); 
}
 