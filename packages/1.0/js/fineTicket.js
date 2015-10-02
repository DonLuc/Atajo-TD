//var validate = require('validator');
_fineTicket =
{
	model: [],
	PHOTOS: [],
	flash: false,

	onExit: function()
	{
		var _ = this;
	},

	onLoaded: function()
	{
		
		//$("#divDisplay").fadeIn(1000);
		$('.child').hide();
		$('.parent').click(function() {
		 $('.child').slideUp();
		$(this).find('ul').slideToggle();
		});
		
		layout.attach('#fineTicketFront');
		layout.attach('#ticketSet');
		var _ = this;
		if(_fineTicket.PHOTOS === undefined)
		{
			_fineTicket.PHOTOS = [];
		}
	},


	//Test torch
	torch: function()
	{
		alert("In torch function");
		window.plugins.flashlight.available(function(isAvail){
			if(isAvail)
			{
				//switch off
				if(_fineTicket.flash)
				{
					window.plugins.flashlight.switchOff();
					_fineTicket.flash = false;
					$('#light').removeClass("switchOn");
				}else
				{
					window.plugins.flashlight.switchOn();
					$('#light').addClass("switchOn");
					_fineTicket.flash = true;
				}
			}else
			{
				alert("This device doesn't have a flashlight.");
			}
		});
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
		$scope.carImages = _fineTicket.PHOTOS;
	},
	_fineCtrl: function()
	{
		e = document.getElementById('ticketSet__FACE');
		scope = angular.element(e).scope();
		scope.$apply(function(){
			scope.carImages = _fineTicket.PHOTOS;
		});
	},

	getTickets: function($scope)
	{



	},
	sendTicket: function()
	{
		alert("About to send a ticket");
	
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
	//Capture image
	camBusy : false,
	//carImage: {at:"",img:""},
	

	  capturePhoto : function() 
	  {
	  	alert("About to capture image");
	   	

	    try 
	    {

	    	if($('#txtID').val() == "" ||$('#txtCode').val() == ""
			||$('#txtPlate').val() =="" || $('#txtChargeFee').val() == ""
			|| $('#selType').val() == "" || $('#selBrand').val() == ""
			|| $('#selMunicipal').val() == "")
			{
				alert("Fill in the required information before taking a picture.");
				return;
			}else


		    	_fineTicket.checkInsert();

		        if(_fineTicket.camBusy) 
		          { 
		            return; 
		          }

		          _fineTicket.camBusy = true;

		          navigator.camera.getPicture(function(imageData) 
		          {


		            _log.d('Driver image data --> '+imageData.substring(0,100));

		                imageData = 'data:image/jpeg;base64,'+ imageData;
		            _fineTicket.PHOTOS.push({at:moment().format('LLL'), img: imageData});

					_fineTicket._fineCtrl();
		            _fineTicket.camBusy = false;
		         },

		         function(fail) 
		         {

		                _fineTicket.camBusy = false;
		                _log.d('GETPICTURE --> Failed because:' + fail);
		         },

		         {
		           quality : 75,
		           destinationType : 0,
		           saveToPhotoAlbum : false,
		           targetWidth: 640,
		           targetHeight: 640 }
		         );
		 
	      }catch(e) 
	      {
		      _fineTicket.camBusy = false;
		      _error.add("capturePhoto", e);
	      }
		
	   },
	   /*
	   testValidate: function()
	   {
	   		alert("Is email: " + validate.isEmail($('#txtEmail').val()));
	   },
	   */
	   testProgress: function()
	   {
			//$('progress').val(100);
			var progressbar = $('#progressbar'),
	        max = progressbar.attr('max'),
	        time = (1000/max)*5,    
	        value = progressbar.val();
	 
	    	var loading = function() 
	    	{
		        value += 1;
		        addValue = progressbar.val(value);
		         
		        //$('.progress-value').html(value + '%');
		 
		        if (value == max) 
		        {
		            clearInterval(animate);                    
		        }
		    };
		 
		    var animate = setInterval(function() {
		        loading();
		    }, time);


	   },



	/*
	progressTicket: function()
	{
		var progressTimer, 
			progressBar = $('#progressbar'), 
			progressLabel = $('#progress-label'),
			dialogButtons = [{
				text: "Cancel ticket",
				click: cancelTicket
			}];
				dialog = $("#dialog" ).dialog(
				{
		        autoOpen: false,
		        closeOnEscape: false,
		        resizable: false,
		        buttons: dialogButtons,
		        open: function() 
		        {
		          progressTimer = setTimeout( progress,2000);
		        },
		        beforeClose: function() 
		        {
			        downloadButton.button( "option", 
			         {
			            disabled: false,
			            label: "Start Download"
	          		});
	        	}
	      	}),

			downloadButton = $( "#downloadButton" )
	        .button()
	        .on( "click", function() 
	        {
	          $(this).button("option", 
	          {
	            disabled: true,
	            label: "Sending ticket..."
	          });
	          dialog.dialog( "open" );
	        });

	        progressbar.progressbar(
	        {
		      	value: false,
		      	change: function() 
		      	{
		        	progressLabel.text( "Current Progress: " + progressbar.progressbar( "value" ) + "%" );
	      		},
	      		complete: function() 
	      		{
			        progressLabel.text( "Ticket sent!" );
			        dialog.dialog( "option", "buttons", [
			        {
			          text: "Close",
			          click: closeDownload
			        }]);
			        $(".ui-dialog button").last().focus();
		      	}
			});

		progress: function() 
		{
			var val = progressbar.progressbar( "value" ) || 0;
			progressbar.progressbar( "value", val + Math.floor( Math.random() * 3 ) );

			if ( val <= 99 ) 
			{
			  progressTimer = setTimeout(progress, 50);
			}
		}

		function closeDownload() 
		{
	      clearTimeout( progressTimer );
	      dialog
	        .dialog( "option", "buttons", dialogButtons )
	        .dialog( "close" );
	      progressbar.progressbar( "value", false );
	      progressLabel
	        .text( "Starting download..." );
	      downloadButton.focus();
	    }
	},	
	*/
	PhotoCtrl: function($scope)
	{
		$scope.carImages = _fineTicket.PHOTOS;
	},

	checkInsert: function()
	{
		if($('#txtID').val() == "" ||$('#txtCode').val() == ""
			||$('#txtPlate').val() =="" || $('#txtChargeFee').val() == ""
			|| $('#selType').val() == "" || $('#selBrand').val() == ""
			|| $('#selMunicipal').val() == "")
		{
			alert("Fill in the required information before taking a picture.");
			return;
		}
	},

	testModal: function()
	{
		var type = "WARNING";
		var title = "Closing App";
		var msg = "Are you sure you want to close?";
		var showCancel = false;
		var xml = "<b>" + msg + "</b>";
		_modal.show(type,title,xml,showCancel,function()
		{
			_log.d("OK is tabbed");
		},function()
		{
			_log.d("Cancel is tabbed");

		});
	},

	sendJob : function(code,name,description,allowDuplicate,clearOnDone,lockUI,cb)
    {
    	//alert("In job 1");
    	/*
    	if(_fineTicket.carImage.at == "" && _fineTicket.carImage.img == "")
    	{
    		alert("Please capture the image of the car!");
    		return;
    	};
*/
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
      
      	//alert("in job 2");
      var dateIssue = $('#issueDate').val();
      var dateDue = $('#dueDate').val(); 
      alert("Date of issue: " + dateDue + "\n" +
      		"Due date: " + dateIssue);
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
			alert("Charge fee has a value");
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

		if($('#txtPlate').val() == "")
		{
			alert("Please enter the plate registration number");
		}

		if($('#selType').val() == "")
		{
			alert("Select the type of the car");
			$('selType').focus();	
			return;
		};
		if($('#selBrand').val() == "")
		{
			alert("Select the car brand");
			$('#selBrand').focus();	
			return;
		};
		if($('#selMunicipal').val() == "")
		{
			alert("Select the Metropolitan Municipality");
			$('#selMunicipal').focus();	
			return;
		};
		if($('#issueDate').val() == "")
		{
			alert("Specify date of issue.");
			$('#issueDate').focus();	
			return;	
		};
		if($('#dueDate').val() == "")
		{
			alert("Specify due date.");
			$('#dueDate').focus();	
			return;

		}

/*
		if($('txtEmail').value != "")
		{
			var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
			if(!filter.test($('#txtEmail').val()))
			{
				alert('Enter the correct email address.')
				$('#txtEmail').focus();
				return;
			}
		}
		*/
		/*
			_fineTicket.capturePhoto();
		*/
      	rawData =
      	{
      		driverID: $('#txtID').val(),
      		chargeCode: $('#txtCode').val(),
      		chargeFee: $('#txtChargeFee').val(),
      		driverEmail: $('#txtEmail').val(),
      		regPlate: $('#txtPlate').val(),
      		carBrand: $('#selBrand').val(),
      		carType: $('#selType').val(),
      		municipal: $('#selMunicipal').val(),
      		issueDate: $('#issueDate').val(),
      		dueDate: $('#dueDate').val(),
      		carImage: _fineTicket.PHOTOS[0]
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
      _fineTicket.PHOTOS.pop();

      //_jobQueue.currJobs.push({jobID:jobid,jobName: name});

      

      }catch(err)
      {

          alert(err);

      }

    }

};;