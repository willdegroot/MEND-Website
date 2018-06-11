/**
 * Theme JS
 */

'use strict';


/*** Navbar ***/

var Navbar = (function() {
	
	// Variables
	// =========

	var $window = $(window);
	var $navbar = $('.navbar');
	var $navbarCollapse = $('.navbar-collapse');

	var isLight = false;
	var isCollapsed = false;
	var isTogglable = $navbar.hasClass('navbar-togglable');

	// Methods
	// =======

	function makeNavbarLight() {

		if ( !isLight && isTogglable ) {
			$navbar.removeClass('navbar-dark').addClass('navbar-light');

			isLight = true;
		}
	}
	function makeNavbarDark() {

		if ( isLight && isTogglable ) {
			$navbar.removeClass('navbar-light').addClass('navbar-dark');

			isLight = false;
		}
	}
	function toggleNavbar(action) {
		var scrollTop = $window.scrollTop();

		if ( scrollTop > 0 ) {
			makeNavbarLight();
		} else {

			if ( action == 'scroll' && !isCollapsed ) {
				makeNavbarDark();
			} else if ( action == 'collapse' && !isCollapsed ) {
				makeNavbarLight();
			} else if ( action == 'collapse' && isCollapsed ) {
				makeNavbarDark();
			}
		}
	}

	// Events
	// ======

	$window.on({
		'scroll': function() {

			setInterval(function() {
				toggleNavbar('scroll');
			}, 100);
		},
		'load': function() {
			toggleNavbar('scroll');
		}
	});

	$navbarCollapse.on({
		'show.bs.collapse': function() {
			toggleNavbar('collapse');

			isCollapsed = true;
		},
		'hide.bs.collapse': function() {
			toggleNavbar('collapse');

			isCollapsed = false;
		}
	});

})();


/*** Modal ***/

var Modal = (function() {
	
	// Variables
	// =========

	var $modal = $('.modal');

	// Methods
	// =======

	function startVideo(video) {
		video.play();

		console.log('Video started');
	}
	function pauseVideo(video) {
		video.pause();

		console.log('Video paused');
	}

	// Events
	// ======

	$modal.on({
		'shown.bs.modal': function() {
			var $this = $(this);

			if ( $this.find('.modal-dialog-video').length ) {
				var video = $(this).find('video');

				if ( video.length ) {
					startVideo(video.get(0));
				}
			}
		},
		'hide.bs.modal': function() {
			var $this = $(this);

			if ( $this.find('.modal-dialog-video').length ) {
				var video = $(this).find('video');

				if ( video.length ) {
					pauseVideo(video.get(0));
				}
			}	
		}
	});

})();


/*** Testimonials ***/

var Testimonials = (function() {
	
	// Variables
	// =========

	var $testimonialSlider = $('.testimonial-slider');

	// Methods
	// =======

	function initSlider() {
		
		$testimonialSlider.each(function() {
			var $this = $(this);
			var testimonialSlider = $this.flickity({
				cellAlign: 'center',
				initialIndex: 2,
				prevNextButtons: false,
				pageDots: false,
				contain: true,
				wrapAround: true,
				imagesLoaded: true,
				percentPosition: true
			});
		});
	}

	// Events
	// ======

	// Init slider

	if ( $testimonialSlider.length ) {
		initSlider();
	}

})();


/*** Current year ***/

var CurrentYear = (function() {
	
	// Variables
	// =========

	var $currentYear = $('.current-year');

	// Methods
	// =======

	function appendYear() {
		var currentYear = new Date().getFullYear();
		
		$currentYear.html(currentYear);
	}

	// Events
	// ======

	if ( $currentYear.length ) {
		appendYear();
	}

})();


/*** Map ***/

