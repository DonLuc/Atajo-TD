var mail = require('nodemailer');
var _log = require('../../lib/log.js');
var transport = require('nodemailer-sendmail-transport');
var email =
{
	sender: null,
	recipient: null,
	msg: {from:"",to:"",subject:"", text:"",encoding: 'utf-8', attachments: []},
	attachments: [],
	bcc: [],

	init: function(officerName,driverEmail,filePath, driverID)
	{
		try
		{
			this.sender = officerName + "@trafficdepartment.gov";
			this.recipient = driverEmail;
			this.msg.from = this.sender;
			this.msg.to = this.recipient;
			this.msg.subject = "Ticket for traffic offence";
			this.msg.text = "Please find the attached ticket of a driver with an ID " + driverID; 
			//this.attachments = [{filename: 'Ticket', path: filePath}];	
			transport = mail.createTransport();
		}catch(err)
		{
			_log.d("Email error: " + err);
		}
	},

	sendMail: function()
	{
		try
		{
			transport.sendMail(this.msg, function(err, response)
				{
					if(err) throw err;
					_log.d("Response: " + response)
				});
		}catch(err)
		{
			if(err)
			{
				_log.d("Email error: " + err);
			}
		}
	}
}
module.exports = email;