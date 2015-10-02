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