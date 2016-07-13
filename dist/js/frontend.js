var $;
/**************
 * JQuery new Method
 **************** */
$.fn.equals = function (compareTo) {
    if (!compareTo || this.length != compareTo.length) {
        return false;
    }
    for (var i = 0; i < this.length; ++i) {
        if (this[i] !== compareTo[i]) {
            return false;
        }
    }
    return true;
};
/**************
 * END JQuery new Method
 **************** */
$("body").one("click", function (e) {
    e.stopPropagation();
    e.preventDefault();
    triggerEvent();
});
function triggerEvent() {
    $(".comment ").on("initComment", function (e) {
        e.stopPropagation();
        //e.stopImmediatePropagation()
        e.preventDefault();
        $(this).popover({
            html: true,
            content: function () {
                return $(this).next('.PopupCont-comment').html();
            }
        });
        $(this).on('shown.bs.popover', function (ev) {
            ev.stopPropagation();
            ev.stopImmediatePropagation();
            ev.preventDefault();
            $(this).addClass('opened');
            var PopupThis = $(this);
            $("#" + PopupThis.attr("aria-describedby")).find('.close ').click(function () {
                PopupThis.popover('hide');
            });
            $('.opened').not(PopupThis).popover('hide').removeClass('opened');
        }).on('hidden.bs.popover', function (ev) {
            ev.stopPropagation();
            ev.stopImmediatePropagation();
            ev.preventDefault();
            $(this).removeClass('opened');
        });
    });
    /************** openTask ***************** */
    $('.table-row').on("openTask", function (event) {
        $(this).trigger('closeTask').addClass('active').find(' .comment ').triggerHandler("initComment");
    });
    /************** closeTask ***************** */
    $('.table-row').on("closeTask", function (e) {
        $('.table-row').removeClass('active');
        $('.opened').popover('hide').removeClass('opened');
    });
    /************** initComment ***************** */
    $('.table-row').on("click", function (e) {
        if (!$(this).hasClass('openedTask')) {
            $(this).triggerHandler("openTask");
            $('.table-row').removeClass('openedTask');
            $(this).addClass('openedTask');
        }
    });
    $(document).mouseup(function (e) {
        if (clickedOutSide(e, $(".openedTask , .popover "))) {
            $(".openedTask").trigger('closeTask').removeClass('openedTask');
        }
        $('.addList .close .icon').on('click', function (e) {
            $('.addList .active').removeClass('active');
        });
        $('.init-link').click(function () {
            $(this).parent().addClass('show');
        });
    });
}
function clickedOutSide(e, params) {
    var container = params;
    if (!container.is(e.target) // if the target of the click isn't the container...
        && container.has(e.target).length === 0) {
        return false;
    }
    else {
        return false;
    }
}
/*******************************
 ****** ISSUES
 * if you opened anther task row then open comment for previus task row you have to click unneeded one more click
 *
 *********************/
// $('#').onClick(function(){
//   if(  $(this).hasClass('opened')  ){
//      $('#').fadeOut();
//   $(this).removeClass('opened');
//  }
//  else{
//     $('#').fadeIn();
//   $(this).addClass('opened');
//  }
// })
