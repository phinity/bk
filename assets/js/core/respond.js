/*
  Respond JS
*/

//USAGE:
//$(window).on('mobileChange', function (e, mobile) {});

(function () {
    
    window.me = window.me || {};
    
    var init = function() {
      
      $(window).resize(function(e) {
        mobileChange();
      });
      
      setTimeout(function() {
        mobileChange();
      }, 0);
      
    };
    
    var mobileChange = function() {
      
      // mobile
      var newmobile = $(window).width() < 767;
      if (newmobile != me.mobile || typeof me.mobile === "undefined" ) {
        mobileClassing(newmobile);
        $(window).trigger('mobileChange', newmobile);
        me.mobile = newmobile;
      }
      
      
      // widescreen
      var newwidescreen = $(window).width() > 1140;
      if (newwidescreen != me.widescreen || typeof me.widescreen === "undefined" ) {
        mobileClassing(newmobile, newwidescreen);
        $(window).trigger('widescreenChange', newwidescreen);
        me.widescreen = newwidescreen;
      }
      
      
    }
    
    function mobileClassing(newmobile, newwidescreen) {
      if (newmobile) {
        $('body').addClass('mobile');
        $('body').removeClass('desktop');
      } else {
        $('body').removeClass('mobile');
        $('body').addClass('desktop');
      }
      
      if (newwidescreen) {
        $('body').addClass('widescreen');
      } else {
        $('body').removeClass('widescreen');
      }
      
    }
      
    // INIT Respond
    
    $(function() {
        init();
    });
    
})();

