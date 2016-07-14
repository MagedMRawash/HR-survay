/*/
//<reference path="DT/jquery.d.ts" />
///<reference path="DT/angular.d.ts" />
///<reference path="DT/bootstrap.d.ts" />
*/
///////////////////////
// TO DO List 
//  check the repeated 
///////////////////////
var angular;
var go;
var app = angular.module('hrsurvay', [], function ($interpolateProvider) {
    $interpolateProvider.startSymbol('{%');
    $interpolateProvider.endSymbol('%}');
});
app.controller('HRSurvayController', ['$scope', '$http', function ($scope, $http) {
        ///////  ChosePersonas
        $scope.hrin = true; // defult false
        $scope.empin = false;
        $scope.introShow = false;
        $scope.introShow = $scope.hrin || $scope.empin;
        $scope.ChosePersonas = function (value) {
            if (value == 'hr') {
                $scope.hrin = true;
            }
            if (value == 'emp') {
                $scope.empin = true;
            }
            $scope.introShow = $scope.hrin || $scope.empin;
            // console.log($scope.introShow);
        };
        /////////////// INIT
        $scope.tasks = [];
        $scope.phases = {
            mq: ["Manage Questions", mq],
            ms: ["Manage surveys", ms],
            mts: ["Manage targeted sector", mts]
        };
        $scope.departmentsList = departmentsList;
        ////////// Add Question 
        $scope.addQuestion = function (newQ) {
            console.log(newQ);
            $scope.phases.mq[1] = $scope.phases.mq[1].concat({
                title: newQ.Title,
                quesType: [newQ.Type, [
                        1, 2, 3, 4]],
                score: newQ.Score
            });
            // console.log($scope.phases.mq[1]);
        };
        ////////// Add Survay 
        $scope.addSurvay = function (newS) {
            var dataValid = false;
            if (newS) {
                /// check after modifay inputs
                // init
                newS.Qlist = newS.Qlist || [];
                newS.Tlist = newS.Tlist || [];
                // check 
                $scope.submitedtitle = $scope.msForm.title.$error.required;
                $scope.submitedQlist = (newS.Qlist.length < 1);
                $scope.submitedTlist = (newS.Tlist.length < 1);
                $scope.submitedfrom = $scope.msForm.from.$invalid;
                $scope.submitedto = $scope.msForm.to.$invalid;
                if (!($scope.submitedtitle ||
                    $scope.submitedQlist ||
                    $scope.submitedTlist ||
                    $scope.submitedfrom ||
                    $scope.submitedto)) {
                    // check that all required data is valid 
                    dataValid = true;
                }
            } // end if 
            else {
                /// check if not modifay any input
                $scope.submitedtitle = true;
                $scope.submitedQlist = true;
                $scope.submitedTlist = true;
                $scope.submitedfrom = true;
                $scope.submitedto = true;
            } // end else 
            if (dataValid) {
                // add new Survay 
                $scope.phases.ms[1] = $scope.phases.ms[1].concat({
                    title: newS.Title,
                    Qlist: newS.Qlist,
                    Tlist: newS.Tlist,
                    from: newS.from,
                    to: newS.to
                });
                $scope.newSurv = undefined;
            }
        };
        $scope.ChoseAnswer = function (value) {
            console.log(value);
        };
    }]);
app.directive('questionType', function ($compile) {
    function postLink(scope, elem, attrs) {
        var obj = scope.ques;
        if (obj.quesType[0] == 1) {
            var temp = '<ul aria-labelledby="dLabel{% $index %}" >\
         <li><a href="#" ng-click="ChoseAnswer(true)" >Yes</a></li>\
           <li><a href="#" ng-click="ChoseAnswer(false)" >No</a></li>\
         </ul>';
        }
        if (obj.quesType[0] == 2) {
            var temp = '<div class="dropdown"><a id="dLabel{% $index %}" data-target="#" href="#" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Chose Personas<span class="caret"></span></a>\
    <ul  aria-labelledby="dLabel{% $index %}" class="dropdown-menu">\
       <li  ng-repeat=" ans  in ques.quesType[1] " ><a href="#"ng-click="ChoseAnswer(ans)" >{%ans%}</a></li>\
         </ul>\
       </div>';
        }
        elem.html(temp);
        $compile(elem.contents())(scope);
    }
    return {
        link: postLink,
        scope: false,
        replace: true,
        transclude: true
    };
});
var mq = [{
        title: "Invite and confirm alph dfbzdfbvddsdffv a users to be alpha users",
        quesType: [1, [
                1, 2]]
    }, {
        title: "Invite and confirm alpha users to be alpha users",
        quesType: [2, [
                1, 2, 3, 4]],
        score: 0
    }
];
var departmentsList = ['media', 'web', 'social', 'front-end', 'backend-end'];
var mts = [{
        title: "Design Team",
        departs: ['media', 'web', 'social']
    }, {
        title: "Development Team",
        departs: ['front-end', 'backend-end']
    }];
var ms = [{
        title: "Invite and confirm alpha users to be alpha users",
        Qlist: mq,
        Tlist: mts,
        from: "",
        to: "",
        ScoreTargetedRanges: [{ "bad": [0, 50] }, { "good": [60, 75] }, { "veryGood": [75, 90] }, { "excellent": [90, 100] }]
    }, {
        title: "Invite and confirm alpha users asdasdasto be alpha users",
        Qlist: [],
        Tlist: [],
        from: "",
        to: "",
        ScoreTargetedRanges: [{ "bad": [0, 50] }, { "good": [60, 75] }, { "veryGood": [75, 90] }, { "excellent": [90, 100] }]
    }];
