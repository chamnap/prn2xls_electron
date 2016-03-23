(function(){

  angular
   .module('customers')
   .controller('CustomersController', [
    'customerService',
    CustomersController
  ]);

  function CustomersController(customerService) {
    var self = this;

    // Load all registered customers
    customerService
      .all()
      .then( function( customers ) {
        self.customers = [].concat(customers);
      });
  }

})();