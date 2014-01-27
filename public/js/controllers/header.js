'use strict';

angular.module('mean.system').controller('HeaderController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;

    $scope.menu = [{
        'title': 'Shipping',
        'link': 'shipping'
    }, {
        'title': 'Create New Address',
        'link': 'shipping/create'
    }];

    $scope.isCollapsed = false;
}]);
