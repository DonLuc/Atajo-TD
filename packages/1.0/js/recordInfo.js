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