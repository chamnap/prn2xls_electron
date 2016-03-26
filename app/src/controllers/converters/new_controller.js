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
    const electron = nodeRequire('electron')
    const remote   = electron.remote;
    const shell    = electron.shell;
    const app      = remote.app;
    vm.excelFile   = null;
    vm.destinationDirectory = app.getPath('home');

    vm.submit = function() {
      converterService
        .convert(vm.sourceFile, vm.destinationDirectory)
        .then(function(path) {
          vm.excelFile = path;
        });
    };

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

    vm.openExcel = function() {
      shell.openItem(vm.excelFile);
    };
  }

})();