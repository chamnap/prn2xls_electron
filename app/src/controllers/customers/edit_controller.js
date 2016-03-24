(function(){

  angular
   .module('customers')
   .controller('EditCustomerController', [
    'customerService',
    '$state',
    '$stateParams',
    EditCustomerController
  ]);

  function EditCustomerController(customerService, $state, $stateParams) {
    var vm = this;
    var customerId = $stateParams.id;

    vm.formTemplate = 'app/src/views/customers/_form.html';

    customerService
      .find(customerId)
      .then( function( customer ) {
        vm.customer = customer;
      });

    vm.back = function() {
      $state.go('customers');
    };

    vm.submit = function() {
      var json = JSON.parse(angular.toJson(vm.customer));

      if(vm.customerForm.$valid) {
        customerService.
          update(json).
          then(function(response) {
            $state.go('customers');
          });
      }
    };
  }

})();