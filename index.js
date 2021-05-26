// immediately/self invoked function. This function executes right away
(function() {
  // create a new Library instance and store it in a variable called "customBlogPosts"
  var kiteSpots = new FsLibrary('.spot-full-page-list')

  // define 4 filter groups in an array and store it in a variable called myFilters
var myFilters = [
  {
    filterWrapper: ".filter-bar-country",  // parent wrapper of filter group1
    filterType: "multi"
  },
  {
    filterWrapper: ".filter-bar-level",  // parent wrapper of filter group1
    filterType: "multi"
  },
  {
    filterWrapper: ".filter-bar-windseason",  // parent wrapper of filter group1
    filterType: "multi"
  },
  {
    filterWrapper: ".filter-bar-windforecast",  // parent wrapper of filter group1
    filterType: "multi"
  },
  {
    filterWrapper: ".filter-bar-travelers",  // parent wrapper of filter group1
    filterType: "multi"
  },
  {
    filterWrapper: ".filter-bar-search",  // parent wrapper of filter group1
    filterType: "exclusive"
  }
]

  // run the filter Library component on your instance
  kiteSpots.filter({
    filterArray: myFilters, // variable of the array we created above
    filterReset: ['.reset-filters', 'reset-filters-mobile'],
    emptyMessage: '.empty-message',
    activeClass: 'button-active', // class that styles the active state (optional)
    animation: {
    	enable: false,
    }
  })
  
  kiteSpots.sort({
    sortTrigger: '.sort-button', // class of the button........
    sortReverse: false, // if you want sort first click to be Z>A.......
    activeClass: 'button-active', // class that styles the active state
    animation: {
      duration: 0,
    }
  })
  
  kiteSpots.nest({
     textList: '.text-of-categories-list',  // plaintext comma separated list
     nestSource: '.nest-multi-reference',  // CMS list we are taking real tags from
     nestTarget: '.multi-ref-target'  // where we paste the items from nestSource
  })
  
})();

// Script to update the number of spots when filter values are changed 
spotNumber = $('.kite-spot').length;
$('.spot-count').text(spotNumber);
$('.display-results').html('Display ' + spotNumber + ' results');

// Second part to update the number of spots in the filters button on mobile when values are changed.
function UpdateNumberOfSpots() {
	spotNumber = $('.kite-spot:visible').length;
  console.log(spotNumber);
  $('.spot-count').text(spotNumber);
  $('.display-results').html('Display ' + spotNumber + ' results');
}

$( ".filter-button" ).click(UpdateNumberOfSpots);

var wto;

$('.search-text-field').on("change paste keyup", function() {
  clearTimeout(wto);
  wto = setTimeout(function() {
  	console.log("Hello retard 1 seconde !");
  	UpdateNumberOfSpots();
  }, 1000);
});


// Script to display the "Reset filter" button only when filter are active, this part for the clicked filters....
function ToggleResetFilters() {
    var activeFiltersCountries = $('.filter-bar-country').find('.filter-button.button-active');;
		var activeFiltersLevels = $('.filter-bar-level').find('.filter-button.button-active');
  	var activeFilters = $.merge(activeFiltersCountries, activeFiltersLevels);
  	var activeFiltersWindSeason = $('.filter-bar-windseason').find('.filter-button.button-active');;
  	activeFilters = $.merge(activeFilters, activeFiltersWindSeason);
  	var activeFiltersWindForecast = $('.filter-bar-windforecast').find('.filter-button.button-active');;
  	activeFilters = $.merge(activeFilters, activeFiltersWindForecast);
  	var activeFiltersTravelers = $('.filter-bar-travelers').find('.filter-button.button-active');
    activeFilters = $.merge(activeFilters, activeFiltersTravelers);
    if ( $('.search-text-field').val() ) {
    	activeFilters = $.merge(activeFilters, $('.search-text-field'));
    }
  
  	if ( activeFilters.length == 0 ) { 
  		$( ".reset-filters" ).hide();
  	} else {
  		$( ".reset-filters" ).show();
      $( ".reset-filters" ).css('display', 'flex');
  	}
    
}

$( ".filter-button" ).click(ToggleResetFilters);
$('.search-text-field').on('input', ToggleResetFilters);

$( ".reset-filters" ).click(function() {
  var spotNumber = $('.kite-spot:visible').length;
  $('.spot-count').text(spotNumber);
	$( ".reset-filters" ).hide();
  $('.display-results').html('Display ' + spotNumber + ' results');
});


// Script to show Filters Wrapper when clicked on "Show filter" on mobile
if (window.matchMedia("(max-width: 991px)").matches) {
  $( ".show-filters" ).click(function() {
		$( ".filters-wrapper" ).show();
    $( ".filter-actions-wrapper" ).css('display', 'flex');
	});
  $( ".display-results" ).click(function() {
		$( ".filters-wrapper" ).hide();
    $( ".filter-actions-wrapper" ).hide();
	});
  $( ".reset-filters" ).click(function() {
		$( ".filters-wrapper" ).hide();
    $( ".filter-actions-wrapper" ).hide();
	});
} else {
	$( ".filters-wrapper" ).show();
}

// Script to adapt size of "Button small" from 30% to 35% when window is a certain size
function SetSizeOfButtonSmall() {
  if (window.matchMedia('(min-width:992px) and (max-width: 1144px)').matches) {
    $('.button.small').width("40%");
    $('.school-name-wrapper').width("45%");
    $('.google-ratings').width("15%");
    $('.ratings-count').hide();
  } else if (window.matchMedia('(min-width: 1145px)').matches) {
  	$('.button.small').width("30%");
    $('.school-name-wrapper').width("50%");
    $('.google-ratings').width("20%");
    $('.ratings-count').show();
	}
}

$(window).resize(SetSizeOfButtonSmall);

// Script to adapt the size of the spots card if the browser is smaller than 1144px wide

function SetHeightOfSpotCardForDesktop() {
  if (window.matchMedia('(min-width:992px) and (max-width: 1144px)').matches) {
    $('.spot-card').height(604);
  } else if (window.matchMedia('(min-width: 1145px)').matches) {
  	$('.spot-card').height(572);
  }
}

$(window).resize(SetHeightOfSpotCardForDesktop);


// Script to hide buttons when "Display results" button is clicked on mobile

$( ".display-results" ).click(function() {
  
 	$( ".filter-actions-wrapper" ).hide();
  
});

// Script to update the VH of the Filters Wrapper element when scrolling

  
  function SetFiltersWrapperHeight() {
  	if (window.matchMedia('(min-width:992px)').matches) {
      var windowHeight = $(window).height();
      var button = $(".filters-wrapper"); //get offset of second div
      var offset = button.offset().top; //check for top property
      if ($(window).scrollTop() >= offset) {
          $(".filters-wrapper").height(windowHeight);
        } else {
          $(".filters-wrapper").height(windowHeight - 66);
        }
    }
  }
  
  $(window).scroll(SetFiltersWrapperHeight);
  $(window).resize(SetFiltersWrapperHeight);
  
// Script to make the "cross" icon close the banner on the homepage

$( ".close-banner-wrapper" ).click(function() {
		$( ".info-banner" ).hide();
	});
