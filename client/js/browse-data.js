var cards = [];
var activeCard = 0;
const pokeUrl = "http://localhost:5000";


var app = angular.module("browseCards", []);

app.controller('browseCardsCtrl', function($scope, $http) {
    $scope.obj = {};

    $scope.get_records = function() {
        $http({
            method: "get",
            url: pokeUrl + "/get-records"  
        }).then(function(response) {
            if (response.data.msg === "SUCCESS") {
                cards = response.data.pokeData;
                $scope.obj = cards[activeCard];
                $scope.showHide();
            } else {
                console.log(response.data.msg);
            }
        }, function(response) {
            console.log(response);
        });
    };
    $scope.get_records();

    $scope.changeCard = function(direction) {
        activeCard += direction;
        $scope.obj = cards[activeCard];
        $scope.showHide();
    };

    $scope.showHide = function() {
        $scope.hidePrev = (activeCard === 0) ? true : false;
        $scope.hideNext = (activeCard === cards.length - 1) ? true : false;
    };
});
