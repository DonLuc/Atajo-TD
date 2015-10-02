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