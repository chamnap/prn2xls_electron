(function(){
  'use strict';

  angular.module('customers')
         .service('customerService', ['$q', CustomerService]);

  /**
   * Users DataService
   * Uses embedded, hard-coded data model; acts asynchronously to simulate
   * remote data service call(s).
   *
   * @returns {{loadAll: Function}}
   * @constructor
   */
  function CustomerService($q) {
    var customers = [
      {
        id: 1,
        en_name: 'Sok Heng (Gin Seng Wine)',
        kh_name: 'ក្រុមហ៊ុន សុខ​ ហេង (យិន សិន វាញ)',
        en_address1: '452 Highway No. 5 Km6 Russey Keo',
        kh_address1: 'ផ្លូវ៤៥២ លេខ៥ គីឡូម៉ែត្រលេខ៦ បស្សីកែវ',
        en_address2: 'Phnom Penh, Cambodia',
        kh_address2: 'ភ្នំពេញ ព្រះរាជាណាចក្រកម្ពុជា'
      },
      {
        id: 2,
        en_name: 'Ads Marketing Solution Co., Ltd',
        kh_name: 'ការផ្សព្វផ្សាយពាណិជ្ជកម្ម ទីផ្សារ ដំណោះស្រាយ',
        en_address1: '#90Eo, St.02 A, Sangkat Phnom Penh',
        kh_address1: '# 90Eo , St.02 មួយ, សង្កាត់ភ្នំពេញ',
        en_address2: 'Thmey , Khan Sen Sok, Phnom Penh',
        kh_address2: 'ថ្មីខណ្ឌ សែនសុខរាជធានី ភ្នំពេញ'
      }
    ];

    // Promise-based API
    return {
      all: function() {
        // Simulate async nature of real remote calls
        return $q.when(customers);
      },

      find: function(id) {
        var customer = customers.find(function(customer) { return customer.id == id });
        return $q.when(customer);
      }
    };
  }

})();
