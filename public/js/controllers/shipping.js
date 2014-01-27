'use strict';

angular.module('mean.shipping').controller('ShippingController', ['$scope', '$routeParams', '$location', 'Global', 'Shipping', function ($scope, $routeParams, $location, Global, Shipping) {
    $scope.global = Global;

    $scope.create = function() {
        var shipping = new Shipping({
            title: this.title,
            content: this.content
        });
        shipping.$save(function(response) {
            $location.path('shipping/' + response._id);
        });

        this.title = '';
        this.content = '';
    };

    $scope.remove = function(shipping) {
        if (shipping) {
            shipping.$remove();

            for (var i in $scope.shipping) {
                if ($scope.shipping[i] === shipping) {
                    $scope.shipping.splice(i, 1);
                }
            }
        }
        else {
            $scope.shipping.$remove();
            $location.path('shipping');
        }
    };

    $scope.update = function() {
        var shipping = $scope.shipping;
        if (!shipping.updated) {
            shipping.updated = [];
        }
        shipping.updated.push(new Date().getTime());

        shipping.$update(function() {
            $location.path('shipping/' + shipping._id);
        });
    };

    $scope.find = function() {
        Shipping.query(function(shipping) {
            $scope.shipping = shipping;
        });
    };

    $scope.findOne = function() {
        Shipping.get({
            shippingId: $routeParams.shippingId
        }, function(shipping) {
            $scope.shipping = shipping;
        });
    };

    $scope.max = 100;

    // $scope.value =
}]);
