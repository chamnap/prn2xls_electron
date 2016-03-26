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
      $state.go('customers');
    };

    vm.submit = function() {
      if(vm.customerForm.$valid) {
        customerService.
          create(vm.customer).
          then(function(response) {
            $state.go('customers_edit', { id: response.id });
            toastService.showActionToast('Successfully created!');
          });
      }
    };
  }

})();