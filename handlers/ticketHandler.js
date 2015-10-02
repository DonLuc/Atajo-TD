var mail = require('nodemailer');
var transport = require('nodemailer-sendmail-transport');
var _log = require('../provider/lib/log');
var pdf = require('../provider/adapters/pdf/pdf');
var email = require('../provider/adapters/email/email.js');
var ticketModel = require('../provider/adapters/mongo/models/ticketModel');
var counter = require('../provider/adapters/mongo/models/counterModel');
var fs = require('fs');
PDFDocument = require('pdfkit');

exports.req = function(obj, cb)
{
	
	try
	{
		var msg = {from:"",to:"",subject:"", text:"",encoding: 'utf-8', attachments: []};
		var attachments = [];
		var bcc = [];

	
		
		console.log("Data in Handler: " + JSON.stringify(obj));		
		//Email info		
		var senderName = "LucasNkoana".toLowerCase();
		var receiver = obj.data.msg.driverEmail;
		//var carImage = obj.data.msg.carImage.replace("data: image/jpeg;base64", "");
		//var carImage = carImage.replace("data: image/png;base64", "");


		_log.d("Driver ID: " + obj.data.msg.driverID);
		 
		
		_log.d("==============Response in progress============== " + obj.data.msg.driverID);
		
	
		//Write to pdf================================================
		//var path = pdf.init('ticket ' + obj.data.msg.driverID);
			/*
		var fileName = 'ticket-' + obj.data.msg.driverID;
		pdf.init(fileName);
		pdf.writeData(obj);
*/
		//===================================================================
		

		var fileName = 'ticket-' + obj.data.msg.driverID + '.pdf';
		doc = new PDFDocument();
		path = __dirname + '/TMP/' + fileName;
		
		doc.pipe(fs.createWriteStream(path));

		doc.fontSize(18);
		doc.save().moveTo(0,0);
		
		//doc.moveTo(0,0).rect(0,70,620,20).fillAndStroke();
		doc.text(obj.data.msg.municipal,{align:'center'},0,0);
		doc.moveTo(0,0).rect(0,55,620,20).fillAndStroke();

		doc.moveTo(0, 20);
		doc.fontSize(14);
		doc.text('NOTICE OF TRAFFIC OFFENSE',{align:'center'});
		doc.text('KENNISGEWING VAN VERKEERSOORTRENDING',{align:'center'});
		
		//==================Notice number =================
		//doc.moveTo(0,140);
		doc.rect(0,75,225,30).stroke();
		doc.fontSize(10);
		doc.save().moveTo(100,700);
		
		doc.moveTo(100,700).text("\n\n\n\nCharge Code: " + obj.data.msg.chargeCode,10,30);
		doc.text("DRIVER ID: " + obj.data.msg.driverID ,10,90);
		doc.rect(0,105,225,155).stroke();
		doc.fontSize(8);
		doc.text('\nVEHICLE REGISTRATION NUMBER AND DETAILS\n' +
			'VOERTUIG REGISTRASIE NOMMER EN BESONDERHEDE',5,97);
		doc.fontSize(12);
		doc.text(obj.data.msg.regPlate,5,130);
		doc.text(obj.data.msg.carBrand,5,140 );
		doc.text(obj.data.msg.carType,5,152 );
		
		//var carImagePlace = null;
		var image = new Image();
		image.src = obj.data.msg.carImage;
		doc.image(image.src, 5,160,{width: 180});
		/*
		if(obj.data.msg.carImage != "" || obj.data.msg.carImage !== undefined)	
		{
			var renew = obj.data.msg.carImage.replace('data:image/jpeg;base64', '').toString();
			//var renew = carImagePlace.replace('data: image/png;base64', '').toString();
			doc.image(new Buffer(obj.data.msg.carImage, 'base64'), 5,160,{width: 180});
				
			//doc.image(new Buffer(renew, 'base64'), 5,160,{width: 180});
		}else
		*/
		//{
			//var carImagePlace = "C:/Workspace/car.png";
			//doc.image("C:/Workspace/car.png", 5,160,{width: 100});	
		//}

		//var carImagePlace = "C:/Workspace/car.png";
		//doc.image(carImagePlace, 5,160,{width: 100});

		//Particulars of offense
		doc.rect(225,75,395,185).stroke();
		doc.fontSize(8);
		doc.text('PARTICULARS OF OFFENSE/BESON DERHEDE VAN OORTREDING',300,80);
		doc.fontSize(13);
		doc.text('Art./Sect. 59(4)(b) Wet/Act 93/1996\nOffense Description',230,115);
		doc.fontSize(12);
		doc.text('PLACE OF OFFENSE:\nPLEK VAN OORTREDING:',230,145);
		doc.text(obj.data.msg.municipal,400,145);
		doc.fontSize(8);
		doc.text('MAGISTRATE COURT',230,190);
		doc.text('COURT NAME',230,205);

		doc.text('OFFENCE DATE',390,190);
		doc.text(obj.data.msg.issueDate,400,205);

		//doc.text('TIME',540,190);
		//doc.text('00h00',540,205);
		doc.rect(225,212,395,0.4).fillAndStroke();
		
		doc.rect(225,230,90,30).stroke();
		doc.rect(480,230,90,30).stroke();
		doc.text('DUE DATE', 228,232);
		doc.text(obj.data.msg.dueDate,235, 250);

		doc.text('FINE AMOUNT (R)',485,232);
		doc.text(obj.data.msg.chargeFee,490,250);

		doc.rect(0,260,620,20).fillAndStroke();
		doc.fontSize(14);
		doc.text('PLACE AND METHODS OF PAYMENT:',10,310);
		doc.text('PLEK EN METODE VAN BETALING:',300,310);
		doc.fontSize(10);
		doc.text('1.  COUNTER PAYMENT:',10, 350);
		
		doc.text('1.  TOONBANK BETALINGS:',300,350);
		doc.fontSize(8);
		doc.text(	'Address line 1\n' +
					'Address line 2\n' +
					'Address line 3',130,350);
		doc.text(	'Address line 1\n' +
					'Address line 2\n' +
					'Address line 3',440,350);
		doc.fontSize(10);
		doc.text('2.  BY CHEQUE OR POSTAL ORDER:',10,400);
		doc.text('2.  TJEKS OF POSORDERS:',300,400);
		doc.fontSize(8);
		doc.text('Made payable to: ',10, 415);
		doc.text('Made payable to: ',300, 415);
		doc.text('Municipality Name',110, 415);
		doc.text('Municipality Name',400, 415);
		doc.text('and mailed to:',10, 424);
		doc.text('and mailed to:',300, 424);
		doc.text(	'Postal Address line 1\n' +
					'Postal Address Line 2\n' +
					'Postal Adress Line 3',110, 424);
		doc.text(	'Postal Address line 1\n' +
					'Postal Address Line 2\n' +
					'Postal Adress Line 3',400, 424);
		doc.text('Equiries: 000-000-0000',40,450);
		doc.text('Navrae: 000-000-0000',440,450);
		doc.text('Fax: 000-000-0000',40,465);
		doc.text('Faks: 000-000-0000',420,465);
		doc.rect(0,473,620,0.3).fillAndStroke();
		doc.end();
		_log.d("Written a PDF file");		
		/*
		doc.save().moveTo(70,70).lineTo(70, 200).lineTo(530,200).lineTo(530,70).lineTo(70,70)
		.stroke();
		doc.fontSize('18');
		doc.fillColor('orange');
		doc.text("Traffic Offense Fine",{align: 'center',underline: true});
		doc.fontSize(12);
		doc.text("=================================================================");
					
		doc.text("Driver ID: " + obj.data.msg.driverID);
		doc.text("Charge Code: " + obj.data.msg.chargeCode);
		doc.text("Charge Fee: R" + obj.data.msg.chargeFee);
		doc.fillColor('orange');
		doc.text("=================================================================");
		doc.text("Issued by: Officer Name");
		doc.fillColor('red');
		doc.text("=================================================================");
					// end and display the this.document in the iframe to the right
		
		doc.end();

		_log.d("Written a PDF file");
		//============================================================

		//Send Mail===================================================
		//init: function(officerName,driverEmail,filePath, driverID)
		var sender = 'sender@trafficdep.gov.za';
		var receiver = 'lcsnkn@gmail.com';
		
		//Fill the message object
		msg.from = sender;
		msg.to = receiver;
		msg.subject = "Ticket for traffic offence";
		msg.text = "Please find the attached ticket of a driver with an ID " + obj.data.msg.driverID; 
		attachments = [{filename: 'Traffic offense charge', path: path}];
		transport = mail.createTransport();

		transport.sendMail(msg, function(err, response)
		{
			if(err) throw err;
			_log.d("Response: " + response)
		});

		_log.d("Email sent!");
		_log.d('================================================');
		*/
		//============================================================


		//Save to DB==================================================
	//Create an object to capture data
		//get the counter value
		var counterVal = undefined;
		counter.getNext('userid',function(count)
		{
			if(!count)
			{
				_log.d("Unable to retrieve an increment");
				console.log("Unable to retrieve an increment");
			}else
			{
				counterVal = count;
				console.log("Counter value: " + count);
				console.log("Generated increment: " + count);
				_log.d("Generated increment: " + count);
				var ticketData = 
				{
					_id: counterVal,
					driverID: obj.data.msg.driverID,
					chargeCode: obj.data.msg.chargeCode,
					chargeFee: obj.data.msg.chargeFee,
					registrationPlate: obj.data.msg.regPlate,
					carBrand: obj.data.msg.carBrand,
					carType: obj.data.msg.carType,
					placeOfOffense: obj.data.msg.municipal, 
					dateOfOffense: obj.data.msg.issueDate,
					dueDate: obj.data.msg.dueDate
				};
				var ticketMod = new ticketModel(ticketData);
				ticketMod.save(function(err, tick)
				{
					if(err)
					{
						console.log("Error ocuured while trying to save record")
						obj.RESPONSE = false;
					}else 
					{
						console.log("Ticket was successfully saved!");
						cb(obj);
					}			
				});
			};
		});			


		//============================================================

		result = {req: obj.data.req, res: obj.data.res, msg: obj.data.msg};
		obj.RESPONSE = {jobID: obj.jobID, statusCode: obj.data.code, result: result};
	}catch(err)
	{
		_log.d("Error in handler: " + err);
		//if(err) throw err;
	}
	cb(obj)
}
