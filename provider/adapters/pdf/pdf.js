PDFDocument = require('pdfkit');
var fs = require('fs');

var pdf =
{
	doc: null,

	init: function(fileName)
	{
		try
		{
			this.doc = new PDFDocument({"Title":"Ticket Fine"});
			var path = __dirname + '/TMP/' + fileName + '.pdf';		

			//var stream = this.doc.pipe(blobStream());
			this.doc.pipe(fs.createWriteStream(path));
			this.save();
			//return path;
		}catch(err)
		{
			//_log.d("")
			//if(err) throw err;

		}

	},

	writeData: function(obj)
	{
		try
		{
			this.doc.moveTo(70,70).lineTo(70, 200).lineTo(530,200).lineTo(530,70).lineTo(70,70)
			.stroke();
			this.doc.fontSize('18');
			this.doc.fillColor('orange');
			this.doc.text("Traffic Offense Fine",{align: 'center',underline: true});
			this.doc.fontSize(12);
			this.doc.text("=========================================================================");
			
			this.doc.fontColor('black');
			this.doc.text("Driver ID:" + obj.data.msg.driverID);
			this.doc.text("Charge Code: " + obj.data.msg.chargeCode);
			this.doc.text("Charge Fee: R" + obj.data.msg.chargeFee);
			this.doc.fillColor('orange');
			this.doc.text("=========================================================================");
			this.doc.text("Issued by: ");
			this.doc.fillColor('red');
			this.doc.text("=========================================================================");
			// end and display the this.document in the iframe to the right
			this.doc.text("Due date: DD Month YEAR");
			this.doc.end();
		
		}catch(err)
		{
			//if(err) throw err;
		}	
	}	
}
module.exports = pdf;