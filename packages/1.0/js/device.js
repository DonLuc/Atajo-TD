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