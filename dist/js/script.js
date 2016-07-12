/*/
//<reference path="DT/jquery.d.ts" />
///<reference path="DT/angular.d.ts" />
///<reference path="DT/bootstrap.d.ts" />
*/
var app = angular.module('stove', [], function($interpolateProvider){
        $interpolateProvider.startSymbol('<%');
        $interpolateProvider.endSymbol('%>');
})
app.run(function($rootScope) {
    $rootScope.$on('handleEmit', function(event, args) {
        $rootScope.$broadcast('handleBroadcast', args);
    });
});

app.filter('unsafe', function($sce) { return $sce.trustAsHtml; });
app.controller('stoveController', function ($scope, $http) {
        var Stove = this;
        Stove.project_config = jQuery('#project_data').text();
        Stove.project_config = JSON.parse(Stove.project_config);
        Stove.tasks = [];
        //Stove.project_id = '57151afd3c8352bf917462c1';
        Stove.project_id = Stove.project_config.trello_id;
       Stove.app_key = '9462c4973c64f83cd2c561c0c86cb4a5';
       Stove.token = '54ce3039d5b0f40f3d154d58bdcc3fed910ee1079aa44a41c989f1c9bac4680a';
        //var api_url = 'https://api.trello.com/1/boards/'+Stove.project_id+'/lists/?key='+Stove.app_key+'&token='+Stove.token;
        
        
        Stove.phases={};
        
        $scope.getLists = function(){
            var url = 'http://stove.madeostudio.com/project/get/'+Stove.project_id+'/';
            $http({
                    method: 'GET',
                    url: url
            }).then(function successCallback(response) {
                    response = response.data;
                    /*if(response.show_name_input){
                        jQuery('.stove_name').removeClass('hidden');
                    }*/
                    if(response.type == 'ok'){
                       Stove.phases = response.text;
                       jQuery('.tasks').fadeIn(500);
                       $scope.handleTabsScroll();
                    }/*else{
                        
                    }*/
                    
             });
        };
        
        $scope.getLists();
        
       
        $scope.$on('handleBroadcast', function(event, args) {
                        if(args.message){
                            jQuery('.stove_name').removeClass('hidden');
                        }
        }); 
        
        
        
        $scope.autoExpand = function(e) {
            var element = typeof e === 'object' ? e.target : document.getElementById(e);
                    var scrollHeight = element.scrollHeight; // -60 replace 60 by the sum of padding-top and padding-bottom
            element.style.height =  scrollHeight + "px";    
        };
        
        $scope.post_task = function(e){
            e.preventDefault();
          var list_id = e.target.attributes.list_id.nodeValue,
              tasktitle = jQuery.trim(jQuery('#new_tsk_title_'+list_id).val()),
              taskdesc = jQuery('#new_tsk_desc_'+list_id).val(),
              task_owner = jQuery('#new_tsk_owner_'+list_id).val(),
              res_slctr = jQuery('#tsk-res-'+list_id);
            res_slctr.html('');
            
            if(taskdesc == ''){
                taskdesc = 'false';
            }
            
            if(task_owner == '')
                task_owner = 'false';
            
            if(tasktitle != ''){
                //var add_task_url = '/project/new_task/'+list_id+'/'+encodeURIComponent(tasktitle)+'/'+taskdesc+'/'+task_owner+'/';
                //var add_task_url = '/project/new_task/';
                res_slctr.html('saving...').removeClass('hidden');
                //{list_id:list_id,tasktitle:tasktitle,taskdesc:taskdesc,task_owner:task_owner}
                
                var dataObj = {'list_id':list_id, 'task_title':tasktitle, 'task_desc':taskdesc,'task_owner':task_owner};
                $.ajax({
                    url: '/project/add/task/',
                    data: dataObj,
                    success: function(response) {
                        if(response.type == 'ok'){
                            res_slctr.html('task added');
                            window.location.reload();
                        }else{
                            res_slctr.html('Something Went Wrong!');
                        }

                    }
                  }).fail(function() {
                    res_slctr.html('Something Went Wrong!');
                  });
                /*$http.post(add_task_url,dataObj).then(function successCallback(response) {
                    response = response.data;
                    if(response.type == 'ok'){
                        res_slctr.html('task added');
                        window.location.reload();
                    }else{
                        res_slctr.html('Something Went Wrong!');
                    }
                    
                });*/
            }else{
                res_slctr.html('Task Name Required');
            }
           
        };
        
        
        $scope.get_comments = function(card_id){
            jQuery(".com_btn-"+card_id).addClass('active-commnet-btn');
            jQuery('[res-id=comm-res-'+card_id+']').html('');
            //var comment_url = 'https://api.trello.com/1/cards/'+card_id+'/actions/?filter=commentCard&key='+Stove.app_key+'&token='+Stove.token;
            var comment_url = '/comment/getCardComments/'+card_id;
            $http({
                    method: 'POST',
                    url: comment_url
            }).then(function successCallback(response) { 
                 response = response.data;
                 if(response.show_name_input){
                     jQuery('.stove_name').removeClass('hidden');
                 }
                 if(response.type == 'ok'){
                    var comment_data = response.text,
                        //comment_ele = jQuery('#comments-'+card_id),
                        comment_html = '',
                        cls = 'first';
                        ////"idMemberCreator":"55768924528ad3a7f6ab4452"
                        jQuery('.comments-'+card_id).find('.com-content').html('');   
                    for(var ind in comment_data){
                        var itm = comment_data[ind],
                            comm_date = new Date(itm.date),
                            comm_date = comm_date.toString("MMM d")+' at ' + comm_date.toString("h:mm tt"),
                            //commenter_id = itm.idMemberCreator,
                            //admin_id = '55768924528ad3a7f6ab4452',
                            commenter_name = itm.memberCreator.fullName;




                        comment_html += '<div class="row com-row '+cls+'" comment-id="comment-itm-'+itm.id+'">';
                        comment_html += '<div class="col-md-12"><span class="name">'+commenter_name+'</span><span class="date">'+comm_date+'</span></div>';
                        comment_html += '<div class="col-md-12">'+$scope.textToLinks(itm.data.text)+'</div>';
                        comment_html += '</div>';

                        jQuery('.comments-'+card_id).find('.com-content').append(comment_html);
                        comment_html = '';

                        if(cls != '')
                            cls = '';

                    }

                    angular.element('.comments-'+card_id).injector().invoke(function($compile) {
                           //var scope = angular.element(comment_html).scope();
                           //$compile(comment_html)($scope);
                          //jQuery('.comments-'+card_id).find('.close').after($compile(comment_html)($scope));

                           //$scope.apply();

                        //jQuery('.comments-'+card_id).find('.com-content').html($compile(comment_html)($scope));   
                        jQuery(".com_btn-"+card_id).popover({
                               html: true,
                               content: function () {
                                   return jQuery('.comments-'+card_id).html();
                               }
                           });
                           jQuery(".com_btn-"+card_id).popover('show');

                    });

                }
            });
        };
        
        $scope.post_comment = function(card_id){
            var comment_txt = jQuery('[txt-id=txt-comm-'+card_id+']').eq(1),
                res_ele = jQuery('[res-id=comm-res-'+card_id+']'),
                commenter_name = jQuery('[name-id=comr-name-'+card_id+']').eq(1),
                comment_txt = jQuery.trim(comment_txt.val());
                
            res_ele.html('saving').removeClass('hidden');
            if(comment_txt != ''){
                var post_comment_url = 'https://api.trello.com/1/cards/'+card_id+'/actions/comments/?text='+comment_txt+'&key='+Stove.app_key+'&token='+Stove.token;
                
                $http({
                    method: 'POST',
                    url: post_comment_url
                }).then(function successCallback(response) {
                    //res_ele.html('Saved');
                    
                    $scope.saveCommenterData(card_id,response.data.id, commenter_name.val(), res_ele);
                    //$scope.get_comments(card_id);
                },function errorCallback(response) {
                    console.log(JSON.stringify(response));     
                });
            }else{
                res_ele.html('Comment Text Required');
            }
            
        };
        
        $scope.saveCommenterData = function(card_id,trello_id, commenter_name, res_ele){
            if(commenter_name == '')
                commenter_name = 'false';
            var url = '/comment/add/'+trello_id+'/'+commenter_name;
            $http({
                    method: 'POST',
                    url: url
            }).then(function successCallback(response) {
                    response = response.data;
                    if(response.type == 'ok'){
                        res_ele.html('Saved');
                        //$scope.get_comments(card_id);
                        window.location.reload();
                    }else{
                        res_ele.html(response.text);
                    }
                            
                    
            },function errorCallback(response) {
                    console.log(JSON.stringify(response));     
            });
        }
        
        $scope.ChangeOpacity = function(e){
          var ele = e.currentTarget,
              ele_id = ele.attributes.id.nodeValue;
              
          if(ele_id.indexOf('new_tsk_desc_') != -1){
              var list_id = ele_id.split('new_tsk_desc_');
              list_id = list_id[1];
              jQuery('#add_tsk_content_'+list_id+' .option-link .desc-icon').css('opacity','1');
          }
          if(ele_id.indexOf('new_tsk_owner_') != -1){
              var list_id = ele_id.split('new_tsk_owner_');
              list_id = list_id[1];
              jQuery('#add_tsk_content_'+list_id+' .option-link .person-icon').css('opacity','1');
          }
          
        };
        
        $scope.BlurOpacity = function(e){
            var ele = e.currentTarget,
              ele_id = ele.attributes.id.nodeValue;
              
            if(ele_id.indexOf('new_tsk_desc_') != -1){
                var list_id = ele_id.split('new_tsk_desc_');
                list_id = list_id[1];
                jQuery('#add_tsk_content_'+list_id+' .option-link .desc-icon').removeAttr('style');
            }
            if(ele_id.indexOf('new_tsk_owner_') != -1){
                var list_id = ele_id.split('new_tsk_owner_');
                list_id = list_id[1];
                jQuery('#add_tsk_content_'+list_id+' .option-link .person-icon').removeAttr('style');
            }
        }
        
        $scope.resetUI = function(){
            $('.tab-content .tab-pane .table-row').removeClass('active');
            //close comment
            if($('.active-commnet-btn').length > 0){
                $('.popover .close').trigger('click');
            }
        }
        
        $scope.closeAddTask = function(e){
            e.stopPropagation();
            e.preventDefault();
            $('.tab-content .tab-pane .table-row').removeClass('active');
            var list_id = e.currentTarget.attributes.list_id.nodeValue;
            $('#new_tsk_desc_'+list_id).val('');
            $('#new_tsk_owner_'+list_id).val('');
            $('#tsk-res-'+list_id).html('').addClass('hidden');
            $('#add_tsk_content_'+list_id+' .option-link .person-icon, #add_tsk_content_'+list_id+' .option-link .desc-icon').removeAttr('style');
        }
        
        $scope.cardHover = function(e){
            var card_id = e.currentTarget.children[0].attributes.href.nodeValue,
            card_id = card_id.substring(1),
            btn_obj = jQuery('.com_btn-'+card_id);
            if(btn_obj.hasClass('ng-hide')){
                btn_obj.addClass('show_on_hover');
                btn_obj.removeClass('ng-hide');
            }
            
        }
        $scope.cardHoverOut = function(e){
            //var card_id = $(this).find('a.accordion-child').attr('href'),
            var card_id = e.currentTarget.children[0].attributes.href.nodeValue,
            card_id = card_id.substring(1),
            btn_obj = jQuery('.com_btn-'+card_id);
            if(btn_obj.hasClass('show_on_hover')){
                btn_obj.removeClass('show_on_hover');
                btn_obj.addClass('ng-hide');
            }
        }
       
        $scope.textToLinks = function(str){
            var regex = /(https?:\/\/([-\w\.]+)+(:\d+)?(\/([\w\/_\.]*(\?\S+)?)?)?)/ig
            var replaced_text = str.replace(regex, "<a href='$1' target='_blank'>$1</a>");
            return replaced_text;
        }
        
        $scope.closeTaskOnTitleClicked = function(e){
            var task_id = e.currentTarget.attributes.id.nodeValue;
            task_id = task_id.split('title-');
            if($('#accordion-item-'+task_id[1]).hasClass('active')){
                e.stopPropagation();
                e.preventDefault();
                $('.tab-content .tab-pane .table-row').removeClass('active');
                $('.comment[aria-describedby]').not($('#accordion-item-'+task_id[1]).find('.comment')).popover('hide').removeClass('active-commnet-btn');
            }
            
        }
        
        $scope.handleTabsScroll = function(){
            var target_container = jQuery('.nav-tabs-container'),
                target = jQuery('ul.nav-tabs.no-gutter'),
                start_offset = target.offset().top;
            jQuery(window).bind('scroll', function () {
                if (jQuery(window).scrollTop() > start_offset ) {
                    target_container.addClass('fixed-nav-container');
                    target.addClass('fixed_tabs container');
                } else if(jQuery(window).scrollTop() < start_offset) {
                    target.removeClass('fixed_tabs container');
                    target_container.removeClass('fixed-nav-container');
                }
            });
        }
        
        
        
    });


    
