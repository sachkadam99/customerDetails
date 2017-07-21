'use strict';

describe('Controller: MainCtrl', function () {

    var scope;
    var CartServiceMock;
    var MainCtrl;

  // load the controller's module
  beforeEach(module('shoppingCartApp'));

  beforeEach(function() {
        CartServiceMock = {
            getAllProducts: function() {}
       };

       spyOn(CartServiceMock, 'getAllProducts').and.returnValue('Foo');
   });

   // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope,
      cartService : CartServiceMock
    });
  }));

  it('should call CartServiceMock.getAll() once', function() {
    expect(CartServiceMock.getAllProducts).toHaveBeenCalled();
    expect(CartServiceMock.getAllProducts.calls.count()).toEqual(1);
  });

  it('should attach products to the scope', function() {
    expect(scope.products).toEqual('Foo');
  });
});
