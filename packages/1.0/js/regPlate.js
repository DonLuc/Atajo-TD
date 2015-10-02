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