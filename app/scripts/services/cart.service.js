var cartService = angular.module('cartService', []);

cartService.service('cartService', ['$http', '$filter','$rootScope', function($http, $filter,$rootScope) {

        this.$cartData = {
        	cart : []
        };

        this.getAllProducts = function() {
        	this.$cartData = store.get('CartData');
        	return this.$cartData.items;
        }

        this.addItem = function (product) {

            var inCart = this.getItemById(product.id);

            if (typeof inCart === 'object'){
                //Update quantity of an item if it's already in the cart
                this.updateQuantity(product.id, 1);
            } else {
                
                this.$cartData.cart.push(product);
            }

            this.$save();
        };

        this.getItemById = function (itemId) {
            var items = this.getCart().cart;
            var build = false;

            angular.forEach(items, function (item) {
                if  (item.id === itemId) {
                    build = item;
                }
            });
            return build;
        };

        this.getCartItems = function() {
        	return this.$cartData.cart;
        };

        this.setShipping = function(shipping){
            this.$cartData.shipping = shipping;
            return this.getShipping();
        };

        this.getShipping = function(){
            if (this.getCart().cart.length == 0) return 0;
            return  this.getCart().shipping;
        };

        this.setTaxRate = function(taxRate){
            this.$cartData.taxRate = +parseFloat(taxRate).toFixed(2);
            return this.getTaxRate();
        };

        this.getTaxRate = function(){
            return this.$cartData.taxRate;
        };

        this.updateQuantity = function(id, relative){

            var items = this.getCart().cart;
            var quantityInt = parseInt(relative);

            angular.forEach(items, function (item) {
                if  (item.id === id) {
                    item.quantity = parseInt(item.quantity) + quantityInt;
                }
            });

            return this.setCart(items);
        };

        this.getTax = function(){
            return +parseFloat(((this.getSubTotal()/100) * this.getCart().taxRate )).toFixed(2);
        };

        this.setCart = function (cart) {
            this.$cartData.cart = cart;
            this.$save();
            return this.getCartItems();
        };

        this.getCart = function(){
        	this.$cartData = store.get('CartData');
            return this.$cartData;
        };

        this.getItems = function(){
            return this.getCart().cart;
        };

        this.getTotalItems = function () {
            var items = this.getItems();
            return items.length;
        };

        this.getTotalUniqueItems = function () {
            return this.getCart().cart.length;
        };

        this.getSubTotal = function(){
            var total = 0;
            angular.forEach(this.getCart().cart, function (item) {
                total += parseFloat(item.quantity * item.price);
            });
            return +parseFloat(total).toFixed(2);
        };

        this.totalCost = function () {
            return +parseFloat(this.getSubTotal() + this.getShipping() + this.getTax()).toFixed(2);
        };

        this.removeItemById = function (id) {
            var cartData = this.getCart().cart;
            angular.forEach(cartData, function (cart, index) {
                if(cart.id === id) {
                    cartData.splice(index, 1)[0] || {};
                }
            });
            
           return this.setCart(cartData);
        };

        this.empty = function () {
            
            $rootScope.$broadcast('ngCart:change', {});
            this.$cartData.cart = [];
            $window.localStorage.removeItem('cart');
        };
        
        this.isEmpty = function () {
            
            return (this.$cartData.cart.length > 0 ? false : true);
            
        };

        this.makeCartEmpty = function(){
            this.$cartData.cart = [];
            this.$save();
            return true;
        };

        this.$save = function () {
            return store.set('CartData', this.$cartData);
        }

}]);