app.controller('togglController',function ($scope, $http) {
        //var toggl = this;
        $scope.current_workspace = '',
        $scope.workspaces = [];
        $scope.project_config = jQuery('#project_data').text();
        $scope.project_config = JSON.parse($scope.project_config);
        
        
        $scope.get_toggl_info = function(){
            //"id":14931865,"wid":802627,"cid":16214818
            var url = 'http://stove.madeostudio.com/stove/public/toggl/802627/16214818/14931865';
          //  var url = '/toggl/'+$scope.project_config.toggl_wid+'/'+$scope.project_config.toggl_cid+'/'+$scope.project_config.toggl_id;
            $http({
                    method: 'POST',
                    url: url
                }).then(function successCallback(response) {
                    $scope.hours = response.data.hours;
                    jQuery('#project-title').html(response.data.name);
                    /*if(response.data.show_name_input){
                        jQuery('.stove_name').removeClass('hidden');
                    }
                    */
                    //$scope.show_name_input = response.data.show_name_input;
                    //sharedService.prepForBroadcast(response.data.show_name_input);
                    $scope.$emit('handleEmit', {message: response.data.show_name_input});  
                    
                },function errorCallback(response) {
                    console.log(JSON.stringify(response));     
                });
            
        }
        
        $scope.get_toggl_info();
        
        $scope.getworkspaces = function(){
           var url = '/toggl/get_workspaces';
           $http({
                    method: 'POST',
                    url: url
                }).then(function successCallback(response) {
                    
                    $scope.current_workspace = response.data[0].id;
                    var toggl_workspaces = new Array();
                    for(var ind in response.data){
                        var itm = response.data[ind],
                            res_obj = {};
                            res_obj.id = itm.id;
                            res_obj.name = itm.name;
                            toggl_workspaces.push(res_obj);
                            
                        jQuery('#toggl-workspace').append('<option value="'+itm.id+'">'+itm.name+'</option>');
                    }
                    $scope.workspaces = toggl_workspaces;
                    
                },function errorCallback(response) {
                    console.log(JSON.stringify(response));     
                });
        }
        $scope.getclients = function(){
            var workspaceid = jQuery('#toggl-workspace').val(),
                url = '/toggl/get_workspace_clients/'+workspaceid;
           $http({
                    method: 'POST',
                    url: url
                }).then(function successCallback(response) {
                    
                    
                    var toggl_workspaces = new Array();
                    
                    for(var ind in response.data){
                        var itm = response.data[ind],
                            res_obj = {};
                            res_obj.id = itm.id;
                            res_obj.name = itm.name;
                            toggl_workspaces.push(res_obj);
                            
                            jQuery('#toggl-client').append('<option value="'+itm.id+'">'+itm.name+'</option>');
                    }
                    $scope.clients = toggl_workspaces;
                    
                },function errorCallback(response) {
                    console.log(JSON.stringify(response));     
                });
        }
        $scope.getprojects = function(){
            var workspaceid = jQuery('#toggl-workspace').val(),
                clientid = jQuery('#toggl-client').val(),
                url = '/toggl/get_client_projects/'+workspaceid+'/'+clientid;
           $http({
                    method: 'POST',
                    url: url
                }).then(function successCallback(response) {
                    
                    
                    var toggl_workspaces = new Array();
                    for(var ind in response.data){
                        var itm = response.data[ind],
                            res_obj = {};
                            res_obj.id = itm.id;
                            res_obj.name = itm.name;
                            toggl_workspaces.push(res_obj);
                    }
                    $scope.projects = toggl_workspaces;
                    
                },function errorCallback(response) {
                    console.log(JSON.stringify(response));     
                });
        }
}    );

    
