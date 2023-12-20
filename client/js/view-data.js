var collectaMonApp = angular.module('collectaMonApp', []);

collectaMonApp.controller('ViewDataController', function ($scope, $http) {
    var pokeUrl = "http://localhost:5000";
    $scope.cardData = [];
    $scope.card = {};
    $scope.types = [];
    $scope.selectedType = {};
    $scope.hideTable = true; 

    function retrieveData() {
        $http.get(pokeUrl + '/get-records')
            .then(function (response) {
                var data = response.data;
                if (data.msg === "SUCCESS") {
                    $scope.cardData = data.pokeData || [];
                    $scope.types = getTypes($scope.cardData);
                    $scope.selectedType = $scope.types[0];
                } else {
                    console.log(data.msg);
                }
            });
    }

    function getTypes(cardData) {
      var typeExists;
      var typesArray = [{ value: "", display: "ALL" }];

      for (var i = 0; i < cardData.length; i++) {
          typeExists = typesArray.find(function (element) {
              return element.value === cardData[i].type;
          });

          if (typeExists) {
              continue;
          } else {
              typesArray.push({ value: cardData[i].type, display: cardData[i].type.toUpperCase() });
          }
      }

      return typesArray;
  }

  $scope.redrawTable = function () {
    var type = $scope.selectedType;

    $http({
        method: 'get',
        url: pokeUrl + "/get-recordsByType",
        params: { type: type }
    }).then(function (response) {
        if (response.data.msg === "SUCCESS") {
            $scope.cardData = response.data.pokeData;
        }
    }, function (response) {
        console.log(JSON.stringify(response));
    });
}


    $scope.deleteRecord = function (name) {
        $http.delete(pokeUrl + '/delete-records', { params: { name: name } })
            .then(function (response) {
                var data = response.data;
                if (data.msg === "SUCCESS") {
                    retrieveData();
                } else {
                    console.log(data.msg);
                }
            });
    };

    $scope.editRecord = function (card) {
        $scope.card = angular.copy(card);
        $scope.hideTable = false;
    };

    $scope.cancelUpdate = function () {
        $scope.hideTable = true;
        $scope.card = {}; 
    };

    $scope.updateCard = function () {
        var updatedCard = {
            _id: $scope.card._id,
            name: $scope.cardName,
            type: $scope.cardType,
            ability: $scope.cardAbility,
            attack: $scope.cardAttack,
            set: $scope.cardSet,
            setNumber: $scope.cardSetNumber,
            price: $scope.cardPrice
        };

        $http.put(pokeUrl + '/update-record', updatedCard)
            .then(function (response) {
                var data = response.data;
                if (data.msg === "SUCCESS") {
                    retrieveData();
                    $scope.hideTable = true;
                    $scope.card = {};
                } else {
                    console.log(data.msg);
                }
            });
    };

    retrieveData();
});
