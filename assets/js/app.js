$(document).ready(function(){
  console.log("It's Aliiive!!");


  // $('.container').slick({
  //   arrows: false,
  //   dots: false,
  //   vertical: true,
  //   touchMove: false,
  //   swipe: false,
  //   swipeToSlide: false
  // });


  let media_scroll_position = 0;
  setTimeout(RotateCarousel, 1000);
  function RotateCarousel() {

    if ($(window).width() > 768) {
      $(".media_scroll_list li:first-child").animate({ marginLeft: -500 }, 10000, 'linear', function () {
      $(".media_scroll_list li:first-child").appendTo('.media_scroll_list');
      $(".media_scroll_list li:last-child").css({marginLeft: '0'});
      RotateCarousel();
      });
    }
    else if ( $(window).width() == 768) {
      $(".media_scroll_list li:first-child").animate({ marginLeft: -350 }, 8000, 'linear', function () {
      $(".media_scroll_list li:first-child").appendTo('.media_scroll_list');
      $(".media_scroll_list li:last-child").css({marginLeft: '0'});
      RotateCarousel();
      });
    }
    else if ($(window).width() <= 420) {
      $(".media_scroll_list li:first-child").animate({ marginLeft: -250 }, 8000, 'linear', function () {
      $(".media_scroll_list li:first-child").appendTo('.media_scroll_list');
      $(".media_scroll_list li:last-child").css({marginLeft: '0'});
      RotateCarousel();
      });
    }
  }


  // $(window).scroll(function () {
  //     let scroll_position = $(window).scrollTop();
  //     console.log("scroll position" + scroll_position);
  //     if (scroll_position > 50) {
  //       console.log("now");
  //       $('.container').slick('slickGoTo', '0');
  //     }
  //
  //   });



  });
