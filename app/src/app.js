var starterApp =
  angular
    .module('starterApp', ['ngMaterial', 'ui.router', 'customers'])
    .run(function($log, $state) {
      $log.debug("MyApp is ready!");
    });

starterApp.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/converter');

  $stateProvider
    .state('converter', {
      url: '/converter',
      templateUrl: 'app/src/views/converter.html'
    })
    .state('customers', {
      url: '/customers',
      templateUrl: 'app/src/views/customers/index.html',
      controller: 'CustomersController as vm'
    })
    .state('customers_new', {
      url: '/customers/new',
      controller: 'NewCustomerController as vm',
      templateUrl: 'app/src/views/customers/new.html'
    })
    .state('customers_edit', {
      url: '/customers/:id/edit',
      controller: 'EditCustomerController as vm',
      templateUrl: 'app/src/views/customers/edit.html'
    });
});