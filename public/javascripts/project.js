angular.module('project', ['ngRoute', 'firebase'])
 
.value('fbURL', 'https://blinding-fire-212.firebaseio.com/')
 
.factory('Projects', function($firebase, fbURL) {
  return $firebase(new Firebase(fbURL + 'projects'));
})

.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      controller:'ListCtrl',
      templateUrl:'partials/project-list'
    })
    .when('/edit/:projectId', {
      controller:'EditCtrl',
      templateUrl:'partials/project-detail'
    })
    .when('/new', {
      controller:'CreateCtrl',
      templateUrl:'partials/project-detail'
    })
    .otherwise({
      redirectTo:'/'
    });
})

.controller('ListCtrl', function($scope, $firebase, fbURL, Projects) {
  $scope.projects = Projects;
  $scope.expectedID = '-JOD2gghWBhT5sRbvSqO';
  $scope.sheet = $firebase(new Firebase(fbURL + 'sheets/' + $scope.expectedID));
  
  $scope.doneEditing = function() {
    // Determine if we have a sheet already and get that
    // or create a new one
    // Update that sheet with the values in newSheet
    $scope.sheet.$save();
  }
})
 
.controller('CreateCtrl', function($scope, $location, $timeout, Projects) {
  $scope.save = function() {
    Projects.$add($scope.project, function() {
      $timeout(function() { $location.path('/'); });
    });
  };
})
 
.controller('EditCtrl',
  function($scope, $location, $routeParams, $firebase, fbURL) {
    var projectUrl = fbURL + $routeParams.projectId;
    $scope.project = $firebase(new Firebase(projectUrl));
 
    $scope.destroy = function() {
      $scope.project.$remove();
      $location.path('/');
    };
 
    $scope.save = function() {
      $scope.project.$save();
      $location.path('/');
    };
});