angular.module('starterApp', ['ionic']).run(function($ionicPlatform) {

  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });

}).controller("starterCtrl", ['$scope', '$timeout', '$http', function($scope, $timeout, $http){

  angular.extend($scope, {
    color: {},
    id: 0,
    flagShow: true,
    flagFlashlight: false,
    style: {
      'background-color': '#FFFFFF'
    },
    data: {
      message: "",
      time: "Default"
    }
  });

  $http.get('/data/time.json').success(function(data){
    $scope.color = data;
  }).error(function(){
    alert("Erro!");
  });

  setInterval(function(){
    $scope.showColor();
  }, 400);

  $scope.showFlag = function(value){
    $scope.flagShow = value;
  };

  $scope.showColor = function(){

    if(($scope.id + 1) >= $scope.color[$scope.data.time].length){
      $scope.id = -1;
    }

    $scope.id = $scope.id + 1;
    if($scope.color[$scope.data.time].length > 0){
      $scope.style = {
        'background-color': $scope.color[$scope.data.time][$scope.id],
        'color': $scope.color[$scope.data.time][$scope.id - 1]
      }
      $scope.$apply();
    }

  $scope.flagFlashlight = !$scope.flagFlashlight;
    if($scope.flagFlashlight){
      if(!$scope.flagShow){
        console.log("Acendeu!");
      }
    }else{
      console.log("Desligou!");
    }
  };

  if(window.cordova){
    window.plugins.flashlight.available(function(isAvailable) {
      if (isAvailable) {
        window.plugins.flashlight.switchOn();
        setTimeout(function() {
          window.plugins.flashlight.switchOff();
        }, 3000);
      }else{
        alert("Falha ao iniciar dispositivo!");
      }
    });
  }

}]);