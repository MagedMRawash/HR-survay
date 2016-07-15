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
            var dataValid = false;
            if (newQ) {
                /// check after modifay inputs
                // init
                // check 
                console.log($scope.mqForm.score);
                $scope.mqsubmitedtitle = $scope.mqForm.title.$error.required;
                $scope.mqsubmitedType = typeof newQ.Type == 'undefined';
                $scope.mqsubmitedscore = $scope.mqForm.score.$viewValue > 0 ? ($scope.mqForm.score.$viewValue <= 10 ? false : true) : true;
                if (!($scope.mqsubmitedtitle ||
                    $scope.mqsubmitedType ||
                    $scope.mqsubmitedscore)) {
                    // check that all required data is valid 
                    dataValid = true;
                }
            } // end if 
            else {
                /// check if not modifay any input
                $scope.mqsubmitedtitle = true;
                $scope.mqsubmitedType = true;
                $scope.mqsubmitedscore = true;
            } // end else 
            if (dataValid) {
                // add new Survay 
                $scope.phases.mq[1] = $scope.phases.mq[1].concat({
                    title: newQ.Title,
                    quesType: [newQ.Type, [
                            1, 2, 3, 4
                        ]],
                    score: newQ.Score
                });
                $scope.newQues = undefined;
            }
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
                $scope.mssubmitedtitle = $scope.msForm.title.$error.required;
                $scope.mssubmitedQlist = (newS.Qlist.length < 1);
                $scope.mssubmitedTlist = (newS.Tlist.length < 1);
                $scope.mssubmitedfrom = $scope.msForm.from.$invalid;
                $scope.mssubmitedto = $scope.msForm.to.$invalid;
                if (!($scope.mssubmitedtitle ||
                    $scope.mssubmitedQlist ||
                    $scope.mssubmitedTlist ||
                    $scope.mssubmitedfrom ||
                    $scope.mssubmitedto)) {
                    // check that all required data is valid 
                    dataValid = true;
                }
            } // end if 
            else {
                /// check if not modifay any input
                $scope.mssubmitedtitle = true;
                $scope.mssubmitedQlist = true;
                $scope.mssubmitedTlist = true;
                $scope.mssubmitedfrom = true;
                $scope.mssubmitedto = true;
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
        ////////// Add  Targeted Sector 
        $scope.addTargetedSector = function (newTS) {
            var dataValid = false;
            if (newTS) {
                /// check after modifay inputs
                // init
                newTS.departs = newTS.departs || [];
                // check 
                $scope.mtssubmitedtitle = $scope.mtsForm.title.$error.required;
                $scope.mtssubmiteddeparts = (newTS.departs.length < 1);
                if (!($scope.mtssubmitedtitle ||
                    $scope.mtssubmiteddeparts)) {
                    // check that all required data is valid 
                    dataValid = true;
                }
            } // end if 
            else {
                /// check if not modifay any input
                $scope.mtssubmitedtitle = true;
                $scope.mtssubmiteddeparts = true;
            } // end else 
            if (dataValid) {
                // add new Survay 
                $scope.phases.mts[1] = $scope.phases.mts[1].concat({
                    title: newTS.Title,
                    departs: newTS.departs
                });
                $scope.newTarget = undefined;
            }
        };
        $scope.changeScore = function (score, obj) {
            $scope.EmpScor = $scope.EmpScor || 0;
            //  console.log(obj);
            if (obj == null) {
                $scope.EmpScor -= score.score || 0;
            }
            else {
                $scope.EmpScor += score.score || 0;
            }
            console.log(obj);
            //  return 'get'
        };
        //     checkClass =  choseOption(empQues, $parent, $index) 
        //         $scope.choiseClass = $scope.choiseClass || [];
        //     $scope.choseOption = function (obj, par, ind ) {
        //         console.log(obj+ ' '+ par+' '+ ind ) ;
        //         $scope.choiseClass[par] = $scope.choiseClass[par] ||  [];
        //         obj.quesType[0] == 3 ? null : $scope.choiseClass[par] = [];
        //  $scope.choiseClass[par][ind] =  $scope.choiseClass[par][ind]  ||  [] ;
        //         $scope.choiseClass[par][ind] = $scope.choiseClass[par][ind] == 'get' ? null : 'get';
        //         console.log($scope.choiseClass)
        //         return  $scope.choiseClass[par][ind] 
        //     }
        $scope.test = function (obje) {
            console.log(obje);
        };
        $scope.ChoseAnswer = function (value) {
            console.log(value);
        };
    }]);
