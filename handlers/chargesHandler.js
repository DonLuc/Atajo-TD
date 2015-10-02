var _log = require('../provider/lib/log');

exports.req = function(obj, cb)
{
	
	obj.RESPONSE =
	[
		{id: 1,charge_code: 1000,charge_word: 'Failed to comply with instruction, direction given by a traffic officer, or obstructed, hindered or interfered with the exercise of a power or performance of a duty', penalty: 10, demerit_points: 1, charge_fee: 500},
		{id: 2,charge_code: 1001,charge_word: 'Failed to comply with a signal from a traffic officer', penalty: 5, demerit_points: 0, charge_fee: 250},
		{id: 3,charge_code: 1002,charge_word: 'Failed to license a vehicle with the appropriate registering authority', penalty: 10, demerit_points: 1, charge_fee: 500},
		{id: 4,charge_code: 1003,charge_word: 'Failed to register a vehicle with the appropriateregistering authority', penalty: 10, demerit_points: 1, charge_fee: 500},
		{id: 5,charge_code: 1200,charge_word: 'Operated a specially classified vehicle contrary to the condition of its classification', penalty: 10, demerit_points: 1, charge_fee: 500},
		{id: 6,charge_code: 1201,charge_word: 'Operated a specially classified vehicle contrary to the condition of its classification', penalty: 10, demerit_points: 1, charge_fee: 500},
		{id: 7,charge_code: 1202,charge_word: 'Personalised licence number holder, with cancellation, failed to submit the personalised licence plates and documentation concerned', penalty: 10, demerit_points: 1, charge_fee: 500},
		{id: 8,charge_code: 1203,charge_word: 'Vehicle displaying a licence number on a number plate which did not comply with SANS 1116 specifications', penalty: 10, demerit_points: 1, charge_fee: 500},
		{id: 9,charge_code: 1204,charge_word: 'Operated a vehicle with a number plate that did not bear a self destructive certification mark', penalty: 10, demerit_points: 1, charge_fee: 500},
		{id: 10,charge_code: 1205,charge_word: 'Vehicle with a number plate which did not have a yellow or white retro-reflective surface', penalty: 10, demerit_points: 1, charge_fee: 500},
		{id: 11,charge_code: 1206,charge_word: 'Vehicle with a number plate that did not have letters and figures of the correct colours or not only black letters and figures on a yellow retro-reflective surface', penalty: 10, demerit_points: 1, charge_fee: 500},
		{id: 12,charge_code: 1207,charge_word: 'Vehicle with a number plate with a logo or landscape not on a white retro-reflective surface', penalty: 10, demerit_points: 1, charge_fee: 500},
		{id: 13,charge_code: 1208,charge_word: 'Vehicle with a number plate not clearly legible or visible', penalty: 10, demerit_points: 1, charge_fee: 500},
		{id: 14,charge_code: 1209,charge_word: 'Vehicle with a number plate on which the letters/ figures were not arranged as prescribed.', penalty: 10, demerit_points: 1, charge_fee: 500},
		{id: 15,charge_code: 1210,charge_word: 'Number plate on the rear with letters and figures of 60 mm whilst 75 mm. would have fitted the illuminated space, or a number plate which was not the size of the illuminated space provided', penalty: 10, demerit_points: 1, charge_fee: 500},
		{id: 16,charge_code: 1211,charge_word: 'Only affixed one number plate to a motor vehicle, except a motor cycle & trailer', penalty: 10, demerit_points: 1, charge_fee: 500},
		{id: 17,charge_code: 1212,charge_word: 'Failed to affix both number plates of a vehicle thereto', penalty: 'C', demerit_points: 6, charge_fee: 0},
		{id: 18,charge_code: 1213,charge_word: 'Displayed a licence number, or anything purporting to be a licence number, not applicable to the vehicle', penalty: 'C', demerit_points: 6, charge_fee: 0},
		{id: 19,charge_code: 1214,charge_word: 'Vehicle with a licence number which was in any way obscured or had become illegible', penalty: 5, demerit_points: 0, charge_fee: 250},
		{id: 20,charge_code: 1215,charge_word: 'Vehicle with a design appearing on a number plate or number plate holder', penalty: 5, demerit_points: 0, charge_fee: 250},
		{id: 21,charge_code: 1216,charge_word: 'Vehicle with a design appearing on both number plates or number plate holders', penalty: 10, demerit_points: 1, charge_fee: 500},
		{id: 22,charge_code: 1217,charge_word: 'Vehicle whereon appeared within 150 mm of the licence number anything which was not a component part of the standard equipment or construction of that vehicle', penalty: 5, demerit_points: 0, charge_fee: 250},
		{id: 23,charge_code: 1218,charge_word: 'Vehicle whereon appeared within 150 mm of both licence numbers anything which was not a component part of the standard equipment or construction of that vehicle', penalty: 20, demerit_points: 3, charge_fee: 1000},
		{id: 24,charge_code: 1219,charge_word: 'Vehicle deemed to be registered and licensed in a prescribed territory, not complying with the legislation of that territory', penalty: 'C', demerit_points: 6, charge_fee: 0},
		{id: 25,charge_code: 1220,charge_word: 'Vehicle registered in another territory but failed to display distinguishing signs of country concerned as allocated in terms of the Convention.', penalty: 5, demerit_points: 0, charge_fee: 250},
		{id: 26,charge_code: 1221,charge_word: 'Vehicle registered in the RSA with a distinguishing sign not allocated to the Republic in terms of the Convention', penalty: 5, demerit_points: 0, charge_fee: 250},
		{id: 27,charge_code: 1222,charge_word: 'Vehicle registered in the Republic displaying a logo or landscape other than that determined by the MEC.', penalty: 5, demerit_points: 0, charge_fee: 250},
		{id: 28,charge_code: 1223,charge_word: 'Vehicle with a number plate with a licence number not applicable to the vehicle or anything purporting to be a licence number', penalty: 5, demerit_points: 0, charge_fee: 250},
		{id: 29,charge_code: 1224,charge_word: 'Vehicle with a number plate with a licence number not applicable to the vehicle or anything purporting to be a licence number', penalty: 'C', demerit_points: 6, charge_fee: 0},
		{id: 30,charge_code: 1225,charge_word: 'Vehicle with each number plate not displaying the same licence number, letter type, colours and logo or landscape', penalty: 'C', demerit_points: 6, charge_fee: 0},
		{id: 31,charge_code: 1226,charge_word: 'Vehicle displaying a number plate which did not comply with the standard specifications SANS 1116', penalty: 20, demerit_points: 3, charge_fee: 1000},
		{id: 32,charge_code: 1227,charge_word: 'Number plate so affixed to the vehicle that it was easily detachable', penalty: 10, demerit_points: 1, charge_fee: 500}
	];
	_log.d("Load charges: " + JSON.stringify(obj));
	cb(obj);
}