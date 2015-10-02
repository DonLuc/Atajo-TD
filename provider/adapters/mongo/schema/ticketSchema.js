//ticket schema
var mongoose = require('mongoose'),
	Schema = mongoose.Schema; 

ticketSchema = new Schema({
	//ticket_id: Schema.Types.ObjectId,
	_id: String,
	driverID: Number,
	chargeCode: Number,
	chargeFee: Number,
	registrationPlate: String,
	carBrand: String,
	carType: String,
	placeOfOffense: String,
	dateOfOffense: String,
	dueDate: String
});
module.exports = ticketSchema;