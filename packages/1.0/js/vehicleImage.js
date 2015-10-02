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