/*/
//<reference path="DT/jquery.d.ts" />
///<reference path="DT/angular.d.ts" />
///<reference path="DT/bootstrap.d.ts" />
*/
var angular : any;
var go;
var app = angular.module('stove', [], function($interpolateProvider){
        $interpolateProvider.startSymbol('<%');
        $interpolateProvider.endSymbol('%>');
});
app.controller('stoveController', ['$http' , function($http) {
    var Stove = this;
    Stove.tasks = toDo;

    // $http.get('https://trello.com/1/authorize?expiration=never&name=SinglePurposeToken&key=164fdc267f24780b7e6505b71f2ebd4d').success(function(data) {
 
    // })
    Stove.phases = {
            toDo: toDo,
            doing: doing,
            done: done
        }


}]);



var toDo = [{
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


var doing = [{
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


var done = [{
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