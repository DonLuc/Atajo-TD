_chargebook =
{

	model: [],

	onLoaded: function()
	{
		var _ = this;

		_model.getAll('chargebook', function(model){
			_chargebook.model = model;
		});
		layout.attach('#chargebookFront');
		layout.attach('#chargebookHelp');
		var reply = confirm("You can use a textbox on the top corner to search a charge by keyword.");

		if(reply)
		{
			document.getElementById('searchcontinnerinner').focus();
		}



	},

	openURL: function(url)
	{
		alert("Open URL");
		var ref = window.open(url);
		//ref.addeventlister("loadstart", function(){alert("Loading: " + url)});         
	},



	onExit: function()
	{
		var _ = this;
	},

	Ctrl: function($scope)
	{
		$scope.myCharges = _chargebook.model;
	}
};;
_device =
{
	deviceInfo: {},
	/*
	deviceInfo:
	{
			devCordova: '',
			devPlatform: 'undefined',
			devModel: '',
			devUuid: '',
			devVersion: '',
	}
	,
*/
	onLoaded: function()
	{
		var _ = this;

		layout.attach('#deviceFront');
		_device.getInfo();
		_device._Ctrl();

		alert(deviceInfo.devPlatform);
		alert(_device.deviceInfo.devName);

	},

	Ctrl: function($scope)
	{
		$scope.deviceInfo = _device.deviceInfo; 
	},

	_Ctrl: function()
	{
		e = document.getElementById('deviceFront__FACE');
		scope = angular.element(e).scope();
		scope.$apply(function(){
			scope.deviceInfo = _device.deviceInfo; 
		}); 
	},

	getInfo: function()
	{
		//Device name
		//_device.deviceInfo.devName = window.device.name;
		//alert(_device.deviceInfo.devName); 
		//Cordova version
		_device.deviceInfo.devCordova = window.device.cordova;
		//alert(_device.deviceInfo.devPlatform);

		//Platform
		_device.deviceInfo.devPlatform = window.device.platform;

		//UUID
		_device.deviceInfo.devUuid = window.device.uuid;

		//version
		_device.deviceInfo.devVersion = window.device.version;

		//model
		_device.deviceInfo.devModel = window.device.model;
		_device._Ctrl();
	},

	tryMe: function()
	{
		_device.deviceInfo.devPlatform = window.device.platform;


		alert(_device.deviceInfo.devPlatform);


		//alert(device.name);
	}




};;
_driverImage = {

    model : [ ],
    PHOTOS : [ ],
    
    onExit : function() 
    { 
      var _ = this;
    },

    onLoaded: function () 
    { 
      var _ = this;


       if(typeof PHOTOS == 'undefined')
       {
           PHOTOS = [];

       }

    	 layout.attach('#driverImageFront');

		setTimeout(function() 
      {
				_driverImage._Ctrl();  
			}
			, 1000);
    	
    },

    onMessage : function() 
    {


    },

    Ctrl : function($scope)
    {
    	$scope.drivers = _driverImage.PHOTOS;
    },

    _Ctrl : function()
  	{
	    e = document.getElementById('vehicleImageFront__FRONT');
	    
	    scope = angular.element(e).scope();
	    
	    scope.$apply(function() 
	    {  
	       scope.drivers = _driverImage.PHOTOS;
	    }); 
    },


  camBusy : false,
  
  capturePhoto : function() 
  {

    try 
    {

        if(_driverImage.camBusy) 
          { 
            return; 
          }

          _driverImage.camBusy = true;

          navigator.camera.getPicture(function(imageData) 
          {


            _log.d('GETPICTURE --> '+imageData.substring(0,100));

                imageData = 'data:image/jpeg;base64,'+imageData;


                      _driverImage.PHOTOS.push( 
                        { 
                          at: moment().format('LLL'), img: imageData 
                        });
                      _driverImage._Ctrl();

                 _driverImage.camBusy = false;

         },

         function(fail) 
         {

                _driverImage.camBusy = false;
                _log.d('GETPICTURE --> Failed because:');
         },

         {
           quality : 75,
           destinationType : 0,
           saveToPhotoAlbum : false,
           targetWidth: 640,
           targetHeight: 640 }
         );


      } catch (e) {

      _driverImage.camBusy = false;

      _error.add("capturePhoto", e);

      }



   },

   
  isPhotoRemoving : false,
  removePhoto : function(idx) 
  {

      if(_driverImage.isPhotoRemoving) 
        { 
          return; 
        }

      _driverImage.isPhotoRemoving = true;


      _driverImage.PHOTOS.splice(idx,1);


      _driverImage._Ctrl();

       setTimeout(function()
        {        
          _driverImage.isPhotoRemoving = false;  
        }, 500);

      _.currScrolls[0].refresh();
  }
};;
_example = {

    model : [],
    onExit : function() { 
		var _ = this;
    },

    onLoaded: function () { var _ = this;


    	 _model.getAll('example', function(model) 
		 {
    	 	_example.model = model;
    	 });

    	 layout.attach('#exampleFront');
    	 layout.attach('#exampleHelp');

		setTimeout(function() {    _example._Ctrl();  }, 500);
    	
    },

    onMessage : function() {



    },

    getData : function()
    {
	 	//alert(JSON.stringify(_example.model));
		
		try
		{
			jobName = "Don Job";
			jobDesc = "STATUS UPDATE <x style='color:red'> ('Status')</x>";
			jobData = { action:'updateStatus', status:'Don Status'}
			jobQueue.addJob(jobName, jobDesc, jobData, false, true);
	
			
		}catch(err)
		{
			alert("An error occured: " + err);
		}
		
		
	}
	
    ,
    Ctrl : function($scope)
    {
    	$scope.data = _example.model;
    }
    ,
    _Ctrl : function()
  	{
	    e = document.getElementById('exampleFront__FACE');
	    scope = angular.element(e).scope();
	    scope.$apply(function() 
	    {  
	      scope.data = _example.model;
	    }); 
  }


}
;;
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
_gps = {

    model : [ ],
    GPS : [ ],


    onExit : function() 
    { 
      var _ = this;
    },

    onLoaded: function () 
    { 
      var _ = this;

           	
      		_model.getAll('GPS', function(data)
      		{
      			_gps.model = data;
      		});

           _gps.GPS.lat = '';
           _gps.GPS.lon = '';

    	 layout.attach('#gpsFront');

		setTimeout(
			function() {
				_gps._Ctrl();  
			}
			, 1000);
    	
    },

    onMessage : function() 
    {


    },

    Ctrl : function($scope)
    {
    	$scope.gps = _gps.GPS;
    	
    	e = document.getElementById('gpsFront__FACE');
    	$scope.mapWidth = e.offsetWidth; 
    },

    _Ctrl : function()
  	{
	    e = document.getElementById('gpsFront__FACE');
	    
	    scope = angular.element(e).scope();
	    
	    scope.$apply(function() 
	    {  
	       scope.gps = _gps.GPS;
	       scope.mapWidth = e.offsetWidth; 
	    }); 
    },

  updateLocation : function() 
  {

	if(_location.currLat == 0 && _location.currLon == 0 && _location.currAcc == 0)
    {

           _modal.show('warning',
                'GPS NOT AVAILABLE',
                '<center>Please enable your GPS and make sure you are in an open area with a clear view of the sky.</center>',
                false,
                function()
                 {
                      _modal.hide();
                 }
                );

            return;
    }

    _gps.GPS.lat = -25.5226464;
    _gps.GPS.lon = 28.100572599999964;
    _gps._Ctrl(); 
   },
   playBeep: function()
   {
   		navigator.notification.beep(3);
   }
/*
   seeCoordinates: function()
   {
   		var msg = _gps.model[0] + "#" + _gps.model[1];
   		alert(msg);
   }
*/
};;;
_home =
{
	onLoaded: function()
	{
		var _ = this;
		var uname = _login.credentials.username;
		var pword = _login.credentials.password;

		if(uname != "lucas" && pword != "lucas")
		{
			alert("Incorrect credentials");
			layout.show('#login');
		}else
		{
			alert("WELCOME OFFICER " + uname.toUpperCase() + "!");
		}
		/*
		if(uname == "" || uname == undefined)
		{
			uname = "Username";
		}
		alert("Username: " + uname);
		*/
		//var hold = getTime();
		 
		layout.attach('#homeFront');
		//getTime();
/*
		setTimeout(function(){
			_home.Time_Ctrl();

		},1000);
	*/
	},
	onExit: function()
	{
		var _ = this;
	},
	Ctrl: function($scope)
	{
		
	}
/*
	getTime: function()
	{
		/*
		var t = new Date();
		var min = 0, hour = 0;
		var intDate = "" ,month = "", year = 0000, strDay = "";

		min = t.getMinutes();
		hour = t.getHours();

		intDate = t.getDate();
		month = t.getMonth();
		year = t.getYear();
		//alert(t.getDay()); 
		switch(t.getDay())
		{
			case 1:
				strDay = "Monday";
				break;
			case 2:
				strDay = "Tuesday";
				break;
			case 3:
				strDay = "Wednesday";
				break;
			case 4:
				strDay = "Thursday";
				break;
			case 5:
				strDay = "Friday";
				break;
			case 6:
				strDay = "Saturday";
				break;
			case 0:
				strDay = "Sunday";
		}

		var median = "am";
		if(hour > 11 && min > 0)
		{
			median = "pm";
		}
		//Compile time
		return "Day: " + strDay + "-- Time: " + hour +":" + min;
		
		//_home.time = "0000";
	},
	
	Time_Ctrl : function()
	{
		e = document.getElementById('homeFront__FACE');
		scope = angular.element(e).scope();
		scope.$apply(function(){
			scope.currTime = getTime();

		});
	}
	*/



};;
_menu = {

    model : [],
    onExit : function() 
    { 
		var _ = this;
    },

    onLoaded: function () { 
    var _ = this;
    	layout.attach('#menuFront');
    	layout.attach('#menuHelp');
    		
    },

    onMessage : function() {



    },

	Ctrl : function($scope)
    {
    
    }
   


}
;;
_onRoad =
{
	onLoaded: function()
	{
		var _ = this;
		layout.attach('#onRoadFront');
	},

	onExit: function()
	{
		var _ = this;

	},

	onMessage: function()
	{



	},

	Ctrl: function($scope)
	{

	},

	recordInfo: function()
	{
		confirm("Proceed with information capturing?");
		

	}


};;
_recordInfo = {

    model : [ ],
    PHOTOS : [ ],
    
    onExit : function() 
    { 
      var _ = this;
    },

    onLoaded: function () 
    { 
      var _ = this;


       if(typeof PHOTOS == 'undefined')
       {
           PHOTOS = [];

       }

    	 layout.attach('#recordInfoFront');

		setTimeout(function() 
      {
				_recordInfo._Ctrl();  
			}
			, 1000);
    	
    },

    onMessage : function() 
    {


    },

    Ctrl : function($scope)
    {
    	$scope.photos = _recordInfo.PHOTOS;
    },

    _Ctrl : function()
  	{
	    e = document.getElementById('recordInfoFront__FACE');
	    
	    scope = angular.element(e).scope();
	    
	    scope.$apply(function() 
	    {  
	       scope.photos = _recordInfo.PHOTOS;
	    }); 
    },


  camBusy : false,
  
  capturePhoto : function() 
  {

    try 
    {

        if(_recordInfo.camBusy) 
          { 
            return; 
          }

          _recordInfo.camBusy = true;

          navigator.camera.getPicture(function(imageData) 
          {


            _log.d('GETPICTURE --> '+imageData.substring(0,100));

                imageData = 'data:image/jpeg;base64,'+imageData;


                      _recordInfo.PHOTOS.push( 
                        { 
                          at: moment().format('LLL'), img: imageData 
                        });
                      _recordInfo._Ctrl();

                 _recordInfo.camBusy = false;

         },

         function(fail) 
         {

                _recordInfo.camBusy = false;
                _log.d('GETPICTURE --> Failed because:');
         },

         {
           quality : 75,
           destinationType : 0,
           saveToPhotoAlbum : false,
           targetWidth: 640,
           targetHeight: 640 }
         );


      } catch (e) {

      _recordInfo.camBusy = false;

      _error.add("capturePhoto", e);

      }



   },

   
  isPhotoRemoving : false,
  removePhoto : function(idx) 
  {

      if(_recordInfo.isPhotoRemoving) 
        { 
          return; 
        }

      _recordInfo.isPhotoRemoving = true;


      _recordInfo.PHOTOS.splice(idx,1);


      _recordInfo._Ctrl();

       setTimeout(function()
        {        
          _recordInfo.isPhotoRemoving = false;  
        }, 500);

      _.currScrolls[0].refresh();
  }
};;
_regPlate = {

    model : [ ],
    PHOTOS : [ ],
    
    onExit : function() 
    { 
      var _ = this;
    },

    onLoaded: function () 
    { 
      var _ = this;


       if(typeof PHOTOS == 'undefined')
       {
           PHOTOS = [];

       }

    	 layout.attach('#regPlateFront');

		setTimeout(function() 
      {
				_regPlate._Ctrl();  
			}
			, 1000);
    	
    },

    onMessage : function() 
    {


    },

    Ctrl : function($scope)
    {
    	$scope.plates = _regPlate.PHOTOS;
    },

    _Ctrl : function()
  	{
	    e = document.getElementById('vehicleImageFront__FRONT');
	    
	    scope = angular.element(e).scope();
	    
	    scope.$apply(function() 
	    {  
	       scope.plates = _regPlate.PHOTOS;
	    }); 
    },


  camBusy : false,
  
  capturePhoto : function() 
  {

    try 
    {

        if(_regPlate.camBusy) 
          { 
            return; 
          }

          _regPlate.camBusy = true;

          navigator.camera.getPicture(function(imageData) 
          {


            _log.d('GETPICTURE --> '+imageData.substring(0,100));

                imageData = 'data:image/jpeg;base64,'+imageData;


                      _regPlate.PHOTOS.push( 
                        { 
                          at: moment().format('LLL'), img: imageData 
                        });
                      _regPlate._Ctrl();

                 _regPlate.camBusy = false;

         },

         function(fail) 
         {

                _regPlate.camBusy = false;
                _log.d('GETPICTURE --> Failed because:');
         },

         {
           quality : 75,
           destinationType : 0,
           saveToPhotoAlbum : false,
           targetWidth: 640,
           targetHeight: 640 }
         );


      } catch (e) {

      _regPlate.camBusy = false;

      _error.add("capturePhoto", e);

      }



   },

   
  isPhotoRemoving : false,
  removePhoto : function(idx) 
  {

      if(_regPlate.isPhotoRemoving) 
        { 
          return; 
        }

      _regPlate.isPhotoRemoving = true;


      _regPlate.PHOTOS.splice(idx,1);


      _regPlate._Ctrl();

       setTimeout(function()
        {        
          _regPlate.isPhotoRemoving = false;  
        }, 500);

      _.currScrolls[0].refresh();
  }
};;
_retrieveTickets = 
{
	model: [],
	onLoaded: function()
	{
		//alert("retrieveTickets loaded.");
		var _ = this;
		layout.attach('#retrieveTicketsFront');
		//Attach the view
		_model.getAll('retrieveTickets', function(model)
		{
			_retrieveTickets.model = model;
		});

		_retrieveTickets.addRowHandlers();


		/*
		alert("Data found: " + JSON.stringify(_retrieveTickets.model));

		var id1 = _retrieveTickets.model[0]._id;
		if(id1 < 0)
		{
			id1 = 1;
		};
		alert("Driver ID:" + id1);
		*/
	},

	onExit: function()
	{
		var _ = this;

	},

	onMessage: function()
	{


	},

	testCollapse: function()
	{
		alert("Testing the collapse.");
		$('.collapseme').colllapse({

		});
	}, 

	retrieveCtrl: function($scope)
	{
		$scope.tickets = _retrieveTickets.model;
	}, 

	addRowHandlers: function() 
	{
		var ticketTable = document.getElementById("tickTable");
		var rows = ticketTable.getElementsByTagName("tr");
		for (i = 0; i < rows.length; i++) {
		    var currentRow = ticketTable.rows[i];
		    var createClickHandler = 
		        function(row) 
		        {
		            return function() 
		            { 
	                    var cell = row.getElementsByTagName("td")[0];
	                    var id = cell.innerHTML;
	                    alert("id:" + id);
		            };
		        };

		    currentRow.onclick = createClickHandler(currentRow);
		}
	} 
};;
_roadBlock =
{
	GPS: [ ],
	model: [ ],

	onExit: function()
	{
		var _ = this;

	},

	iHide: function()
	{
		alert("In hide");
		/*
		$("#btnShowHide").click(function(){
			$("img").hide(1000);
		});
*/
	},

	onLoaded: function()
	{
		var _ = this;

		_roadBlock.GPS.lon = '';
		_roadBlock.GPS.lat = '';
    layout.attach('#roadBlockFront');

		setTimeout(function(){
			_roadBlock._Ctrl();

		},1000);
	},

	_Ctrl: function()
	{
		e = document.getElementById('roadBlockFront__FACE');
		scope = angular.element(e).scope();
		scope.$apply(function(){
			scope.gps = _roadBlock.GPS;
			scope.mapWidth = e.offSetWidth;
		});


	},

	onMessage: function()
	{



	},

	Ctrl: function($scope)
	{
		$scope.gps = _roadBlock.GPS;
		e = document.getElementById('roadBlockFront__FACE');
		$scope.mapWidth = e.offSetWidth;
	},

	updateLocation : function() 
  {
    try
    {
      if(_location.currLat == 0 && _location.currLon == 0 && _location.currAcc == 0)
        {

               _modal.show('warning',
                    'GPS NOT AVAILABLE',
                    '<center>Please enable your GPS and make sure you are in an open area with a clear view of the sky.</center>',
                    false,
                    function()
                     {
                          _modal.hide();
                     }
                    );

                return;
        }

        _roadBlock.GPS.lat = -25.5226464;
        _roadBlock.GPS.lon = 28.100572599999964 ;
        _roadBlock._Ctrl();
    }catch(err)
    {
        alert("Error: " + err);
    } 
   }
};;
_ticket = 
{

    model : [ ],
    signature: [],


    onExit : function() { 
    	var _ = this;
    },

    onLoaded: function () { 
    	var _ = this;
    	layout.attach('#ticketGet');
    	layout.attach('#ticketSet');
        layout.attach('#ticketFront');
        layout.attach('#ticketSignatureFront');
         _ticket.model = 
         {
            set : { key : undefined , data: ''},
            batch : [ ],
            getKey : {key : undefined , data : ''},
            del : { key : undefined}
         }

         if(_ticket.signature == undefined)
         {
            _ticket.signature = '';
         }
/*
         $('#btnSearch').on('click', function(){
         	alert("Button search is clicked!"); 

         });
*/
    },


    Ctrl_Signature: function($scope)
    {
        $scope.signature = _ticket.signature;
    },

    _Ctrl_Signature: function()
    {
        e = document.getElementById('signatureFront__FACE');
        scope = angular.element(e).scope();

        scope.$apply(function()
        {
            scope.signature = _ticket.signature;
        });
    },

    removeSignature: function()
    {
        _ticket.signature = '';
        _ticket._Ctrl_Signature();
    },




    getSignature: function()
    {
       // _modal.show(functi)
       alert("Retrieving signature");

    }, 

    testMsg: function()
    {
    	alert("The class is functioning well.");

    },

    onMessage : function() 
    {

    },

    Ctrl : function($scope)
    {
        $scope.model = _ticket.model;
    },

    _Ctrl : function()
    {
        e = document.getElementById('storageFront__FACE');
        
        scope = angular.element(e).scope();
        
        scope.$apply(function() 
        {  
           scope.model = _ticket.model;
        }); 
    },
    Set_Ctrl : function($scope)
    {
        $scope.set = _ticket.model.set;
    },

    _Set_Ctrl : function()
    {
        e = document.getElementById('ticketSet');
        
        scope = angular.element(e).scope();
        
        scope.$apply(function() 
        {  
           scope.set = _ticket.model.set;
        }); 
    },
    GetAll_Ctrl : function($scope)
    {
        _ticket.getAll();
        $scope.getAll = _ticket.model.getAll;
    },

    _GetAll_Ctrl : function()
    {
        e = document.getElementById('storage_getAll__FACE');
        
        scope = angular.element(e).scope();
        
        scope.$apply(function() 
        {  
           scope.getAll = _ticket.model.getAll;
        }); 
    },

    GetKey_Ctrl : function($scope)
    {
        _ticket.getAll();
        $scope.getKey = _ticket.model.getKey;
    },

    _GetKey_Ctrl : function()
    {
        e = document.getElementById('storage_getKey__FACE');
        
        scope = angular.element(e).scope();
        
        scope.$apply(function() 
        {  
           scope.getKey = _ticket.model.getKey;
        }); 
    }, 
    Batch_Ctrl : function($scope)
    {
        $scope.batch = _ticket.model.batch;
    },

    _Batch_Ctrl : function()
    {
        e = document.getElementById('storage_batch__FACE');
        
        scope = angular.element(e).scope();
        
        scope.$apply(function() 
        {  
           scope.batch = _ticket.model.batch;
        }); 
    },


    Del_Ctrl : function($scope)
    {
        $scope.del = _ticket.model.del;
    },


    _Del_Ctrl : function()
    {
        e = document.getElementById('storage_del__FACE');
        
        scope = angular.element(e).scope();
        
        scope.$apply(function() 
        {  
           scope.del = _ticket.model.del;
        }); 
        
    },

    set : function()
    {
         _model.set("IssueTicket",
            _ticket.model.set,
            function()
             {  
                alert('Save Successful');
                _ticket.model.set = { key : undefined, data: ''};
                _ticket._Set_Ctrl();
             }
           );
    },

    getAll : function()
    {
        _model.getAll("testStorage",  function(records) {  

            _ticket.model.getAll = records;
            _ticket._GetAll_Ctrl();

        });

    },
    addBatch : function()
    {
        _ticket.model.batch.push({key : undefined,data: ''}); 
        _ticket._Batch_Ctrl();
    },

    batch : function()
    {
        _model.batch("testStorage",
             _ticket.model.batch,
           function() { 
                alert("Save Successful");
                _ticket.model.batch = [];
                _ticket._Batch_Ctrl();
              });
    },
    nuke : function()
    {
        _model.nuke("testStorage", function() {  
            alert("Delete Successful");
        });
    },
    getKey : function()
    {
        _model.getKey("getTicket", _ticket.model.getKey.key,  function(record) 
        {  

            _ticket.model.getKey.data = record;
            alert("Data found: " + record);
            if(record == null)
            {
                alert("Key does not exist");
            }
            _ticket._GetKey_Ctrl();
        });
    },
    del : function()
    {
        _model.del("removeTicket", _ticket.model.del.key + "", function() {  
            alert("Ticket removed!");
            _ticket.model.del.key = undefined;
            _ticket._Del_Ctrl();
        });
    }

};;;
_vehicleImage = 
{

    model : [],
    PHOTOS : [],
    
    onExit : function() 
    { 
      var _ = this;
    },

    onLoaded: function () 
    { 
      var _ = this;


       if(typeof PHOTOS == 'undefined')
       {
           PHOTOS = [];

       }

    	 layout.attach('#vehicleImageFront');

		setTimeout(function() 
      {
				_vehicleImage._Ctrl();  
			}
			, 1000);
    	
    },

    onMessage : function() 
    {


    },

    Ctrl : function($scope)
    {
    	$scope.vehicles = _vehicleImage.PHOTOS;
    },

    _Ctrl : function()
  	{
	    e = document.getElementById('vehicleImageFront__FRONT');
	    
	    scope = angular.element(e).scope();
	    
	    scope.$apply(function() 
	    {  
	       scope.vehicles = _vehicleImage.PHOTOS;
	    }); 
    },


  camBusy : false,
  
  capturePhoto : function() 
  {

    try 
    {

        if(_vehicleImage.camBusy) 
          { 
            return; 
          }

          _vehicleImage.camBusy = true;

          navigator.camera.getPicture(function(imageData) 
          {


            _log.d('GETPICTURE --> '+imageData.substring(0,100));

                imageData = 'data:image/jpeg;base64,'+imageData;


                      _vehicleImage.PHOTOS.push( 
                        { 
                          at: moment().format('LLL'), img: imageData 
                        });
                      _vehicleImage._Ctrl();

                 _vehicleImage.camBusy = false;

         },

         function(fail) 
         {

                _vehicleImage.camBusy = false;
                _log.d('GETPICTURE --> Failed because:');
         },

         {
           quality : 75,
           destinationType : 0,
           saveToPhotoAlbum : false,
           targetWidth: 640,
           targetHeight: 640 }
         );


      } catch (e) {

      _vehicleImage.camBusy = false;

      _error.add("capturePhoto", e);

      }



   },

   
  isPhotoRemoving : false,
  removePhoto : function(idx) 
  {

      if(_vehicleImage.isPhotoRemoving) 
        { 
          return; 
        }

      _vehicleImage.isPhotoRemoving = true;


      _vehicleImage.PHOTOS.splice(idx,1);


      _vehicleImage._Ctrl();

       setTimeout(function()
        {        
          _vehicleImage.isPhotoRemoving = false;  
        }, 500);

      _.currScrolls[0].refresh();
  }
};;