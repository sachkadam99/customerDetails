'use strict';

/**
 * @ngdoc function
 * @name shoppingCartApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the shoppingCartApp
 */
angular.module('shoppingCartApp')
  .controller('CartCtrl', function ($scope,$http,cartService,$window) {

  	//$scope.ngCart = [];
  	$scope.cart = cartService;

  	$scope.cartItems = cartService.getCartItems();

  	$scope.removeItemById = function(id){
  		$scope.cartItems = cartService.removeItemById(id);
  	};

  	$scope.placeOrder = function(){
  		$scope.showPlaceOrder = true;
  		cartService.makeCartEmpty();
  	};

  	$scope.updateQuantity = function(id ,status){
  		$scope.cartItems = cartService.updateQuantity(id , status);
  	}
  });

