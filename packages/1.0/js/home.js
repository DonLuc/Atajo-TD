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