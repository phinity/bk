/**
 * me.js
 *
 * This is a personal project for "me".
 *
 * Copyright 2016 Ben Korody <me@benkorody.com>
 *
 * ------------------------------------------------
 * @author:  Ben Korody
 * @version: 0.1.0
 * @url:     https://github.com/phinity/bk
 * @source:  https://github.com/phinity/bk
 * @license: https://creativecommons.org/licenses/by-nc-nd/3.0/
 */


(function () {
    
    window.me = window.me || {};
    
    window.me.pressing = null;
    
    var init = function() {
      
      cooperPress();
      
      rot13email();
      
    };
    
    var cooperPress = function() {
      
      $(window).on('mobileChange', function() {
        
        // listen for mobile change and reload
        if(window.me.pressing != window.me.mobile) {
          location.reload(false);
        }
      });
      
      // init impress, or don't if mobile
      setTimeout(function() {
        if(!window.me.mobile) {
          impress().init();
          window.me.pressing = true;
        } else {
          window.me.pressing = false;
        }
      },0);
      
    };
    
    var rot13email = function() {
      
      var string1 = "zr";
      var string2 = "&#64;";
      var string3 = "oraxbebql.pbz";
      var string4 = string1 + string2 + string3;
      $('#myemail').html("<a href=" + "mail" + "to:" + rot13(string4) + ">" + rot13(string4) + "</a>");
      
    }
    
    var rot13 = function(z) {
        return z.replace(/[a-zA-Z]/g,
          function(c){return String.fromCharCode((c<="Z"?90:122)>=(c=c.charCodeAt(0)+13)?c:c-26);});
    }
    
    // INIT 
    
    $(function() {
        init();
    });
    
})();

