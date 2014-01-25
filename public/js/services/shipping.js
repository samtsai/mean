'use strict';

//Shipping service used for shipping REST endpoint
angular.module('mean.shipping').factory('Shipping', ['$resource', function($resource) {
    return $resource('shipping/:shippingId', {
        shippingId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);
