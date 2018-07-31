app.controller("productCtrl", function ($scope,lookupService,cartService,$location) 
{
    $scope.$on('$viewContentLoaded', function() {
        $scope.ProductData = lookupService.getProduct(); 
        $scope.addToCart = function(id){
            cartService.addProduct(id);
            console.debug("added"+ id);
        }
        $scope.updateQty = function(id,Qty){
            lookupService.UpdateQty(id,Qty);
            console.debug("update qty called");
        }
        $scope.gotoShopping = function(){
            $location.path('/shopping')
        }
    })

});