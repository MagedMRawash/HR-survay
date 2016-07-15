
var $: any;

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


$("body").one("click", function (e: any) {

  triggerEvent()

})



function triggerEvent() {

  $(".comment ").on("initComment", function (e: any) {
    e.stopPropagation()
    //e.stopImmediatePropagation()
    e.preventDefault()


    $(this).popover({
      html: true,
      content: function () {
        return $(this).next('.PopupCont-comment').html();
      }
    });


    $(this).on('shown.bs.popover', function (ev: any) {
      ev.stopPropagation()
      ev.stopImmediatePropagation()
      ev.preventDefault()
      $(this).addClass('opened');
      var PopupThis: any = $(this);

      $("#" + PopupThis.attr("aria-describedby")).find('.close ').click(function () {
        PopupThis.popover('hide');
      })

      $('.opened').not(PopupThis).popover('hide').removeClass('opened');

    }).on('hidden.bs.popover', function (ev: any) {
      ev.stopPropagation()
      ev.stopImmediatePropagation()
      ev.preventDefault()
      
            $(this).removeClass('opened');

    
  
 
});
    
    
    
  });


  /************** openTask ***************** */


$('body').on("openTask", '.table-row', function (event: any) {
    $(this).trigger('closeTask').addClass('active').find(' .comment ').triggerHandler("initComment");
  });


  /************** closeTask ***************** */


  $('body').on( "closeTask", '.table-row', function (e) {
    $('.table-row').removeClass('active');
    $('.opened').popover('hide').removeClass('opened');

  });

  /************** initComment ***************** */




  $('body').on("click", '.table-row',  function (e) {
    if(!$(this).hasClass('openedTask') ){
        $(this).trigger("openTask");
        $('.table-row').removeClass('openedTask');
        $(this).addClass('openedTask');
        
      }
  })



$(document).mouseup(function (e)
{

if (clickedOutSide(e , $(".openedTask , .popover ")) ){
    $(".openedTask").trigger('closeTask').removeClass('openedTask');
}
    
$('.addList .close .icon').on('click', function(e){
  $('.addList .active').removeClass('active');
});


    $('.init-link').click(function(){
    $(this).parent().addClass('show');  
    })




});






}





function clickedOutSide(e : any , params: any ) {
      var container = params ;

    if (!container.is(e.target) // if the target of the click isn't the container...
        && container.has(e.target).length === 0) // ... nor a descendant of the container
    {
      return true 
    // return true  
    }else{
      return false 
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




// $('.twest').fadeOut(0);









