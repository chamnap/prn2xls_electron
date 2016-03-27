(function(){

  angular
   .module('customers')
   .controller('CustomerController', [
    'customerService',
    'toastService',
    '$state',
    '$stateParams',
    CustomerController
  ]);

  function CustomerController(customerService, toastService, $state, $stateParams) {
    var vm = this;
    var customerId = $stateParams.id;

    customerService
      .find(customerId)
      .then( function( customer ) {
        vm.customer = customer;
      });
  }

})();