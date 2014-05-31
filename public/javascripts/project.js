var SheetSkillsResolver = function($q, $route, $firebase, fbURL) {
  var def = $q.defer();
  var obj = $firebase(new Firebase(fbURL + 'sheets/' + $route.current.params.sheetID ));
  obj.$on('loaded', function() {
    var c = obj.$child('skills');
    c.$on('loaded', function() {
      def.resolve(c);
    });
  });
  return def.promise;
}

var SheetSkillsDependentResolver = function($q, $route, $firebase, fbURL, ThisSheet) {
  var def = $q.defer();
  var c = ThisSheet.$child('skills');
  c.$on('loaded', function() {
    def.resolve(c);
  });
  return def.promise;
}

var SheetQualitiesResolver = function($q, $route, $firebase, fbURL) {
  var def = $q.defer();
  var obj = $firebase(new Firebase(fbURL + 'sheets/' + $route.current.params.sheetID ));
  obj.$on('loaded', function() {
    var c = obj.$child('qualities');
    c.$on('loaded', function() {
      def.resolve(c);
    });
  });
  return def.promise;
}

var SheetQualitiesDependentResolver = function($q, $route, $firebase, fbURL, ThisSheet) {
  var def = $q.defer();
  var c = ThisSheet.$child('qualities');
  c.$on('loaded', function() {
    def.resolve(c);
  });
  return def.promise;
}

var SheetResolver = function($q, $route, $firebase, fbURL) {
  var def = $q.defer();
  var obj = $firebase(new Firebase(fbURL + 'sheets/' + $route.current.params.sheetID ));
  obj.$on('loaded', function() {
    def.resolve(obj);
  });
  return def.promise;
}

angular.module('project', ['ngRoute', 'firebase'])
 
.value('fbURL', 'https://blinding-fire-212.firebaseio.com/')
 
.factory('Sheets', function($firebase, fbURL) {
  return $firebase(new Firebase(fbURL + 'sheets'));
})

.factory('Skills', function() {
  function Skills() {
    
  }
  Skills.allSkills = ALL_SKILLS;
  Skills.prototype.getSkillByName = function(skillName) {
    for (var i = 0; i < allSkills.length; ++i) {
      if (allSkills[i].name == skillName) {
        return angular.copy(allSkills[i]);
      }
    }
  }
  return Skills;
})

.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      controller:'SheetListCtrl',
      templateUrl:'partials/sr5-sheet-list'
    })
    .when('/edit/:sheetID', {
      controller:'SheetEditCtrl',
      templateUrl:'partials/sr5-sheet',
      resolve: {ThisSheet: SheetResolver,
                TheseSkills: SheetSkillsResolver,
                TheseQualities: SheetQualitiesResolver}
    })
    .when('/pick-priorities/:sheetID', {
      controller:'SheetPickPrioritiesCtrl',
      templateUrl:'partials/sr5-pick-priorities'
    })
    .when('/abilities/:sheetID', {
      controller:'SheetAbilitiesCtrl',
      templateUrl:'partials/sr5-abilities',
      resolve: {TheseSkills: SheetSkillsResolver,
                ThisSheet: SheetResolver}
    })
    .when('/new', {
      controller:'SheetCreateCtrl',
      templateUrl:'partials/sr5-sheet-create'
    })
    .otherwise({
      redirectTo:'/'
    });
})

.controller('SheetListCtrl', function($scope, $location, Sheets) {
  $scope.sheets = Sheets;

  $scope.newSheet = function() {
    var p = $scope.sheets.$add({"name": "Initial Name"});
    p.then(function(res) {
      $location.path('/edit/' + res.name());
    })
  };

  $scope.testmeth = function() {
    angular.forEach($scope.sheets, function(value, key) {
      console.log(value);
      console.log(key);
    })
  }
})

