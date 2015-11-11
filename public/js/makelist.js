var app = angular.module("Swappigans", []);
app.controller("MakeList",function($scope){
    
  $scope.rows = [
        {name:"Mike",email:"mikevansnell@gmail.com"},
        {name:"Elizabeth", email:"eavansnell@gmail.com"}
    ];
    $scope.listCount = $scope.rows.length;
    
    $scope.addRow = function(){
      $scope.rows.push({});
        $scope.listCount = $scope.rows.length;
    }
    
    $scope.removeRow = function(index){
      $scope.rows.splice(index,1);
        $scope.listCount = $scope.rows.length;
    }
    
    $scope.adjustListLength = function(){
        var listCount = parseInt($scope.listCount);
        
        var activeRows = $scope.rows.filter(function(row){
          return !!(row.name || row.email);
        });
        
        console.log('a there are ' + activeRows.length + ' active rows out of ' + $scope.rows.length + ' total rows, and you asked for ' + listCount);
        
        
        if (listCount < $scope.rows.length && listCount >= activeRows.length) {
              console.log('shrinking...');
              $scope.rows = activeRows;
        }
        
        //if (listCount >= $scope.rows.length) {
            console.log('expanding...');
            for (var i=$scope.rows.length; i<listCount; i++) {
            $scope.rows.push({});
            }
        //}
        
        $scope.listCount = $scope.rows.length;
        
    }
});


app.directive("contenteditable", function() {
  return {
    restrict: "A",
    require: "ngModel",
    link: function(scope, element, attrs, ngModel) {

      function read() {
        ngModel.$setViewValue(element.html());
      }

      ngModel.$render = function() {
        element.html(ngModel.$viewValue || "");
      };

      element.bind("blur keyup change", function() {
        scope.$apply(read);
      });
    }
  };
});