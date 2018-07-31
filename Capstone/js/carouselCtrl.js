app.controller("carouselCtrl", function ($scope,lookupService,$location, $route) {
    $scope.openProduct=function(id_num){
        console.debug('called openProduct'+id_num);
        lookupService.setProduct(id_num);
        $location.path('/product');
    }
    if(!sessionStorage['carouselspeed']){
        console.debug("called sessions storage")
        sessionStorage['carouselspeed'] = 0;
    }
    $scope.carouselSpeed = sessionStorage['carouselspeed'];
    $scope.speedUp=function()
    {
        if(sessionStorage['carouselspeed'] == 0){
            sessionStorage['carouselspeed'] = 3000;
        }
        else{
            sessionStorage['carouselspeed'] = 0;
        }
       // $route.reload();
       location.reload();
    }
    $scope.gotoShopping = function(){
        $location.path('/shopping')
    }
     
});