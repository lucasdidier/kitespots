// Take total number of ratings and store it in array
var arrayRatings = [];
var ratingsCount = 0;
$( ".rating.value" ).each(function( index ) {
  arrayRatings.push( parseInt($(this).text()) );
  ratingsCount = ratingsCount + 1;
});

// Calculate average rating
var sumRatings = 0;
for( var i = 0; i < arrayRatings.length; i++ ){
    sumRatings += arrayRatings[i]; //don't forget to add the base
}

// Insert average rating into table header
var avgRatings = sumRatings/arrayRatings.length;
$('.overall-rating').text(avgRatings.toString());

// Insert number of ratings into ratings count
$('.number-of-reviews').text(ratingsCount.toString());


// Disable text selection of tile labels
(function($){
    $.fn.disableSelection = function() {
        return this
                 .attr('unselectable', 'on')
                 .css('user-select', 'none')
                 .on('selectstart', false);
    };
})(jQuery);

$('.checkbox-tile-label').disableSelection();
$('.radio-button-label').disableSelection();

// Hide the modal if click outside, leave it if click inside
   $('.add-review').on('click', function(){
   $('.modal-add-review').css('display', 'flex');
   console.log("Modal clicked")
   });
  // close modal on clicking close button
  $('.close-banner-wrapper').on('click', function(){
   $('.modal-add-review').hide();
   console.log("Modal hidden by button")
   });
  // close modal on click outside at anywhere
  $(document).on('click',function(e){
    if(!(($(e.target).closest(".submit-review").length > 0 ) || ($(e.target).closest(".add-review").length > 0))){
    $(".modal-add-review").hide();
    console.log("Modal hidden by clicking outside")
   }
  });

// Change appearance of custom checkbox or radio button tile on click    
  $( '.w-radio-input' ).click(function() {
    $(this).parent().nextAll().css( "background-color", "#f5f5f6" );
    $(this).parent().nextAll().css( "border-color", "#f5f5f6" );
    $(this).parent().prevAll().css( "background-color", "#EDF3FC" );
    $(this).parent().prevAll().css( "border-color", "#66A6FF" );
    $(this).parent().css( "background-color", "#EDF3FC" );
    $(this).parent().css( "border-color", "#66A6FF" );
  });
    

// Prevent form from being submitted with "Enter"
$('.submit-spot-form').on('keyup keypress', function(e) {
  var keyCode = e.keyCode || e.which;
  if (keyCode === 13) { 
    e.preventDefault();
    return false;
  }
});

// Script to check if radio button (level) is checked
var isRadioChecked = false;
$( '.w-radio-input' ).click(function() {
  isRadioChecked = true;
});

// Script to prevent spot submission if some fields haven't been checked
$(".submit-form.spot").click(function(e){

		/* Function to check if a checkbox is checked in the checkbox group 
    (during submission) */
    function isOneCheckboxChecked(checkboxClass) {
      var isChecked = false;
      $(checkboxClass).each(function() {
        if ( $(this).hasClass("w--redirected-checked") ) {
          console.log("One checkbox is checked");
          isChecked = true;
        }
      });
      return isChecked;
    }
		
    var oneFormElementIncomplete = ( !isRadioChecked 
    || !$("input.review-title").val()
    || !$(".input.review-comment").val()
    || !$("input.first-name").val() )
    
    if ( oneFormElementIncomplete ) {
    	
      console.log("Le formulaire est incomplet maggle !")
      console.log(oneFormElementIncomplete);
      // This prevents the form from being submitted
      e.preventDefault();
      
      // Show warning message
      $('.info-message.warning').css('display', 'flex');

      // Check if radio button is checked, if not display error
      if ( !isRadioChecked ) {
        $('.error-state-wrapper.rating').css('display', 'flex');
      }

      /* Check if inputs are empty or not, if they are, display error */
      if ( !$("input.review-title").val() ) {
        $('.error-state-wrapper.review-title').css('display', 'flex');
      }

      if ( !$(".input.review-comment").val() ) {
        $('.error-state-wrapper.review-comment').css('display', 'flex');
      }

      if ( !$("input.first-name").val() ) {
        $('.error-state-wrapper.first-name').css('display', 'flex');
      }

		} else {
    	console.log("Le formulaire est complet maggle !")
			console.log(oneFormElementIncomplete);
		}

});

// Everytime there's a radio button clicked, if there is an error message hide it
$( '.w-radio-input' ).click(function() {
  var parent = $(this).parent();
  var grandParent = parent.parent();
  var greatGrandParent = grandParent.parent();
  var error = greatGrandParent.find(".error-state-wrapper");
  if (error) {
    error.hide();
  }
});

// Same as above but for inputs
$(".input").on("input", function(){
  var parent = $(this).parent();
  var error = parent.find(".error-state-wrapper");
  if (error) {
    error.hide();
  }
});
