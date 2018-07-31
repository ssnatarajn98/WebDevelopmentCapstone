
app.controller("cartCtrl", function ($scope ,cartService) 
{
    $scope.$on('$viewContentLoaded', function() 
    {
        $scope.subCost = 0;
        $scope.cartdata = cartService.getCart(); 
        $scope.getCost =function()
        {
            var curr_cost = 0;
            
            $scope.cartdata.forEach(function(element){
                console.debug(element);
                curr_cost  =curr_cost + ((element['price'])*element['Qty']);
            })
           $scope.subCost = curr_cost;
           $scope.Tax =  $scope.subCost*.1;
           $scope.TotalCost =  $scope.Tax + $scope.subCost + 10;
        }
        $scope.getCost();
        //getCostCart();
        console.log("Hello");
       
        console.log($scope.cartdata);
       $scope.deleteFromCart = function(id)
        {
            cartService.deleteProduct(id);
            $scope.cartdata=cartService.getCart();
        }
        $scope.submitCart =  function(){
            console.log("SubmitCartCalled");
            alert($scope.firstName + " " +  $scope.lastName + " will recieve their order at" + $scope.address + ", " + $scope.city +  "." + " We will contact you by phone at " + $scope.phnNumber + ". Your total is:" + $scope.TotalCost + "dollars");
             
        }
        $scope.address;
        $scope.firstName;
        $scope.lastName;
        $scope.phnNumber;
        $scope.city;



    })

});