app.directive("contenteditable", function () {
    return {
        //restrict: "A",
        scope: false,
        require: "ngModel",
        link: function (scope, element, attrs, ngModel) {
            function read() {
                ngModel.$setViewValue(element.html());
            }
            ngModel.$render = function () {
                element.html(ngModel.$viewValue || "");
            };
            element.bind("blur keyup change", function () {
                scope.$apply(read);
            });
        }
    };
});
app.directive('questionType', function ($compile) {
    function postLink(scope, elem, attrs) {
        var obj = scope.ques;
        if (obj.quesType[0] == 0 /*1*/) {
            var temp = '<div aria-labelledby="dLabel{% $index %}"  class="choises-col">\
         <a href="#"  class="choiseItem"  ng-click="ChoseAnswer(true)" >Yes</a>\
           <a href="#"   class="choiseItem"  ng-click="ChoseAnswer(false)" >No</a>\
           <div>   ';
        }
        if (obj.quesType[0] == 2 || 1) {
            var temp = '<div class="choises-col" >\
      <a href="#"  contenteditable  class="choiseItem"   ng-repeat=" ans  in ques.quesType[1] "  ng-click="ChoseAnswer(ans)" >{%ans%}</a>\
      <a href="#"    class="choiseItem"    ng-click="ques.quesType[1].push(\'ans\' + ques.quesType[1].length)" > + </a>\
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
        title: "Are you satisfied in ITS ?",
        quesType: [1, [
                'Yes', 'No'
            ]],
        score: 10
    }, {
        title: "Please chose, how long are you works at ITS ? (by year)",
        quesType: [2, [
                '1 Year', '2 Years', '3 Years', '4 Years'
            ]],
        score: 5
    }, {
        title: "Are you Developer at ITS ?",
        quesType: [3, [
                1, 2
            ]],
        score: 9
    }, {
        title: "Please chose, how much child do you have ? (by year)",
        quesType: [3, [
                1, 2, 3, 4
            ]],
        score: 7
    }, {
        title: "Are you satisfied in ITS ?",
        quesType: [1, [
                'Yes', 'No'
            ]],
        score: 10
    }, {
        title: "Please chose, how long are you works at ITS ? (by year)",
        quesType: [2, [
                '1 Year', '2 Years', '3 Years', '4 Years'
            ]],
        score: 5
    }, {
        title: "Are you Developer at ITS ?",
        quesType: [3, [
                1, 2
            ]],
        score: 9
    }, {
        title: "Please chose, how much child do you have ? (by year)",
        quesType: [3, [
                1, 2, 3, 4
            ]],
        score: 7
    }];
var departmentsList = ['media', 'web', 'social', 'front-end', 'backend-end'];
var mts = [{
        title: "Design Team",
        departs: ['media', 'web', 'social']
    }, {
        title: "Development Team",
        departs: ['front-end', 'backend-end']
    }];
var ms = [{
        title: "General Survay",
        Qlist: mq,
        Tlist: mts,
        from: "",
        to: "",
        ScoreTargetedRanges: [{
                "bad": [0, 50]
            }, {
                "good": [60, 75]
            }, {
                "veryGood": [75, 90]
            }, {
                "excellent": [90, 100]
            }]
    }, {
        title: "Empty Survay",
        Qlist: [],
        Tlist: [],
        from: "",
        to: "",
        ScoreTargetedRanges: [{
                "bad": [0, 50]
            }, {
                "good": [60, 75]
            }, {
                "veryGood": [75, 90]
            }, {
                "excellent": [90, 100]
            }]
    }];
