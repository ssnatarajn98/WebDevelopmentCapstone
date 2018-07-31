var app = angular.module("myApp", ["ngRoute"]);

app.run(function($http){
    if(sessionStorage['CategorizedData']==null)
    {
    $http.get("https://webmppcapstone.blob.core.windows.net/data/itemsdata.json").then(function(response) 
    {
        var cnt = 1;
        var UnsortedData = [];
        var categoriesList = [];
      for(var key in response.data){
          var curr_category = response.data[key]['category'];
            var temp_cat_set = {}
            
            temp_cat_set['categoryname'] = curr_category;

            temp_cat_set['subcategries'] = []
          for(var subcategory in response.data[key]['subcategories'])
          {
              var curr_subcategory = response.data[key]['subcategories'][subcategory]['name'];
              temp_cat_set['subcategries'].push(curr_subcategory);
              for(var item in response.data[key]['subcategories'][subcategory]['items'])
              {
                  response.data[key]['subcategories'][subcategory]['items'][item]['id']=cnt;
                  response.data[key]['subcategories'][subcategory]['items'][item]['Qty'] = 1;
                  cnt++;
                  UnsortedData.push(response.data[key]['subcategories'][subcategory]['items'][item]);

              }
          }
          console.debug(temp_cat_set);
          categoriesList.push(temp_cat_set)
      }
      console.debug(UnsortedData)
        sessionStorage['CategorizedData'] = JSON.stringify(response.data) ;
        sessionStorage['UnsortedData'] = JSON.stringify(UnsortedData);
        sessionStorage['categoriesList'] = JSON.stringify(categoriesList);
        sessionStorage['cart'] = JSON.stringify([]);
        sessionStorage['stocked'] = 'all';
        console.debug(response.data)
        })
    }
})
app.config(function($routeProvider,$locationProvider) {
    $locationProvider.hashPrefix('');
    $routeProvider
    .when("/", {
        templateUrl : "pages/carousel.html",
        controller:"carouselCtrl"
    })
    .when("/carousel", {
        templateUrl : "pages/carousel.html",
        controller:"carouselCtrl"
    })
    .when("/contact", {
        templateUrl : "pages/contact.html",
        contorller: "contactCtrl"
    })
    .when("/about", {
        templateUrl : "pages/about.html",
        controller:"aboutCtrl"
        
    })
    .when("/shopping", {
        templateUrl : "pages/allProducts.html",
        controller:"allProductsCtrl"
        
    })
    .when("/cart", {
        templateUrl : "pages/cart.html",
        controller:"cartCtrl"
        
    })
    .when("/product", {
        templateUrl : "pages/product.html",
        controller:"productCtrl"
    })
    .when("/about", {
        templateUrl : "pages/about.html",
        controller:"aboutCtrl"
    });
});

app.controller("aboutCtrl", function ($scope) {
    $scope.msg = "I love Paris";
});


app.controller("contactCtrl", function ($scope) 
{
    $scope.msg = "I love London";
    $scope.submitContactUs = function(){
        console.log("functionCalled");
        alert("Message has been sent. Thanks ");
    }
});

app.service('lookupService', function() {
    var curr_product = {}, setProduct, getProduct,UpdateQty;
        setProduct = function(num) 
        {
            console.debug("called setProduct");
            var dataSet = JSON.parse(sessionStorage['UnsortedData'])
            dataSet.forEach(element => 
                {
                if(element['id']==num){
                    curr_product = element;
                  
                }
                    
            });
        };
        getProduct = function(){
           return curr_product;
        };
        UpdateQty = function(id,Qty)
        {
            console.debug("called UpdateQty Called");
            var dataSet = JSON.parse(sessionStorage['UnsortedData'])
            dataSet.forEach(element => 
                {
                if(element['id']==id){
                    element['Qty'] = Qty;
                  
                }
                    
            });
            sessionStorage['UnsortedData'] = JSON.stringify(dataSet);

        }

        return {
            setProduct: setProduct,
            getProduct: getProduct,
            UpdateQty:UpdateQty
        };
   });

   app.service('cartService', function() {
    var addProduct, getCart, deleteProduct;
        addProduct = function(num) 
        {
            var dataSet = JSON.parse(sessionStorage['UnsortedData'])
            var temp_cart = JSON.parse(sessionStorage['cart']);
            
            dataSet.forEach(element => 
                {
                if(element['id']==num){
                    temp_cart.push(element);
                    
                }    
                
            })
            sessionStorage['cart'] = JSON.stringify(temp_cart);
            console.debug(temp_cart);
        };

        getCart = function()
        {
            console.debug("get Cart Called");
            return JSON.parse(sessionStorage['cart']);
        };
        deleteProduct = function(id){
            var output_cart = getCart();
            temp_cart=[];
            output_cart.forEach(element => 
                {
                if(element['id']!=id){
                    temp_cart.push(element);
                }
                    
            });
            sessionStorage['cart'] = JSON.stringify(temp_cart);
           
        }


        return {
            addProduct: addProduct,
            getCart: getCart,
            deleteProduct: deleteProduct,
           
        };
   });

