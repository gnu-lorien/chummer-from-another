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
  $scope.allSkills = ALL_SKILLS;
  $scope.allQualities = ALL_QUALITIES;
  $scope.projects = Projects;
  $scope.expectedID = '-JOD2gghWBhT5sRbvSqO';
  $scope.sheet = $firebase(new Firebase(fbURL + 'sheets/' + $scope.expectedID));
  $scope.skills = $scope.sheet.$child('skills');
  $scope.qualities = $scope.sheet.$child('qualities');
  
  $scope.newSkill = {};
  $scope.newQuality = {};
  
  $scope.doneEditing = function() {
    // Determine if we have a sheet already and get that
    // or create a new one
    // Update that sheet with the values in newSheet
    $scope.sheet.$save();
    $scope.skills.$save();
    $scope.qualities.$save();
  }

  $scope.addQuality = function(q) {
    $scope.qualities.$add(q);
  }

  var computeMentalLimit = function() {
    return Math.ceil(((parseInt($scope.sheet.Logic) * 2) +
           parseInt($scope.sheet.Intuition) +
           parseInt($scope.sheet.Willpower)) / 3);
  };
  
  var computeSocialLimit = function() {
    return Math.ceil(((parseInt($scope.sheet.Charisma) * 2) +
           parseInt($scope.sheet.Willpower) +
           parseInt($scope.sheet.Essence)) / 3);
  };
  
  var computePhysicalLimit = function() {
    return Math.ceil(((parseInt($scope.sheet.Strength) * 2) +
           parseInt($scope.sheet.Body) +
           parseInt($scope.sheet.Reaction)) / 3);
  };
  
  $scope.$watch(computePhysicalLimit, function() {
    $scope.sheet['Physical Limit'] = computePhysicalLimit();
  })
  $scope.$watch(computeSocialLimit, function() {
    $scope.sheet['Social Limit'] = computeSocialLimit();
  })
  $scope.$watch(computeMentalLimit, function() {
    $scope.sheet['Mental Limit'] = computeMentalLimit();
  })
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