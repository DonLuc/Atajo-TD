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