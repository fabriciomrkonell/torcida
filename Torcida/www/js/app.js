angular.module('starterApp', ['ionic']).run(function($ionicPlatform) {

  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });

}).controller("starterCtrl", ['$scope', '$timeout', function($scope, $timeout){

  angular.extend($scope, {
    color: [
      '#FFFFFF',
      '#436227',
      '#8B2439'
    ],
    id: 0,
    flagShow: true,
    flagFlashlight: false,
    style: {
      'background-color': '#FFFFFF'
    },
    data: {
      message: ""
    }
  });

  setInterval(function(){
    $scope.showColor();
  }, 400);

  $scope.showFlag = function(value){
    $scope.flagShow = value;
  };

  $scope.showColor = function(){
    if(($scope.id + 1) >= $scope.color.length){
      $scope.id = -1;
    }
    $scope.id = $scope.id + 1;
    $scope.style = {
      'background-color': $scope.color[$scope.id],
      'color': $scope.color[$scope.id + 1]
    }
    $scope.$apply();

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