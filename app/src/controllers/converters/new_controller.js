(function(){

  angular
   .module('converters')
   .controller('NewConverterController', [
    'converterService',
    '$state',
    '$stateParams',
    NewConverterController
  ]);

  function NewConverterController(converterService, $state, $stateParams) {
    var vm = this;

    vm.chooseSourceFile = function() {
      converterService
        .sourceFile()
        .then(function(path) {
          vm.sourceFile = path[0];
        });
    };

    vm.chooseDestinationDirectory = function() {
      converterService
        .destinationDirectory()
        .then( function(path) {
          vm.destinationDirectory = path[0];
        });
    };
  }

})();