(function(){

  angular
   .module('customers')
   .controller('NewCustomerController', [
    'customerService',
    'toastService',
    '$state',
    '$stateParams',
    NewCustomerController
  ]);

  function NewCustomerController(customerService, toastService, $state, $stateParams) {
    var vm = this;

    vm.formTemplate = 'app/src/views/customers/_form.html';
    vm.customer     = {};

    vm.back = function() {
      $state.go('customers.list');
    };

    vm.submit = function() {
      if(vm.customerForm.$valid) {
        customerService.
          create(vm.customer).
          then(function(response) {
            $state.go('customers.show', { id: response.id });
            toastService.showActionToast('Successfully created!');
          });
      }
    };
  }

})();