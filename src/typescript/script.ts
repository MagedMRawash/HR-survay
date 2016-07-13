/*/
//<reference path="DT/jquery.d.ts" />
///<reference path="DT/angular.d.ts" />
///<reference path="DT/bootstrap.d.ts" />
*/
var angular : any;
var go;
var app = angular.module('hrsurvay', [], function($interpolateProvider){
        $interpolateProvider.startSymbol('<%');
        $interpolateProvider.endSymbol('%>');
});
app.controller('HRSurvayController', ['$scope', '$http' , function($scope ,$http) {

     $scope.hrin = false;
     $scope.empin = false;
    
    $scope.introShow = false ;

    $scope.ChosePersonas = function(value) {
            if(value== 'hr' ){
                    $scope.hrin = true;
            }
            if(value== 'emp' ){
                    $scope.empin = true;
            }
            $scope.introShow =  $scope.hrin ||  $scope.empin ;
            console.log( $scope.introShow);
            
        }




    var HRSurvay = this;
    HRSurvay.tasks = [];

    // $http.get('https://trello.com/1/authorize?expiration=never&name=SinglePurposeToken&key=164fdc267f24780b7e6505b71f2ebd4d').success(function(data) {
 
    // })
    HRSurvay.phases = {
            mq :["Manage Questions",  mq],
            ms : ["Manage surveys",ms],
            mts : ["Manage targeted sector", mts]
        }


}]);

 

var  mq = [{
    title: "Invite and confirm alpha users to be alpha users",
    date: 'Sep 15',
    isComment: true,
    description: 'The beta version needs to test the usability of product features (from alpha features to newer beta features) to approve the product as an alternative to using Google Spreadsheets.'
}, {
    title: "Create Trello test boards for 3 existing clients to test as alpha users",
    date: 'Sep 15',
    isComment: false,
    description: 'The beta version needs to test the usability of product features (from alpha features to newer beta features) to approve the product as an alternative to using Google Spreadsheets.'
}, {
    title: "Demo alpha version to the 3 alpha users (Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia viverra rutrum. Integer vitae libero ut nibh pellentesque pretium.",
    date: 'Sep 15',
    isComment: true,
    description: 'The beta version needs to test the usability of product features (from alpha features to newer beta features) to approve the product as an alternative to using Google Spreadsheets.'
}, {
    title: "Create recommendations document for Beta",
    date: 'Sep 15',
    isComment: false,
    description: 'The beta version needs to test the usability of product features (from alpha features to newer beta features) to approve the product as an alternative to using Google Spreadsheets.'
}, {
    title: "Invite and confirm alpha users to be alpha users",
    date: 'Sep 15',
    isComment: true,
    description: 'The beta version needs to test the usability of product features (from alpha features to newer beta features) to approve the product as an alternative to using Google Spreadsheets.'
}, {
    title: "Create Trello test boards for 3 existing clients to test as alpha users",
    date: 'Sep 15',
    isComment: false,
    description: 'The beta version needs to test the usability of product features (from alpha features to newer beta features) to approve the product as an alternative to using Google Spreadsheets.'
}, {
    title: "Demo alpha version to the 3 alpha users (Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia viverra rutrum. Integer vitae libero ut nibh pellentesque pretium.",
    date: 'Sep 15',
    isComment: true,
    description: 'The beta version needs to test the usability of product features (from alpha features to newer beta features) to approve the product as an alternative to using Google Spreadsheets.'
}, {
    title: "Create recommendations document for Beta",
    date: 'Sep 15',
    isComment: false,
    description: 'The beta version needs to test the usability of product features (from alpha features to newer beta features) to approve the product as an alternative to using Google Spreadsheets.'
}, {
    title: "Invite and confirm alpha users to be alpha users",
    date: 'Sep 15',
    isComment: true,
    description: 'The beta version needs to test the usability of product features (from alpha features to newer beta features) to approve the product as an alternative to using Google Spreadsheets.'
}, {
    title: "Create Trello test boards for 3 existing clients to test as alpha users",
    date: 'Sep 15',
    isComment: false,
    description: 'The beta version needs to test the usability of product features (from alpha features to newer beta features) to approve the product as an alternative to using Google Spreadsheets.'
}, {
    title: "Demo alpha version to the 3 alpha users (Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia viverra rutrum. Integer vitae libero ut nibh pellentesque pretium.",
    date: 'Sep 15',
    isComment: true,
    description: 'The beta version needs to test the usability of product features (from alpha features to newer beta features) to approve the product as an alternative to using Google Spreadsheets.'
}, {
    title: "Create recommendations document for Beta",
    date: 'Sep 15',
    isComment: false,
    description: 'The beta version needs to test the usability of product features (from alpha features to newer beta features) to approve the product as an alternative to using Google Spreadsheets.'
}];


var ms = [{
    title: "Invite and confirm alpha users to be alpha users",
    date: 'Sep 15',
    isComment: true,
    description: 'The beta version needs to test the usability of product features (from alpha features to newer beta features) to approve the product as an alternative to using Google Spreadsheets.'
}, {
    title: "Create Trello test boards for 3 existing clients to test as alpha users",
    date: 'Sep 15',
    isComment: false,
    description: 'The beta version needs to test the usability of product features (from alpha features to newer beta features) to approve the product as an alternative to using Google Spreadsheets.'
}, {
    title: "Demo alpha version to the 3 alpha users (Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia viverra rutrum. Integer vitae libero ut nibh pellentesque pretium.",
    date: 'Sep 15',
    isComment: true,
    description: 'The beta version needs to test the usability of product features (from alpha features to newer beta features) to approve the product as an alternative to using Google Spreadsheets.'
}, {
    title: "Create recommendations document for Beta",
    date: 'Sep 15',
    isComment: false,
    description: 'The beta version needs to test the usability of product features (from alpha features to newer beta features) to approve the product as an alternative to using Google Spreadsheets.'
}];


var mts = [{
    title: "Demo alpha version to the 3 alpha users (Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia viverra rutrum. Integer vitae libero ut nibh pellentesque pretium.",
    date: 'Sep 15',
    isComment: true,
    description: 'The beta version needs to test the usability of product features (from alpha features to newer beta features) to approve the product as an alternative to using Google Spreadsheets.'
}, {
    title: "Create recommendations document for Beta",
    date: 'Sep 15',
    isComment: false,
    description: 'The beta version needs to test the usability of product features (from alpha features to newer beta features) to approve the product as an alternative to using Google Spreadsheets.'
}];