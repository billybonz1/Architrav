    var modal_id;
// fancybox
	$(".modal").fancybox({
        afterLoad: function(current, previous) {
			setTimeout(function(){
				modal_id = current.element[0].hash;
				if(!$(modal_id).find('.lSSlideOuter').length){
				   
					$(modal_id).find('.modal-slidermain').lightSlider({
						gallery:true,
						item:1,
						thumbItem:7,
						slideMargin: 0,
						enableDrag: false,
						currentPagerPosition:'left',
						speed:500,
						auto:false,
						loop:false
					});
				}
			},500);
            
            
        }
    });

window.jQuery || document.write('<script src="../js/minified/jquery-1.11.0.min.js"><\/script>')
	
	// ПРОКТУРКА
	
	
	(function($){
			$(window).load(function(){
				
				$("body").mCustomScrollbar({
					theme:"minimal"
				});
				
			});
		})(jQuery);
	
		// ПРОКТУРКА
	
	
	
	
	

$(window).on('load', function () {
    var $preloader = $('#page-preloader'),
        $spinner   = $preloader.find('.spinner');
    $spinner.fadeOut();
    $preloader.delay(500).fadeOut('slow');
});


function set(obj) {var id=obj.title; $('.pacet').val(id);}
function setbtn(obj) {var id=obj.title; $('.pacet').val("Кнопка: " + id);}


 /* Countdown start */


			jQuery(document).ready(function() {
				$('#countdown_dashboard').countDown({
					targetDate: {
						'day': 		1,
						'month': 	9,
						'year': 	2016,
						'hour': 	23,
						'min': 		0,
						'sec': 		0
					}
				});
				
			
				$('#subscribe_form').bind('submit', function() { return false; });
			});



/* Countdown END */




// Cache selectors
var lastId,
    topMenu = $("#top-menu"),
    topMenuHeight = topMenu.outerHeight()+15,
    // All list items
    menuItems = topMenu.find("a"),
    // Anchors corresponding to menu items
    scrollItems = menuItems.map(function(){
      var item = $($(this).attr("href"));
      if (item.length) { return item; }
    });

// Bind click handler to menu items
// so we can get a fancy scroll animation
menuItems.click(function(e){
  var href = $(this).attr("href"),
      offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
  $('html, body').stop().animate({ 
      scrollTop: offsetTop
  }, 300);
  e.preventDefault();
});

// Bind to scroll
$(window).scroll(function(){
   // Get container scroll position
   var fromTop = $(this).scrollTop()+topMenuHeight;
   
   // Get id of current scroll item
   var cur = scrollItems.map(function(){
     if ($(this).offset().top < fromTop)
       return this;
   });
   // Get the id of the current element
   cur = cur[cur.length-1];
   var id = cur && cur.length ? cur[0].id : "";
   
   if (lastId !== id) {
       lastId = id;
       // Set/remove active class
       menuItems
         .parent().removeClass("active")
         .end().filter("[href='#"+id+"']").parent().addClass("active");
   }                   
});
        
 



//Форма отправки 2.0 //
$(function() {
    $("[name=send]").click(function () {
        $(":input.error").removeClass('error');
        $(".allert").remove();
        
        var error;
        var btn = $(this);
        var ref = btn.closest('form').find('[required]');
        var msg = btn.closest('form').find('input');
        var send_btn = btn.closest('form').find('[name=send]');
        var send_options = btn.closest('form').find('[name=campaign_token]');

        $(ref).each(function() {
            if ($(this).val() == '') {
                var errorfield = $(this);
                $(this).addClass('error').parent('.field').append('<div class="allert"><span>Заполните это поле</span><i class="fa fa-exclamation-circle" aria-hidden="true"></i></div>');
                error = 1;
                $(":input.error:first").focus();
                return;
            } else {
                var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
                if ($(this).attr("type") == 'email') {
                    if(!pattern.test($(this).val())) {
                        $("[name=email]").val('');
                        $(this).addClass('error').parent('.field').append('<div class="allert"><span>Укажите коректный e-mail</span><i class="fa fa-exclamation-circle" aria-hidden="true"></i></div>');
                        error = 1;
                        $(":input.error:first").focus();
                    }
                }
                var patterntel = /^()[0-9]{9,18}/i;
                if ( $(this).attr("type") == 'tel') {
                    if(!patterntel.test($(this).val())) {
                        $("[name=phone]").val('');
                        $(this).addClass('error').parent('.field').append('<div class="allert"><span>Укажите коректный номер телефона</span><i class="fa fa-exclamation-circle" aria-hidden="true"></i></div>');
                        error = 1;
                        $(":input.error:first").focus();
                    }
                }
            }
        });
        if(!(error==1)) {
            $(send_btn).each(function() {
                $(this).attr('disabled', true);
            });
            $(send_options).each(function() {
                if ($(this).val() == '') {
                    $.ajax({
                        type: 'POST',
                        url: 'mail.php',
                        data: msg,
                        success: function() {
                            $('form').trigger("reset");
                            setTimeout(function(){  $("[name=send]").removeAttr("disabled"); }, 1000);
                            // Настройки модального окна после удачной отправки
                            $('div.md-show').removeClass('md-show');
                            $("#call_ok")[0].click();
                        },
                        error: function(xhr, str) {
                            alert('Возникла ошибка: ' + xhr.responseCode);
                        }
                    });
                } else {
                    $.ajax({
                        type: 'POST',
                        url: 'mail.php',
                        data: msg,
                        success:
                            $.ajax({
                                type: 'POST',
                                url: 'https://app.getresponse.com/add_subscriber.html',
                                data: msg,
                                statusCode: {0:function() {
                                    $('form').trigger("reset");
                                    setTimeout(function(){  $("[name=send]").removeAttr("disabled"); }, 1000);
                                    // Настройки модального окна после удачной отправки
                                    $('div.md-show').removeClass('md-show');
                                    $("#call_ok")[0].click();
                                }}
                            }),
                        error:  function(xhr, str) {
                            alert('Возникла ошибка: ' + xhr.responseCode);
                        }
                    });
                }
            });
        }
        return false;
    })
});