var Map = (function() {
	
	// Variables
	// =========

	var $mapContainer = $('.map-container');

	// Methods
	// =======

	function init() {
		$mapContainer.each(function() {
			var $this = $(this);

			var zoom = $this.data('zoom');
			var markers = $this.data('markers');
			var center = {
				lat: markers[0][0],
				lng: markers[0][1]
			};
			var styles = [{"featureType":"all","elementType":"geometry.fill","stylers":[{"weight":"2.00"}]},{"featureType":"all","elementType":"geometry.stroke","stylers":[{"color":"#9c9c9c"}]},{"featureType":"all","elementType":"labels.text","stylers":[{"visibility":"on"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"landscape.man_made","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#eeeeee"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#7b7b7b"}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#46bcec"},{"visibility":"on"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#c8d7d4"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#070707"}]},{"featureType":"water","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"}]}];

			// Init map

			var map = new google.maps.Map($this.get(0), {
				center: center,
				styles: styles,
				zoom: zoom
			});

			// Create markers

			var bounds = new google.maps.LatLngBounds();
			// var markerColor = getComputedStyle(document.body).getPropertyValue('--primary');

			markers.forEach(function(item, i, arr) {
				var position = {
					lat: item[0],
					lng: item[1]
				};
				var marker = new google.maps.Marker({
					position: position,
					map: map
				});

				// Extend bounds
				bounds.extend(position);
			});

			// Fit bounds

			if ( !zoom ) {
				map.fitBounds(bounds);
			}
		});
	}

	// Events
	// ======

	// Init map

	if ( $mapContainer.length ) {
		init();
	}

})();


/*** Slider ***/

var Slider = (function() {
	
	// Variables
	// =========

	var $slider = $('.slider');
	var $sliderControl = $('.slider-control');

	var cellSelector = '.slider-item';

	// Methods
	// =======

	function init() {
		$slider.each(function() {
			var $this = $(this);

			// Options
			var prevNextButtons = !$this.hasClass('slider-no-controls');
			var draggable = !$this.hasClass('slider-no-draggable');
			var arrowShape = 'M 35 50 L 60 25 L 65 30 L 45 50 L 65 70 L 60 75 Z';

			// Init
			$this.flickity({
				wrapAround: true,
				pageDots: false,
				prevNextButtons: prevNextButtons,
				draggable: draggable,
				cellSelector: cellSelector,
				cellAlign: 'left',
				contain: true,
				imagesLoaded: true,
				arrowShape: arrowShape
			});
		});
	}

	function bind($sliders, index) {
		$sliders.each(function() {
			var $this = $(this);

			$this.flickity('select', index);
		});
	}

	function slide($targetSlider, direction) {
		$targetSlider.flickity(direction);
	}

	// Events
	// ======

	// Init

	if ( $slider.length ) {
		init();
	}

	// Bind

	$slider.on({
		'change.flickity': function(e, index) {
			var $this = $(this);
			var binded = $this.data('slider-binded');

			if ( binded ) {
				var $sliders = $(binded).not($this);

				bind($sliders, index);
			}
		}
	})

	// Slide

	$sliderControl.on({
		'click': function(e) {
			e.preventDefault();

			var $this = $(this);
			var href = $this.attr('href');
			var $targetSlider = $(href);
			var direction = $this.data('slide');

			slide($targetSlider, direction);
		}
	});

})();


/*** Smooth scroll ***/

var SmoothScroll = (function() {
	
	// Variables
	// =========

	var $root = $('html, body');
	var $anchorLink = $('a[href^="#"]:not([href="#"]):not([data-toggle]):not([data-slide])');

	var DURATION = 500;

	// Methods
	// =======

	function scrollTo(elem) {
		var $target = $(elem);

		$root.animate({
			scrollTop: $target.offset().top
		}, DURATION);
	}

	// Events
	// ======

	$anchorLink.on({
		'click': function(e) {

			if ( typeof CSS === 'function' && typeof CSS.supports === 'function' && !CSS.supports('scroll-behavior', 'smooth')) {
				e.preventDefault();

				scrollTo( $(this).attr('href') );
			}
		}
	});

})();


/*** Newsletter ***/

var Newsletter = (function() {

	// Variables
	// =========

	var $form = $('#mc-embedded-subscribe-form');
	var $formEmail = $('#mce-EMAIL');
	var $formClone = $('.form-mailchimp-clone');
	var $formCloneEmail = $formClone.find('input[type="email"]');

	// Methods
	// =======

	function signup() {

		$.ajax({
			type: $form.attr('method'),
			url: $form.attr('action'),
			data: $form.serialize(),
			cache: false,
			dataType: 'json',
			contentType: "application/json; charset=utf-8",
			error: function(err) {
				$(document).trigger('alert.show', ['danger', 'Could not connect to the registration server. Please try again later.']);
			},
			success: function(data) {

				if (data.result != 'success') {
					var msg = data.msg;
						
					$(document).trigger('alert.show', ['danger', msg]);
				} else {

					// Show a confirmation
					$(document).trigger('alert.show', ['success', data.msg]);
					
					// Reset a form
					$form[0].reset();
				}
			}
		});
	}
	function signupImitation() {

		// Check if the original form exists on a page
		if ( $form ) {
			$form.submit();
		}
	}
	function copyInputContent() {

		// Check if the original form exists on a page
		if ( $formEmail.length ) {
			var content = $formCloneEmail.val();

			$formEmail.val(content);
		}
	}

	// Events
	// ======

	// Sign up to a Mailchimp newsletter campaign on form submit
	$form.on('submit', function(e) {
		e.preventDefault();

		signup();
	});

	// Imitate form submission on clone submit
	$formClone.on('submit', function(e) {
		e.preventDefault();

		signupImitation();
	});

	// Copy input content to the original form input field
	$formCloneEmail.on('keyup', function() {
		copyInputContent();
	});

})();


/*** Alerts ***/

var Alert = (function() {

	// Variables
	// =========

	var LIFETIME = 5000;

	// Methods
	// =======

	function generate(type, message) {

		// Create alert
		var $alert = $('<div class="alert alert-' + type + ' alert-fixed fade show" role="alert">' + message + '</div>');

		// Append alert to the body
		$('body').append($alert);

		// Remove alert
		setTimeout(function() {
			$alert.alert('close');
		}, LIFETIME);
	};

	// Events
	// ======

	$(document).on({
		'alert.show': function(e, type, message) {
			generate(type, message);
		}
	});

})();


/*** Code ***/

var Code = (function() {
	
	// Variables
	// =========

	var $code = $('.code');

	// Methods
	// =======

	function init(i, block) {
		hljs.highlightBlock(block);
	}

	// Events
	// ======

	$code.each(function(i, block) {
		init(i, block);
	});

})();


/*** Animations ***/

var Animations = (function() {

	// Variables
	// =========

	var $window = $(window);
	var $animation = $('[data-animation]');

	// Methods
	// =======

	function init(elem) {
		elem.each(function() {
			$(this).addClass('animate');
		});
	}

	// Events
	// ======

	$window.on('load', function() {

		$animation.each(function() {
			var $this = $(this);
			
			new Waypoint.Inview({
				element: $this,
				enter: function() {
					
					if ( $this.data('animation-trigger') == 'enter') {
						init( $this );
					}
				},
				entered: function() {

					if ( $this.data('animation-trigger') == 'entered') {
						init( $this );
					}
				}
			});
		});

	});
	
})();