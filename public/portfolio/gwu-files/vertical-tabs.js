$(document).ready(function() {

//*** Open close *classed* h3 classes on particular pages marked "vertical-tabs"
//The Script to add to Metadata is:
//<script>$('body').addClass('vertical-tabs');</script>

//1st setup the page
$('.vertical-h3-tabs h3').nextAll().attr("tabindex", "1");
$(".vertical-h3-tabs h3").attr("tabindex", "1");

//Wrap everything from one <h3> to the next <h3> in a div and ".hide()" it  
$(".vertical-h3-tabs h3").each(function(){
       $(this).nextUntil('h3').wrapAll('<div/>');
       $(this).next().hide();
});

//Toggle open/close state on click & keypress
 $(".vertical-h3-tabs h3").click(function(){
    $('h3.open').not($(this)).removeClass('open').next().slideUp(1000);
    $(this).toggleClass('open');
    $(this).next().slideToggle(1000);
  });
 // For accessibility - handles request on any keypress
 $(".vertical-h3-tabs h3").keypress(function(){
    $('h3.open').not($(this)).removeClass('open').next().slideUp(1000);
    $(this).toggleClass('open');
    $(this).next().slideToggle(1000);
  });


});//End document ready