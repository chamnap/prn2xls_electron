(function(){
  'use strict';

  angular.module('notifier')
         .service('toastService', ['$mdToast', ToastService]);

  function ToastService($mdToast) {
    return {
      showActionToast: function(message, callback, hideDelay) {
        var hideDelay = hideDelay || 3000;

        var toast = $mdToast.simple()
                    .content(message)
                    .action('OKAY')
                    .highlightAction(true)
                    .hideDelay(hideDelay);

        $mdToast
          .show(toast)
          .then(function(response) {
            if (response == 'okay') {
              callback();
            }
          });
      }
    };
  }

})();