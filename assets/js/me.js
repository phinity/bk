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
    
    window.me.impressing = null;
    
    var init = function() {
      
      cooperPress();
      
    };
    
    cooperPress = function() {
      
      $(window).on('mobileChange', function() {
        
        // listen for mobile change and reload
        if(window.me.impressing != window.me.mobile) {
          location.reload(false);
        }
      });
      
      // init impress, or don't if mobile
      setTimeout(function() {
        if(!window.me.mobile) {
          impress().init();
          window.me.impressing = true;
        } else {
          window.me.impressing = false;
        }
      },0);
      
    };
    
    // INIT 
    
    $(function() {
        init();
    });
    
})();

