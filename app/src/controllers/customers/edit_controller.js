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
    var self = this;
    var customerId = $stateParams.id;

    self.formTemplate = 'app/src/views/customers/_form.html';

    customerService
      .find(customerId)
      .then( function( customer ) {
        self.customer = customer;
      });
  }

})();