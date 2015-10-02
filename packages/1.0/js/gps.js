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