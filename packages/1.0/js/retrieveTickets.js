_retrieveTickets = 
{
	model: [],
	onLoaded: function()
	{
		//alert("retrieveTickets loaded.");
		var _ = this;
		layout.attach('#retrieveTicketsFront');
		//Attach the view
		_model.getAll('retrieveTickets', function(model)
		{
			_retrieveTickets.model = model;
		});

		_retrieveTickets.addRowHandlers();


		/*
		alert("Data found: " + JSON.stringify(_retrieveTickets.model));

		var id1 = _retrieveTickets.model[0]._id;
		if(id1 < 0)
		{
			id1 = 1;
		};
		alert("Driver ID:" + id1);
		*/
	},

	onExit: function()
	{
		var _ = this;

	},

	onMessage: function()
	{


	},

	testCollapse: function()
	{
		alert("Testing the collapse.");
		$('.collapseme').colllapse({

		});
	}, 

	retrieveCtrl: function($scope)
	{
		$scope.tickets = _retrieveTickets.model;
	}, 

	addRowHandlers: function() 
	{
		var ticketTable = document.getElementById("tickTable");
		var rows = ticketTable.getElementsByTagName("tr");
		for (i = 0; i < rows.length; i++) {
		    var currentRow = ticketTable.rows[i];
		    var createClickHandler = 
		        function(row) 
		        {
		            return function() 
		            { 
	                    var cell = row.getElementsByTagName("td")[0];
	                    var id = cell.innerHTML;
	                    alert("id:" + id);
		            };
		        };

		    currentRow.onclick = createClickHandler(currentRow);
		}
	} 
};;