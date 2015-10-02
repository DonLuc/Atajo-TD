_fineView =
{
	model: [],

	onExit: function()
	{
		var _ = this;
	},

	onLoaded: function()
	{
		var _ = this;
	},

	onMessage: function()
	{

	},

	testId: function()
	{
		alert('Test 2');
		var msg;
		msg = "ID Number: " + $('#txtID').val();
		alert(msg);
	},


	fineCtrl: function($scope)
	{


	},

	getTickets: function($scope)
	{



	},
	sendTicket: function()
	{

	
	try
		{

			alert("About to send a ticket");
			var jName = "Ticket_Fine";
			var jDesc = "Issued ticket";
			var rawData1 = 	"Driver's ID: " + $('#txtID') + "\n" +
							"Charge code: " + $('#txtCode') + "\n" +
							"Charge Fee: " + $('#txtChargeFee') + "\n" +
							"Driver's email: " + $('#txtEmail');
			var rawData2 = 	{msg: rawData1, email: $('#txtEmail')};
			data = {action: 'recordTicket', data: rawData2};
			var duplicate = true;
			var clear = false;
			var lock = false;

			response =
			{
				code: 10,
				res: "Ticket sent!",
				req: "Send ticket",
				msg: data			
			};

			cb = function(err)
			{	
				if(err) throw err;
			};
			JOB = 
			{
				jobName: jName,
				jobDesc: jDesc,
				data: response,
				allowDuplicate: duplicate,
				clearOnDone: clear,
				lockUI: lock,
				callback: cb
			};
			jobID = jobQueue.add(JOB);
			alert("Job ID: " + jobID + "\n" + "Resp Code" + response.code + "\nAction: " + data.action);
		}catch(err)
		{
			alert("Control error: " + err);
		}

	},

	sendJob : function(code,name,description,allowDuplicate,clearOnDone,lockUI,cb)
    {

      if(typeof code == 'undefined') 
      	{  
      		code = 0; 
      	}
      if(typeof name == 'undefined') 
      	{  
      		name = "Issue ticket"; 
      	}
      if(typeof description == 'undefined') 
      	{  
      		description = "Sends a ticket";
      	}
      if(typeof allowDuplicate == 'undefined') 
      	{  
      		allowDuplicate = false; 
      	}
      if(typeof clearOnDone == 'undefined') 
      	{  
      		clearOnDone = false; 
      	}
      if(typeof lockUI == 'undefined') 
      	{  
      		lockUI = false; 
      	}
      if(typeof cb == 'undefined') 
      	{  
      		cb = false; 
      	}
      

      try
      {
        //alert("Charge Fee R" + $('#txtChargeFee').val());
      	alert("ID length: " + $('#txtID').val().length);
      	if($('#txtID').val() == "")
		{
			alert("ID has to have a value");
			$('#txtID').focus();
			return;
		}else if($('#txtID').val().length != 13)
		{
			alert("The ID Number should be 13 digits long!");
			$('#txtID').val("");
			$('#txtID').focus();
			return;
		};

		if($('#txtChargeFee').val() == "")
		{
			alert("Charge fee has to have a value");
			$('#txtChargeFee').focus();
			return;
		};

		if($('#txtCode').val() == "")
		{
			alert("Charge code has to have a value");
			$('#txtChargeFee').focus();
			return;
		}else if($('#txtCode').val().length != 4)
		{
			alert("Charge code should be 4 digits long!");
			$('#txtCode').val("");
			$('#txtCode').focus();
			return;
		};;

		/*
		else if($('#txtCode').val().length != 4)
		{
			alert("The code should be 4 digits long");
			$();
		};

*/

      	rawData =
      	{
      		driverID: $('#txtID').val(),
      		chargeCode: $('#txtCode').val(),
      		chargeFee: $('#txtChargeFee').val(),
      		driverEmail: $('#txtEmail').val()

      	};

        response = { code : code , req : "req", res : "res", msg : rawData};
        jobData = { action:'recordTicket', data: response};

      JOB = 
      {
        jobName: name,
        jobDesc: description,
        data: jobData,
        allowDuplicate: allowDuplicate,
        clearOnDone: clearOnDone,
        lockUI: lockUI,
        callback: cb
      };
      
      _log.d("JOB = " + JSON.stringify(JOB));
      jobid = jobQueue.add(JOB);
      //_jobQueue.currJobs.push({jobID:jobid,jobName: name});

        

      }catch(err)
      {

          alert(err);

      }

    }
};;