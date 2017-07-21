'use strict';

describe('Controller: CartCtrl', function () {

    var scope;
    var CartServiceMock;
    var CartCtrl;

  // load the controller's module
  beforeEach(module('shoppingCartApp'));

  beforeEach(function() {
        CartServiceMock = {
            getCartItems: function() {}
       };

       spyOn(CartServiceMock, 'getCartItems').and.returnValue({"id":"apple_iphone","name":"Apple iphone 6S Plus","quantity":"1","price":"2000","currency":"AED","type":"Electronics","image":"/images/iphone_5s.JPG","$$hashKey":"object:81"});
       
   });

   // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CartCtrl = $controller('CartCtrl', {
      $scope: scope,
      cartService : CartServiceMock
    });
  }));

  it('should call CartServiceMock.getCartItems() once', function() {
    expect(CartServiceMock.getCartItems).toHaveBeenCalled();
    expect(CartServiceMock.getCartItems.calls.count()).toEqual(1);
  });

  it('should attach cartItems to the scope', function() {
    expect(scope.cartItems.id).toEqual('apple_iphone');
  }); 
});
