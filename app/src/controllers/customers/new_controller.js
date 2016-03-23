(function(){

  angular
   .module('customers')
   .controller('NewCustomerController', [
    'customerService',
    NewCustomerController
  ]);

  function NewCustomerController() {
    var self = this;

    self.formTemplate = 'app/src/views/customers/_form.html';
  }

})();