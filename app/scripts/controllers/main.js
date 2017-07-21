'use strict';

/**
 * @ngdoc function
 * @name shoppingCartApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the shoppingCartApp
 */
angular.module('shoppingCartApp')
  .controller('MainCtrl', function ($rootScope,$scope,$http,cartService,$window) {

  	$scope.cartData = cartService;
  	
  	$scope.products = cartService.getAllProducts();  	

    $scope.showGotoCart = function( product ){
      product.showGotoCartButton = true;
    };

    var container = angular.element(document);
	container.on('scroll', function() {
	    if (container.scrollTop() > 20) {
	        angular.element('.md-button.md-fab').css('display','block');
	    } else {
	        angular.element('.md-button.md-fab').css('display','none');
	    }
	});

	$scope.scrollToTop = function() {
		$('html,body').animate({
			scrollTop: 0
		});
	}

  });