$(document).ready(function() { 

	(function ($) { 
		$('.tab ul.tabs').addClass('active').find('> li:eq(0)').addClass('current');
		
		$('.tab ul.tabs li a').click(function (g) { 
			var tab = $(this).closest('.tab'), 
				index = $(this).closest('li').index();
			
			tab.find('ul.tabs > li').removeClass('current');
			$(this).closest('li').addClass('current');
			
			tab.find('.tab_content').find('div.tabs_item').not('div.tabs_item:eq(' + index + ')').slideUp();
			tab.find('.tab_content').find('div.tabs_item:eq(' + index + ')').slideDown();
			
			g.preventDefault();
		} );
	})(jQuery);

});


// SARUSEL



/*****
 * Carousel control
 */
var Carousel = function (elId, mode) {
  var wrapper = document.getElementById(elId);
  var innerEl = wrapper.getElementsByClassName('carousel-inner')[0];
  var leftButton = wrapper.getElementsByClassName('carousel-left')[0];
  var rightButton = wrapper.getElementsByClassName('carousel-right')[0];
  var items = wrapper.getElementsByClassName('item');

  this.carouselSize = items.length;
  this.itemWidth = null;
  this.itemOuterWidth = null;
  this.currentStep = 0;
  this.itemsAtOnce = 3;
  this.minItemWidth = 200;
  this.position = innerEl.style;
  this.mode = mode;

  this.init = function (mode) {
    this.itemsAtOnce = mode;
    this.calcWidth(wrapper, innerEl, items);
    cb_addEventListener(leftButton, 'click', this.goLeft.bind(this));
    cb_addEventListener(rightButton, 'click', this.goRight.bind(this));
    cb_addEventListener(window, 'resize', this.calcWidth.bind(this, wrapper, innerEl, items));
  };
  return this.init(mode);
};

Carousel.prototype = {
  goLeft: function(e) {
    e.preventDefault();
    if (this.currentStep) {
      --this.currentStep;
    } else {
      this.currentStep = this.carouselSize - this.itemsAtOnce;
    }
    this.makeStep(this.currentStep);
    return false;
  },
  goRight: function(e) {
    e.preventDefault();
    if (this.currentStep < (this.carouselSize - this.itemsAtOnce)) {
      ++this.currentStep;
    } else {
      this.currentStep = 0;
    }
    this.makeStep(this.currentStep);
    return false;
  },
  makeStep: function(step) {
    this.position.left = -(this.itemOuterWidth * step) + 'px';
  },
  calcWidth: function(wrapper, innerEl, items) {
    this.beResponsive();

    var itemStyle = window.getComputedStyle(items[0]);  
    var innerElStyle = innerEl.style;
    var carouselLength = this.carouselSize;
    var wrapWidth = wrapper.offsetWidth - parseInt(itemStyle.marginRight, 10) * (this.itemsAtOnce + 1);

    innerElStyle.display = 'none';
    this.itemWidth = wrapWidth / this.itemsAtOnce;
    this.itemOuterWidth = this.itemWidth + parseInt(itemStyle.marginRight, 10);
    for (i = 0; i < carouselLength; i++) {
        items[i].style.width = this.itemWidth + 'px';
    }
    innerElStyle.width = this.itemOuterWidth * this.carouselSize + 'px';
    innerElStyle.display = 'block';
  },

  beResponsive: function() {
    var winWidth = window.innerWidth;
    if (winWidth >= 650 && winWidth < 950 && this.itemsAtOnce >= 2) {
      this.itemsAtOnce = 2;
    }
    else if (winWidth < 650) {
      this.itemsAtOnce = 1;
    }
    else {
      this.itemsAtOnce = this.mode;
    }
  }
}
/**
* Cross-browser Event Listener
**/
function cb_addEventListener(obj, evt, fnc) {
  if (obj && obj.addEventListener) {
      obj.addEventListener(evt, fnc, false);
      return true;
  } else if (obj && obj.attachEvent) {
      return obj.attachEvent('on' + evt, fnc);
  }
  return false;
}

