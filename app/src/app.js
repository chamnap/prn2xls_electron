var starterApp =
  angular
    .module('starterApp', ['ngMaterial', 'ngMessages', 'ui.router', 'customers', 'converters', 'notifier'])
    .run(function($log, $rootScope, $state, $stateParams) {
      $log.debug("MyApp is ready!");
      $rootScope.$state = $state;
      $rootScope.$stateParams = $stateParams;
    });

starterApp.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/converter');

  $stateProvider
    .state('converter', {
      url: '/converter',
      templateUrl: 'app/src/views/converters/new.html',
      controller: 'NewConverterController',
      controllerAs: 'vm'
    })
    .state('customers', {
      url: '/customers',
      templateUrl: 'app/src/views/customers.html',
      abstract: true
    })
    .state('customers.list', {
      url: '',
      controller: 'CustomersController',
      controllerAs: 'vm',
      templateUrl: 'app/src/views/customers/index.html'
    })
    .state('customers.new', {
      url: '/customers/new',
      controller: 'NewCustomerController',
      controllerAs: 'vm',
      templateUrl: 'app/src/views/customers/new.html'
    })
    .state('customers.show', {
      url: '/customers/:id',
      controller: 'CustomerController',
      controllerAs: 'vm',
      templateUrl: 'app/src/views/customers/show.html'
    })
    .state('customers.edit', {
      url: '/customers/:id/edit',
      controller: 'EditCustomerController',
      controllerAs: 'vm',
      templateUrl: 'app/src/views/customers/edit.html'
    });
});