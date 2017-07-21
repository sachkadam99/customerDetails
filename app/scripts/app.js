'use strict';

/**
 * @ngdoc overview
 * @name shoppingCartApp
 * @description
 * # shoppingCartApp
 *
 * Main module of the application.
 */
angular
  .module('shoppingCartApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'ngMaterial',
    'cartService'
  ])
  .run(['$rootScope', '$http', '$state','$transitions', function ($rootScope, $http , $state,$transitions) {

      var cachedData  = store.get("CartData");
      if(cachedData == undefined || cachedData == null) {

        $http.get('data/data.json')
            .then(function(data){                
                store.set('CartData', data.data);
            });
      }

      $transitions.onSuccess({to: '*', from: '*'}, function(trans) {
        $rootScope.stateName = trans.$to().name;
      });

    }])

  .config(function ($stateProvider,$urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');


    $stateProvider

    .state('home', {
      url : '/home',
      views : {
        'content@' : {
          templateUrl: 'views/main.html',
          controller: 'MainCtrl',
        }
      }
    })
    .state('cart', {
      url : '/cart',
      views : {
        'content@' : {
          templateUrl: 'views/cart.html',
          controller: 'CartCtrl',
        }
      }
    })
  });
