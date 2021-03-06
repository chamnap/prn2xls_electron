(function(){

  angular
   .module('converters')
   .controller('NewConverterController', [
    'converterService',
    'toastService',
    '$state',
    '$stateParams',
    NewConverterController
  ]);

  function NewConverterController(converterService, toastService, $state, $stateParams) {
    var vm = this;
    const electron = nodeRequire('electron')
    const remote   = electron.remote;
    const shell    = electron.shell;
    const app      = remote.app;
    vm.excelFile   = null;
    vm.destinationDirectory = app.getPath('home');
    vm.isDisabled  = true;
    vm.convertErrors = null;

    vm.submit = function() {
      vm.isDisabled = true;
      converterService
        .convert(vm.sourceFile, vm.destinationDirectory)
        .then(function(response) {
          vm.convertErrors = response.error;
          vm.excelFile  = response.path;
          vm.isDisabled = false;

          if (response.error) {
            toastService.showActionToast('Failed to convert!');
          } else {
            toastService.showActionToast('Successfully converted!');
          }
        });
    };

    vm.chooseSourceFile = function() {
      converterService
        .sourceFile()
        .then(function(path) {
          vm.sourceFile = path[0];
          vm.isDisabled = false;
          vm.excelFile  = null;
          vm.convertErrors = [];
        });
    };

    vm.chooseDestinationDirectory = function() {
      converterService
        .destinationDirectory()
        .then( function(path) {
          vm.destinationDirectory = path[0];
        });
    };

    vm.openExcel = function() {
      shell.openItem(vm.excelFile);
    };
  }

})();