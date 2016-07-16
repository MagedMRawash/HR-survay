/*/
//<reference path="DT/jquery.d.ts" />
///<reference path="DT/angular.d.ts" />
///<reference path="DT/bootstrap.d.ts" />
*/
///////////////////////
// TO DO List 
//  --
///////////////////////
var angular;
var go;
var app = angular.module('hrsurvay', ['ngAnimate', 'nvd3'], function ($interpolateProvider) {
    $interpolateProvider.startSymbol('{%');
    $interpolateProvider.endSymbol('%}');
});
app.controller('HRSurvayController', ['$scope', '$http', function ($scope, $http) {
        ///////  ChosePersonas
        $scope.hrin = false; // defult false
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
        $scope.departmentsList = departmentsList;
        angular.element('[contenteditable]').on('change', function () {
            $scope.twest = $scope.twest == true ? false : true;
            $scope.phases.ms[1][0].Qlist = $scope.phases.mq[1];
            console.log($scope.phases.ms[1][0]);
            $scope.storephaseschange();
        });
        //////////// Storing data 
        $scope.storeNamechange = function () {
            localStorage.setItem('userName', $scope.userName);
        };
        $scope.getName = function () {
            if (!localStorage.getItem('userName')) {
                return false;
            }
            else {
                return localStorage.getItem('userName');
            }
        };
        $scope.userName = $scope.getName() || "Please Enter Your Name";
        $scope.storephaseschange = function () {
            localStorage.setItem('phases', JSON.stringify($scope.phases));
        };
        $scope.getphases = function () {
            if (!localStorage.getItem('phases')) {
                return false;
            }
            else {
                return JSON.parse(localStorage.getItem('phases'));
            }
        };
        $scope.phases = $scope.getphases() || {
            mq: ["Manage Questions", mq],
            ms: ["Manage surveys", ms],
            mts: ["Manage targeted sector", mts]
        };
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
                            "Option one", "Option two"
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
                angular.element('.get').removeClass('get');
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
        $scope.multicoiseAdd = function (get, parObj, mts) {
            parObj.push(mts);
            return get;
        };
        $scope.multicoiseRemove = function (get, parObj, index) {
            parObj.splice(index, 1);
            return null;
        };
        $scope.changeScore = function (score, obj) {
            $scope.EmpScor = $scope.EmpScor || 0;
            //  console.log(obj);
            console.log($scope.phases);
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
        $scope.sendform = function (obje) {
            obje = obje == true ? false : true;
            $scope.empin = false;
            $scope.sendmas = true;
            $scope.phases.ms[1][0].Qlist = $scope.phases.mq[1];
            console.log($scope.phases.ms[1][0]);
        };
        $scope.test = function (obje) {
            $scope.twest = $scope.twest == true ? false : true;
            $scope.phases.ms[1][0].Qlist = $scope.phases.mq[1];
            // console.log($scope.phases.ms[1][0]);
            $scope.storephaseschange();
            // console.log(obje);
        };
        $scope.ChoseAnswer = function (value) {
            // console.log(value);
            //  angular.element('.twest').fadeIn().delay(2000).fadeOut();
        };
        ///////////////  report Section
        /* Chart options */
        // $scope.options = { /* JSON data */ };
        $scope.options = {
            chart: {
                type: 'pieChart',
                height: 500,
                width: 500,
                x: function (d) { return d.key; },
                y: function (d) { return d.y; },
                showLabels: true,
                duration: 500,
                labelThreshold: 0.01,
                labelSunbeamLayout: true,
                legend: {
                    margin: {
                        top: 5,
                        right: 35,
                        bottom: 5,
                        left: 0
                    }
                }
            }
        };
        /* Chart data */
        // $scope.data = { /* JSON data */ }
        $scope.data = [
            {
                key: "One",
                y: 5
            },
            {
                key: "Two",
                y: 2
            },
            {
                key: "Three",
                y: 9
            },
            {
                key: "Four",
                y: 7
            },
            {
                key: "Five",
                y: 4
            },
            {
                key: "Six",
                y: 3
            },
            {
                key: "Seven",
                y: .5
            }
        ];
    }]);
app.directive("contenteditableDir", function () {
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
                scope.twest = scope.twest == true ? false : true;
                scope.phases.ms[1][0].Qlist = scope.phases.mq[1];
                scope.storephaseschange();
            });
        } };
});
;
;
app.directive('questionType', function ($compile) {
    function postLink(scope, elem, attrs) {
        var obj = scope.ques;
        if (obj.quesType[0] == 1) {
            var temp = '<div class="choises-col row" >\
      <a     class="choiseItem"   ng-click="ChoseAnswer(ans)" >Yes</a>\
      <a    class="choiseItem"   ng-click="ChoseAnswer(ans)" >No</a>\
       </div>';
        }
        if ((obj.quesType[0] == 3) || (obj.quesType[0] == 2)) {
            var temp = '<div class="choises-col row " >\
      <a   contenteditable  class="choiseItem col-md-2  col-xs-3" ng-repeat=" ans  in ques.quesType[1] "   ng-model="ques.quesType[1].ans"  ng-click="ChoseAnswer(ans)" >{%ans%}</a>\
      <a    class="choiseItem addopt col-md-12"    ng-click="ques.quesType[1].push(\'Click to Edit \' + ques.quesType[1].length)" > Click to Add more Options </a>\
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
    },
    {
        title: "Please chose, how much child do you have ? ",
        quesType: [3, [
                1, 2, 3, 4
            ]],
        score: 7
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
        title: "General Survay",
        Qlist: mq,
        Tlist: mts,
        from: "12-jan",
        to: "23-may",
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
