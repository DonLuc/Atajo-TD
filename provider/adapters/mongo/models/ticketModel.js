//ticketModel
var mongo = require('../mongo');
var mongoose = require('mongoose');
var ticketSchema = require('../schema/ticketSchema.js');

try
{
	var ticketModel = mongoose.model('TicketRecord', ticketSchema);	
	console.log('Ticket model created');
}catch(err)
{
	if(err) console.log("Ticket model error: " + err);
}
module.exports = ticketModel;