//Initializing carousel
if (document.getElementById('products')) {
  var productsCarousel = new Carousel('products', 1);
}
//if (document.getElementById('products2')) {
//  var productsCarousel = new Carousel('products2', 2);
//}
//if (document.getElementById('products3')) {
//  var productsCarousel = new Carousel('products3', 1);
//}






/// YTUBE


    var videoId,videoObj,videoSlider;
    function youtube(obj){
        $(obj).each(function() {
            // Зная идентификатор видео на YouTube, легко можно найти его миниатюру
            $(this).css('background-image', 'url(http://i.ytimg.com/vi/' + this.id + '/sddefault.jpg)');

            // Добавляем иконку Play поверх миниатюры, чтобы было похоже на видеоплеер
            $(this).append($('<div/>', {'class': 'play'}));

            $(document).delegate('#'+this.id, 'click', function() {
                // создаем iframe со включенной опцией autoplay
                videoSlider = $(this).hasClass('my-video') ? 0 : 1;
                videoId = videoSlider ? 'video' + this.id : undefined;
                var iframe_url = "https://www.youtube.com/embed/" + this.id + "?autoplay=1&playerapiid=ytplayer&enablejsapi=1";
                if ($(this).data('params')) iframe_url+='&'+$(this).data('params');

                // Высота и ширина iframe должны быть такими же, как и у родительского блока
                var iframe = $('<iframe/>', {
                    'frameborder': '0',
                    'src': iframe_url,
                    'width': $(this).width(),
                    'height': $(this).height(),
                    'id': videoId,
                    'name': 'video' + this.id,
                });
                videoObj = $(this);
                // Заменяем миниатюру HTML5 плеером с YouTube
                $(this).replaceWith(iframe);
            });
        });
    }



// TABS




$(function () {
		
		var filterList = {
		
			init: function () {
			
				// MixItUp plugin
				// http://mixitup.io
				$('#portfoliolist').mixItUp({
  				selectors: {
    			  target: '.portfolio',
    			  filter: '.filter'	
    		  },
    		  load: {
      		  filter: '.app, .card, .icon, .logo, .web'  
      		}     
				});								
			
			}

		};
		
		// Run the show!
		filterList.init();
		
		
	});	






// ФАНСИ БОКС










/// PRELODER



preloaderTL = new TimelineMax({
  
});
// Variables
var boxes = $('.sq-box'),
  xMin = 10,
  xMax = 200,
  yMin = 150,
  yMax = 200,
  randomX, labelTime, $currentFill,
  timeline = {};

boxes.each(function(index, element) {
  if ((index % 2) == 0) {
    randomX = randomInt(-xMax, -xMin);
  } else {
    randomX = randomInt(xMin, xMax);
  }

  labelTime = index * 0.75;
  $currentFill = $(this).find('.sq-fill');

  // create a new timeline for this which repeats itself
  timeline["sven-" + index] = new TimelineMax({
    repeat: -1,
    repeatDelay: 0.75,
    yoyo: false
  });

  timeline["sven-" + index].from($currentFill, 0.75, {
    backgroundColor: "transparent"
  });
  timeline["sven-" + index].from($(this), 3, {
    rotation: 720,
    opacity: 0,
    x: randomX + "px",
    y: randomInt(-yMax, -yMin) + "px",
    ease: Linear.easeNone
  });
  timeline["sven-" + index].to($currentFill, 0.25, {
    y: "104%",
    ease: Linear.easeNone
  });

  // Add to master Timeline
  preloaderTL.add(timeline["sven-" + index], labelTime);
});

// can be used for animating x, y, rotation and other simple operations
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// can be used for animating scale, opacity and other simple math operations
function randomFloat(min, max) {
  return (Math.random() * (max - min) + min).toFixed(1);
}

TweenMax.delayedCall(5, showCredits, []);

function showCredits() {
  $('.credits').show();
}








$(document).ready(function() {

  $("#owl-demo").owlCarousel({

      navigation : true, // Show next and prev buttons
      slideSpeed : 300,
      paginationSpeed : 400,
      singleItem:false,
        dots: false, // точечки


      singleItem:true,
       items : 1,
       itemsDesktop : false,
       itemsDesktopSmall : false,
       itemsTablet: false,
       itemsMobile : false

  });


    var testimonials = $('#testimonials').lightSlider({
        item:1,
        slideMargin:0,
        loop:true,
        pager: false,
        enableDrag: false,
        addClass: 'video-slider',
        onSliderLoad: function(el){
            youtube('#testimonials .youtube');
        },
        onAfterSlide: function(el){
            console.log(videoId);
            if(videoId != undefined){
                $('#' + videoId).replaceWith(videoObj);
            }
        }
    });

});