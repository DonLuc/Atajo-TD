_ticket = 
{

    model : [ ],
    signature: [],


    onExit : function() { 
    	var _ = this;
    },

    onLoaded: function () { 
    	var _ = this;
    	layout.attach('#ticketGet');
    	layout.attach('#ticketSet');
        layout.attach('#ticketFront');
        layout.attach('#ticketSignatureFront');
         _ticket.model = 
         {
            set : { key : undefined , data: ''},
            batch : [ ],
            getKey : {key : undefined , data : ''},
            del : { key : undefined}
         }

         if(_ticket.signature == undefined)
         {
            _ticket.signature = '';
         }
/*
         $('#btnSearch').on('click', function(){
         	alert("Button search is clicked!"); 

         });
*/
    },


    Ctrl_Signature: function($scope)
    {
        $scope.signature = _ticket.signature;
    },

    _Ctrl_Signature: function()
    {
        e = document.getElementById('signatureFront__FACE');
        scope = angular.element(e).scope();

        scope.$apply(function()
        {
            scope.signature = _ticket.signature;
        });
    },

    removeSignature: function()
    {
        _ticket.signature = '';
        _ticket._Ctrl_Signature();
    },




    getSignature: function()
    {
       // _modal.show(functi)
       alert("Retrieving signature");

    }, 

    testMsg: function()
    {
    	alert("The class is functioning well.");

    },

    onMessage : function() 
    {

    },

    Ctrl : function($scope)
    {
        $scope.model = _ticket.model;
    },

    _Ctrl : function()
    {
        e = document.getElementById('storageFront__FACE');
        
        scope = angular.element(e).scope();
        
        scope.$apply(function() 
        {  
           scope.model = _ticket.model;
        }); 
    },
    Set_Ctrl : function($scope)
    {
        $scope.set = _ticket.model.set;
    },

    _Set_Ctrl : function()
    {
        e = document.getElementById('ticketSet');
        
        scope = angular.element(e).scope();
        
        scope.$apply(function() 
        {  
           scope.set = _ticket.model.set;
        }); 
    },
    GetAll_Ctrl : function($scope)
    {
        _ticket.getAll();
        $scope.getAll = _ticket.model.getAll;
    },

    _GetAll_Ctrl : function()
    {
        e = document.getElementById('storage_getAll__FACE');
        
        scope = angular.element(e).scope();
        
        scope.$apply(function() 
        {  
           scope.getAll = _ticket.model.getAll;
        }); 
    },

    GetKey_Ctrl : function($scope)
    {
        _ticket.getAll();
        $scope.getKey = _ticket.model.getKey;
    },

    _GetKey_Ctrl : function()
    {
        e = document.getElementById('storage_getKey__FACE');
        
        scope = angular.element(e).scope();
        
        scope.$apply(function() 
        {  
           scope.getKey = _ticket.model.getKey;
        }); 
    }, 
    Batch_Ctrl : function($scope)
    {
        $scope.batch = _ticket.model.batch;
    },

    _Batch_Ctrl : function()
    {
        e = document.getElementById('storage_batch__FACE');
        
        scope = angular.element(e).scope();
        
        scope.$apply(function() 
        {  
           scope.batch = _ticket.model.batch;
        }); 
    },


    Del_Ctrl : function($scope)
    {
        $scope.del = _ticket.model.del;
    },


    _Del_Ctrl : function()
    {
        e = document.getElementById('storage_del__FACE');
        
        scope = angular.element(e).scope();
        
        scope.$apply(function() 
        {  
           scope.del = _ticket.model.del;
        }); 
        
    },

    set : function()
    {
         _model.set("IssueTicket",
            _ticket.model.set,
            function()
             {  
                alert('Save Successful');
                _ticket.model.set = { key : undefined, data: ''};
                _ticket._Set_Ctrl();
             }
           );
    },

    getAll : function()
    {
        _model.getAll("testStorage",  function(records) {  

            _ticket.model.getAll = records;
            _ticket._GetAll_Ctrl();

        });

    },
    addBatch : function()
    {
        _ticket.model.batch.push({key : undefined,data: ''}); 
        _ticket._Batch_Ctrl();
    },

    batch : function()
    {
        _model.batch("testStorage",
             _ticket.model.batch,
           function() { 
                alert("Save Successful");
                _ticket.model.batch = [];
                _ticket._Batch_Ctrl();
              });
    },
    nuke : function()
    {
        _model.nuke("testStorage", function() {  
            alert("Delete Successful");
        });
    },
    getKey : function()
    {
        _model.getKey("getTicket", _ticket.model.getKey.key,  function(record) 
        {  

            _ticket.model.getKey.data = record;
            alert("Data found: " + record);
            if(record == null)
            {
                alert("Key does not exist");
            }
            _ticket._GetKey_Ctrl();
        });
    },
    del : function()
    {
        _model.del("removeTicket", _ticket.model.del.key + "", function() {  
            alert("Ticket removed!");
            _ticket.model.del.key = undefined;
            _ticket._Del_Ctrl();
        });
    }

};;;