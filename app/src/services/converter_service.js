(function(){
  'use strict';

  angular.module('converters')
         .service('converterService', ['$q', ConverterService]);

  /**
   * Users DataService
   * Uses embedded, hard-coded data model; acts asynchronously to simulate
   * remote data service call(s).
   *
   * @returns {{loadAll: Function}}
   * @constructor
   */
  function ConverterService($q) {
    var self = this;
    const ipcRenderer = nodeRequire('electron').ipcRenderer;

    // Promise-based API
    return {
      convert: function(sourceFile, destinationDirectory) {
        var deferred = $q.defer();

        ipcRenderer.send('converter.convert.request', sourceFile, destinationDirectory);
        ipcRenderer.on('converter.convert.response', function(event, response) {
          deferred.resolve(response);
        });

        return deferred.promise;
      },

      sourceFile: function() {
        var deferred = $q.defer();

        ipcRenderer.send('converter.choose_source_file.request');
        ipcRenderer.on('converter.choose_source_file.response', function(event, response) {
          deferred.resolve(response);
        });

        return deferred.promise;
      },

      destinationDirectory: function() {
        var deferred = $q.defer();

        ipcRenderer.send('converter.choose_destination_directory.request');
        ipcRenderer.on('converter.choose_destination_directory.response', function(event, response) {
          deferred.resolve(response);
        });

        return deferred.promise;
      }
    };
  }

})();
