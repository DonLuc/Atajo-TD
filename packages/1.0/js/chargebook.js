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