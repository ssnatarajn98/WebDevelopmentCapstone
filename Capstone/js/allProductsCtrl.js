
app.controller("allProductsCtrl", function ($scope,lookupService,$location,$filter,cartService) 
{
    
    $scope.AllProducts = JSON.parse(sessionStorage['UnsortedData']);
    $scope.showProducts = JSON.parse(sessionStorage['UnsortedData']);
    $scope.categorySet = JSON.parse(sessionStorage['UnsortedData']);
    $scope.CategoryTable = JSON.parse(sessionStorage['categoriesList']);
    $scope.CurrTotalCnt = 100;
    $scope.ProductsShown = 100;
    $scope.selectedFilter = "N";
    $scope.CheckFilter = function(){
        console.debug("GetFilterCalled");
        if($scope.selectedFilter=="P"){
           $scope.showProducts =  $filter('orderBy')($scope.showProducts, 'price')
        }
        else if($scope.selectedFilter=="R"){
            $scope.showProducts =  $filter('orderBy')($scope.showProducts, 'rating')
        }
        else if($scope.selectedFilter=="A")
        {
            $scope.showProducts =  $filter('orderBy')($scope.showProducts, 'name')
        }
    }
    $scope.getSpecificProducts = function(Category)
    {
        var dataSet =  $scope.AllProducts
        var output =[];
        
        dataSet.forEach(element => 
            {
          
            if( (element['category']==Category) || (element['subcategory']==Category) ){
                output.push(element)
              
            }
                
        });
        $scope.categorySet = output;
        $scope.getOnlyStocked();
        $scope.sortPrice();
        $scope.showProducts  = output;
        $scope.ProductsShown = output.length;
    }
    $scope.openProduct=function(id_num){
        console.debug('called openProduct'+id_num);
        lookupService.setProduct(id_num);
        $location.path('/product');
    }
    $scope.getTotalNumber = function(categoryName){
        var dataSet =  $scope.AllProducts 
        var output =[];
        var cnt = 0;
        dataSet.forEach(element => 
            {
          
            if (element['category']==categoryName)
            {
               cnt = cnt  +1;
            }
        
                
        });
        $scope.CurrTotalCnt = cnt;
    }

    $scope.getOnlyStocked = function()
    {
        var dataSet =  $scope.categorySet;
        var output =[];
        $scope.shouldStocked = sessionStorage['stocked'];
        if(sessionStorage['stocked'] == 'all'){
            sessionStorage['stocked']='stocked';
            dataSet.forEach(element => 
                {
                if(element['stock'] =="0"){
                    console.debug(element)
                    output.push(element)
                }
                    
            });
            $scope.showProducts  = output;
        }
        if((sessionStorage['stocked'] == 'stocked')){
            sessionStorage['stocked']='all';
            $scope.showProducts  =  $scope.categorySet;
        }
        $scope.ProductsShown = ($scope.showProducts).length;
    }
    $scope.sortPrice = function()
    {
        var dataSet =  $scope.categorySet;
        var output =[];
        if($scope.sortChecked)
        {
            output =  $filter('orderBy')(dataSet, 'price')
        }
        else{
            output=$scope.categorySet;
        }
        $scope.showProducts = output;
    }

    $scope.priceFilter = function(maxprice)
    {
        var dataSet =  $scope.showProducts;
        var output =[];
        dataSet.forEach(element => 
            {
            if(element['price']>minprice){
                output.push(element)
            }
                
        });
        $scope.showProducts  = output;
    }
    $scope.currentlyviewing = "All";
    $scope.setName = function(name){
        $scope.currentlyviewing = name;
    }
    $scope.addToCart = function(id){
        cartService.addProduct(id);
        console.debug("added"+ id);
    }
});