.controller('SheetPickPrioritiesCtrl', function($scope, $routeParams, $firebase, fbURL) {
  $scope.expectedID = $routeParams.sheetID;
  $scope.sheet = $firebase(new Firebase(fbURL + 'sheets/' + $scope.expectedID));
  $scope.skills = $scope.sheet.$child('skills');
  $scope.qualities = $scope.sheet.$child('qualities');
})

.controller('SheetAbilitiesCtrl', function($scope, $routeParams, $firebase, fbURL, Skills, TheseSkills, ThisSheet) {
  $scope.allSkillsByAttribute = {};
  $scope.sheet = ThisSheet;
  $scope.skills = TheseSkills;

  $scope.getModelIndexForSkill = function(skillName) {
    var keys = $scope.skills.$getIndex();
    for (var i=0; i < keys.length; ++i) {
      var key = keys[i];
      if (skillName == $scope.skills[key].name) {
        return key;
      }
    }
    return -1;
  }
  
  $scope.doneEditing = function() {
    $scope.skills.$save();
  }

  angular.forEach(Skills.allSkills, function(value, key) {
    if (!angular.isDefined($scope.allSkillsByAttribute[value.linkedAttribute])) {
      $scope.allSkillsByAttribute[value.linkedAttribute] = []
    }
    var sheetskill = $scope.skills[$scope.getModelIndexForSkill(value.name)];
    $scope.allSkillsByAttribute[value.linkedAttribute].push(sheetskill);
  })
  
})

.controller('SheetEditCtrl', function($scope, $routeParams, $firebase, fbURL, ThisSheet, TheseSkills, TheseQualities) {
  $scope.allSkills = ALL_SKILLS;
  $scope.allQualities = ALL_QUALITIES;
  $scope.expectedID = $routeParams.sheetID;
  $scope.sheet = ThisSheet;
  $scope.skills = TheseSkills;
  $scope.qualities = TheseQualities;
  
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

  $scope.walkSpeed = function() {
    return $scope.sheet[MOVEMENT_RULES.rates.walk.attribute] * MOVEMENT_RULES.rates.walk.multiplier;
  }
  $scope.runSpeed = function() {
    return $scope.sheet[MOVEMENT_RULES.rates.walk.attribute] * MOVEMENT_RULES.rates.run.multiplier;
  }
  $scope.sprintIncrease = function() {
    if ($scope.sheet.Race in MOVEMENT_RULES.sprintIncrease) {
      return MOVEMENT_RULES.sprintIncrease[$scope.sheet.Race];
    }
    return "Race not selected";
  }
  $scope.memoryRoll = function() {
    var total = 0;
    angular.forEach(MEMORY, function(value, key) {
      total += $scope.sheet[value];
    })
    return total;
  }
  $scope.judgeIntentionsRoll = function() {
    var total = 0;
    angular.forEach(JUDGE_INTENTIONS, function(value, key) {
      total += $scope.sheet[value];
    })
    return total;
  }
  $scope.composureRoll = function() {
    var total = 0;
    angular.forEach(COMPOSURE, function(value, key) {
      total += $scope.sheet[value];
    })
    return total;
  }
  $scope.lift = function() {
    return $scope.sheet.Strength * LIFT_CARRY_RULES["lift"];
  }
  $scope.overhead = function() {
    return $scope.sheet.Strength * LIFT_CARRY_RULES["overhead lift"];
  }
  $scope.carry = function() {
    return $scope.sheet.Strength * LIFT_CARRY_RULES["carry"];
  }
})
 
.controller('CreateCtrl', function($scope, $location, $timeout, $firebase, Skills) {
  $scope.sheets = $firebase(new Firebase(fbURL + 'sheets'));
  $scope.name = '';
  $scope.save = function() {
    $scope.sheets.$add({"name": $scope.name}).then(function(res) {
      var skills = res.$child('skills');
      for (var i=0; i < Skills.allSkills.length; ++i) {
        var newskill = angular.copy(Skills.allSkills[i]);
        newskill.value = 0;
        skills.$add(newskill);
      }
      $location.path('/edit/' + res.$id);
    })
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