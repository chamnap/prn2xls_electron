(function(){
  'use strict';

  angular.module('customers')
         .service('customerService', ['$q', CustomerService]);

  function CustomerService($q) {
    var self = this;
    const ipcRenderer = nodeRequire('electron').ipcRenderer;

    // Promise-based API
    return {
      all: function() {
        var deferred = $q.defer();

        ipcRenderer.send('customers.list.request');
        ipcRenderer.on('customers.list.response', function(event, response) {
          self.customers = response;
          deferred.resolve(response);
        });

        return deferred.promise;
      },

      find: function(id) {
        var deferred = $q.defer();

        ipcRenderer.send('customers.find.request', id);
        ipcRenderer.on('customers.find.response', function(event, response) {
          deferred.resolve(response);
        });

        return deferred.promise;
      },

      create: function(customer) {
        var deferred = $q.defer();

        ipcRenderer.send('customers.create.request', customer);
        ipcRenderer.on('customers.create.response', function(event, response) {
          deferred.resolve(response);
        });

        return deferred.promise;
      },

      update: function(customer) {
        var deferred = $q.defer();

        ipcRenderer.send('customers.update.request', customer);
        ipcRenderer.on('customers.update.response', function(event, response) {
          deferred.resolve(response);
        });

        return deferred.promise;
      },

      destroy: function(customer) {
        var deferred = $q.defer();

        ipcRenderer.send('customers.destroy.request', customer);
        ipcRenderer.on('customers.destroy.response', function(event, response) {
          deferred.resolve(response);
        });

        return deferred.promise;
      }
    };
  }

})();
