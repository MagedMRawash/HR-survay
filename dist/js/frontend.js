var $;

$.fn.clickOff = function(callback, selfDestroy) {
    var clicked = false;
    var parent = this;
    var destroy = selfDestroy || true;
    
    parent.click(function() {
        clicked = true;
    });
    
    $(document).click(function(event) { 
        if (!clicked) {
            callback(parent, event);
        }
        if (destroy) {
            //parent.clickOff = function() {};
            //parent.off("click");
            //$(document).off("click");
            //parent.off("clickOff");
        };
        clicked = false;
    });
};
/*$("body").delegate('.active .comment', "mouseenter", function (e) {
    e.preventDefault();
    $(this).popover({
        html: true,
        content: function () {
            return $(this).next('.PopupCont-comment').html();
        }
    });
    $(this).on('shown.bs.popover', function (ev) {
        var _this = this;
        ev.stopPropagation();
        ev.stopImmediatePropagation();
        ev.preventDefault();
        var PopupThis = $(this);
        $("#" + PopupThis.attr("aria-describedby")).find('.close ').click(function () {
            PopupThis.click();
        });
        $('.comment[aria-describedby]').not(PopupThis).each(function ($) {
            $(_this).popover('hide');
        });
    });
    $(this).off("mouseenter");
});*/

$("body").delegate('.popover .close','click',function(){
    var card_id = $(this).attr('card-id');
    jQuery(".com_btn-"+card_id).popover('hide').removeClass('active-commnet-btn');
});

$("body").delegate('.tab-content .tab-pane .table-row', "click", function (e) {
    if(!$(this).hasClass('active')){
        e.stopPropagation();
        e.preventDefault();
        $('.tab-content .tab-pane .table-row').removeClass('active');
        $(this).addClass('active');
        $('.comment[aria-describedby]').not($(this).find('.comment')).popover('hide').removeClass('active-commnet-btn');
        if($(this).hasClass('add-card-div')){
            var scroll_top = $(window).scrollTop(),
                this_height = $(this).height();
                $('html, body').animate({scrollTop:scroll_top+this_height},500);
        }
    }
});

$(document).on('click','.post-comment-btn',function(){
    var card_id = $(this).attr('card-id'),
    angu_scope = angular.element(document.getElementById('mycontroller')).scope();
    
    if(angu_scope){
        angu_scope.post_comment(card_id);
    }
});


$('body').on('click',function(e){
    //e.preventDefault();
    //e.stopPropagation();
    if(e.target.nodeName == 'BODY'){
        var angu_scope = angular.element(document.getElementById('mycontroller')).scope();
        if(angu_scope){
            angu_scope.resetUI();
        }
    }
     
});
/*$("section.tasks").clickOff(function() {
    var angu_scope = angular.element(document.getElementById('mycontroller')).scope();
    
    if(angu_scope){
        angu_scope.resetUI();
    }
});*/

$(document).keyup(function(e) {
  
  if (e.keyCode === 27){
        var angu_scope = angular.element(document.getElementById('mycontroller')).scope();
    
        if(angu_scope){
            angu_scope.resetUI();
        } 
  } 
});



