/*
  Animation JS
*/

(function () {
    
    window.twoseventy = window.twoseventy || {};
    
    var init = function() {
      
      pageStats();
      
      card.init();
      
      scrollAppear();
      
      twoseventy.scrollToAnchor();
      
      backgroundImageScroll();
      
      setTimeout(function() {
        backgroundImageScroll();
      }, 900);
      
    };
    
    
    window.ana = {};
    var pageStats = function() {
      ana = {
        winHeight: $(window).height(),
        winWidth: $(window).width(),
        docHeight: $(document).height(),
        scrollTop: $(window).scrollTop()
      };
    };
    
    
    /*
     * Card flip animation
     */
    
    var card = {
        
        select: '.card-flip',
        $cardContainer: false,
        cardTimeout: false,
        cardFocus: false,
        
        init: function () {
            card.$cardContainer = $(card.select);
            
            // card Click
            card.$cardContainer.find('.card-handle').bind('click', function(e) {
                e.preventDefault();
                
                var _this = $(this).parents(card.select) || $(this);
                card.toggle(_this);
                
            });
            
            card.$cardContainer.focus(function(e) {
              card.cardFocus = $(this);
            }).blur(function(e) {
              card.cardFocus = false;
            });
            
            $(document).bind('keydown', function(e) {
            //card.$cardContainer.find('.card-handle').bind('keydown', function(e) {
              
              e = e || window.event;
              var charCode = e.which || e.keyCode;
              
              if(charCode == 13) {
                if(card.cardFocus) {
                  card.toggle(card.cardFocus);
                }
              }
              
            });
            
            // card hover
            card.$cardContainer.hover(function () {
              
              if($(this).hasClass('card-hover')) {
                
                $(this).addClass('animating');
                var _this = $(this);
                card.cardTimeout = setTimeout(function() {
                  if( !_this.hasClass('card-active') ) {
                    card.toggleActive(_this);
                  }
                }, 1500);
              }
            }, function () {
                clearTimeout(card.cardTimeout);
            });
            
        },

        toggle: function(_this) {
      
          if( !$(_this).hasClass('card-active') ) {
              card.toggleActive(_this);
          } else {
              card.toggleInactive(_this);
          }
          clearTimeout(card.cardTimeout);
      
        },
    
        toggleInactive: function(_this) {
            _this.removeClass('card-active').blur();
        },

        toggleActive: function(_this) {

          var toggleSet = _this.data('flip')
            card.$cardContainer.each(function() {
              if($(this).data('flip') == toggleSet) {
                $(this).removeClass('card-active');
              }
            })

            _this.addClass('card-active');
            _this.addClass('animating');
        
            setTimeout(function () {
                _this.removeClass('animating');
            }, 500);
        
            // Track active event
            //var trackTxt = _this.find('.front').text().trim().replace(/(\r\n|\n|\r)/gm,'').substring(0, 64);
            //_this.trigger( 'animate', ['Card Active', trackTxt] );
        }
    
    };
    
    
    /* 
     * Scroll Appear 
     * Requires jQuery.Appear https://github.com/bas2k/jquery.appear/
    */
    
    var scrollAppear = function() {
        if ($().appear) {
          if (twoseventy.mobile) {//TODO check if this is stil valid with used version of jQ.
            // disable animation on mobile
            $(".withAnimation").removeClass("withAnimation");
          } else {
            $('.withAnimation .appear').appear();
        
            $('.withAnimation .appear').on('appear', function(e, $els) {
              $els.each(function () {
            
                $(this).addClass('active animated');
            
                var $fx = $(this).data('fx');
                if(typeof $fx !== 'undefined') {
                  $(this).addClass($(this).data('fx'));
                }
            
              });
            });
        
            $('.withAnimation .appear').on('disappear', function(e, $els) {
              $els.each(function () {
            
                $(this).removeClass('active');
            
                var $fx = $(this).data('fx');
                if(typeof $fx !== 'undefined') {
                  $(this).removeClass($(this).data('fx'));
                }
            
              });
            });
    
          }
        }
    };
    
    
    /*  
     * SCROLL TO ANCHOR
     */
    
    twoseventy.scrollToAnchor = function() {
      $('a.scroll-to[href*=#]:not([href=#])').click(function (e) {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
          
          var myOffset = $(this).data('offset') || 20,
            mySpeed = $(this).data('speed') || 1000,
            myEase = $(this).data('ease') || 'swing'
            myDefault = $(this).data('default') || 'true';
          
          if(target.length) {
            
            var myTop =  target.offset().top - myOffset;
            twoseventy.scrollTo(myTop, mySpeed, myEase);
            
            /*$('html,body').animate({
              scrollTop: target.offset().top - myOffset
            }, mySpeed, myEase);*/
            
            if(myDefault == 'true') {
              e.preventDefault();
            }
          }
        }
      });
      
    };
    
    twoseventy.scrollTo = function(myTop, mySpeed, myEase) {
      $('html,body').animate({
        scrollTop: myTop
      }, mySpeed, myEase);
      
      // stop scrolling on user input
      $("html, body").bind("scroll mousedown DOMMouseScroll mousewheel keyup scrollstart touchstart touchmove", function() {
          //$('html, body').stop();
          
          if( !$('html, body').hasClass('scroll-force') ) {
            $(this).stop();
          }
      });
    }
    
    
    /*
     * Background image scrolling 
     */
    
    var backgroundImageScroll = function() {
      $('.bg-scroll').each(function() {
        var $background = $(this),
        align = $background.data('align'),
        
        reposition = function() {
          
          if (twoseventy.mobile || twoseventy.widescreen) {
            $background.css('background-position', align+' 50%');
          } else {
            pageStats();
            offset = $background.offset().top;
            if (ana.scrollTop >= offset - ana.winHeight) {
              var delta;
              if (offset < ana.winHeight) {
                delta = (ana.scrollTop/2);
              } else {
                delta = ((ana.scrollTop-offset)/2);
              }
              
              var deltaOffset = 1;
              $background.css('background-position', align+' '+delta+'px');
            }
          }
        };
        
        
        $(window).on("throttledresize", function() {
          reposition();
        });
        
        $(window).on('scroll', function() {
          reposition();
        });
        
        $(window).resize(function(e) {
          reposition();
        });
        
        reposition();
        
      });
    };
    
    
    // INIT ANIMATIONS
    
    $(function() {
        init();
    });
    
})();
