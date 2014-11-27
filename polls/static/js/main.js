
(function($) {

    // Init Skrollr
    var s = skrollr.init({
        render: function(data) {
            //Debugging - Log the current scroll position.
            //console.log(data.curTop);
        }
    });

    imagePreload();

    adjustWindow();

    $(window).resize(function() {
        adjustWindow();
    });

    $(window).scroll(function() {
        $('.device').removeClass('device-on');
        var devicePos = $('.sleep-quality').position().top;
        winP = $(this).scrollTop();
        if( winP >= devicePos ) {
            $('.device').addClass('device-on');
        }
    });

    function imagePreload() {
        var fixedImageWidth = $( window ).width();
        var fixedImageHeight = $( window ).height();

         $('.image-align-night').attr('width',fixedImageWidth);
         $('.image-align-night').attr('height',fixedImageHeight);
         $('.image-align-day').attr('width',fixedImageWidth);
         $('.image-align-day').attr('height',fixedImageHeight);

        if(fixedImageWidth < 500) {

            $('.night-day').remove();
            $('.logo-slogan').remove();
            $('.blockquote').remove();
            $('.introduction').remove();

            $('.logo-slogan-img').attr('width','230');
            $('.logo-slogan-img').attr('height','70');

            $('#sohm-welcome').attr('class','sohm-welcome');
            $('#sohm-welcome').append('<p class="mobile-sohm-word">Sleep and rise to your best self.</p>');
            $('#sohm-welcome').append("<a href='#introducing-layer' class='mobile-arrow-down' data-0='display:block;opacity:1'data-1300='display:none;opacity:0'>" +
               " <img src='images/arrow-down.png' /> </a>");
        }

        if(fixedImageWidth > 500) {

            if(fixedImageWidth < 1050) {
                $('.night-day').remove();
                $('.logo-slogan').remove();
                $('.blockquote').remove();
                $('.introduction').remove();

                $('.logo-slogan-img').attr('width','230');
                $('.logo-slogan-img').attr('height','70');

                $('#sohm-welcome').attr('class','sohm-welcome');
                $('#sohm-welcome').append('<p class="mobile-sohm-word">Sleep and rise to your best self.</p>');
                $('#sohm-welcome').append("<a href='#introducing-layer' class='mobile-arrow-down' data-0='display:block;opacity:1'data-1300='display:none;opacity:0'>" +
                    " <img src='images/arrow-down.png' /> </a>");
            }


        }

        $('.img-preload img').imgpreload
                ({
                    all: function()
                    {
                        $('.loading').remove();
                        $('html,body').removeClass('hide-scroll');
                        //homeAnim();
                        scrollPage();
                    }
                });
    }

    function homeAnim() {
        $('blockquote').fadeIn(2000, function() {
            $(this).animate({
                top: "60%",
                opacity: 0
            }, 3000, function() {
                $('.night-day img.day').fadeIn(2500, function() {
                    $('.logo-slogan').animate({
                        bottom: "40%",
                        opacity: 1
                    }, 2000, function() {
                        $('.introduction').removeClass('add-transition');
                        $('html, body').removeClass('hide-scroll');
                        $('.arrow-down').fadeIn();
                    });
                });
            });
        });
    }

    function adjustWindow() {
        var wh = $(window).height();
        $("section").each(function(index) {
            $(this).height(wh);
        });
    }

    function scrollPage() {
        $('a[href*=#]:not([href=#])').click(function() {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top
                    }, 1000);
                    return false;
                }
            }
        });
    }

    $("body").on("click",".introducing-layer-arrow-down",function(){
        var introducingLayerSectionPosition = $('.introducing-layer-section').position().top;
        var introducingLayerSectionHeight = $('.introducing-layer-section').height();
        var introducingLayerSectionPositionEnd =   introducingLayerSectionPosition - introducingLayerSectionHeight;

        $('html, body').animate({scrollTop: introducingLayerSectionPositionEnd +'px'}, 1800, function() {

        });
    });

    //var defaultData = 1;
    var eventTrigger = null;
    $("body").on("click",".scroll-layer",function(){
        eventTrigger = 1;
        var scrollSection = ".introducing-layer";
        scrollToAnchor(scrollSection);
    });

    $("body").on("click",".arrow-black",function(){
        eventTrigger = 1;
        var scrollSection = ".introducing-layer";
        scrollToAnchor(scrollSection);
    });

    $("body").on("click",".scroll-sensors",function(){
        eventTrigger = 1;
        var scrollSection = ".inside-layer";
        scrollToAnchor(scrollSection);
    });

    $("body").on("click",".scroll-sign-up",function(){
        eventTrigger = 1;
        var scrollSection = ".sleep-tight";
        scrollToAnchor(scrollSection);
    });

    $( ".home-logo-sm" ).click(function() {
        eventTrigger = 1;
        var scrollSection = ".introduction";
        scrollToAnchor(scrollSection);
    });

    var lastScrollTop = 0;
    $(window).scroll(function(event){
        event.preventDefault();
        var st = $(this).scrollTop();


        var introducingLayerSectionPositionArrow = $('.introducing-layer-section').position().top;
        var introducingLayerSectionHeightArrow = $('.introducing-layer-section').height();
        var introducingLayerSectionPositionEndArrow =   introducingLayerSectionPositionArrow - introducingLayerSectionHeightArrow;
        var scrollHeightArrow = $(window).scrollTop();

        if(scrollHeightArrow == introducingLayerSectionPositionEndArrow) {
            var imgTag = $("#introducing-layer-arrow").find('img');
            imgTag.attr('src','images/arrow-black.png');
            imgTag.addClass('arrow-black');
            $("#introducing-layer-arrow").addClass('arrow-black-opacity');
            $("#introducing-layer-arrow").removeClass('introducing-layer-arrow-down');

        } else {
            var imgTag = $("#introducing-layer-arrow").find('img');
            imgTag.attr('src','images/arrow-down.png');
            imgTag.removeClass('arrow-black');
            $("#introducing-layer-arrow").removeClass('arrow-black-opacity');
            $("#introducing-layer-arrow").addClass('introducing-layer-arrow-down');

        }

        if (st > lastScrollTop && eventTrigger == null){
            // down scroll code
            var scrollHeight = $(window).scrollTop();

            //introduction-section
            var introductionSectionPosition = $('.introduction-section').position().top;
            var introductionSectionHeight = $('.introduction-section').height();
            var introductionSectionPositionEnd =   introductionSectionPosition + introductionSectionHeight;

            var introducingLayerSectionPosition = $('.introducing-layer-section').position().top;
            var introducingLayerSectionHeight = $('.introducing-layer-section').height();
            var introducingLayerSectionPositionEnd =   introducingLayerSectionPosition + introducingLayerSectionHeight;


            var sleepQualitySectionPosition = $('.sleep-quality-section').position().top;
            var sleepQualitySectionHeight = $('.sleep-quality-section').height();
            var sleepQualitySectionPositionEnd =   sleepQualitySectionPosition + sleepQualitySectionHeight;


            var innovativeAlarmSectionPosition = $('.innovative-alarm-section').position().top;
            var innovativeAlarmSectionHeight = $('.innovative-alarm-section').height();
            var innovativeAlarmSectionPositionEnd =   innovativeAlarmSectionPosition + innovativeAlarmSectionHeight;

            var layerAdvantagesSectionPosition = $('.layer-advantages-section').position().top;
            var layerAdvantagesSectionHeight = $('.layer-advantages-section').height();
            var layerAdvantagesSectionPositionEnd =   layerAdvantagesSectionPosition + layerAdvantagesSectionHeight;

            var insideLayerSectionPosition = $('.inside-layer-section').position().top;
            var insideLayerSectionHeight = $('.inside-layer-section').height();
            var insideLayerSectionPositionEnd =   insideLayerSectionPosition + insideLayerSectionHeight;

            var smartHomeSectionPosition = $('.smart-home-section').position().top;
            var smartHomeSectionHeight = $('.smart-home-section').height();
            var smartHomeSectionPositionEnd =   smartHomeSectionPosition + smartHomeSectionHeight;




            if(scrollHeight >= introducingLayerSectionPosition) {
                $('#header').show();
            } else {
                $('#header').hide();
            }

            if(scrollHeight >= smartHomeSectionPosition && scrollHeight <= (smartHomeSectionPositionEnd - 50)) {
                var navTag = $("#header").find('a');
                var imageTag = $("#header").find('img');
                navTag.css('color','#333331');
                imageTag.attr('src','images/logo-small-dark.png')
            } else {
                var navTag = $("#header").find('a');
                var imageTag = $("#header").find('img');
                imageTag.attr('src','images/logo-small.png');
                navTag.css('color','white');
            }


        } else if(eventTrigger == null)  {
            // up scroll code
            var scrollHeight = $(window).scrollTop();

            //introduction-section
            var introductionSectionPosition = $('.introduction-section').position().top;
            var introductionSectionHeight = $('.introduction-section').height();
            var introductionSectionPositionEnd =   introductionSectionPosition + introductionSectionHeight;

            var introducingLayerSectionPosition = $('.introducing-layer-section').position().top;
            var introducingLayerSectionHeight = $('.introducing-layer-section').height();
            var introducingLayerSectionPositionEnd =   introducingLayerSectionPosition + introducingLayerSectionHeight;


            var sleepQualitySectionPosition = $('.sleep-quality-section').position().top;
            var sleepQualitySectionHeight = $('.sleep-quality-section').height();
            var sleepQualitySectionPositionEnd =   sleepQualitySectionPosition + sleepQualitySectionHeight;


            var innovativeAlarmSectionPosition = $('.innovative-alarm-section').position().top;
            var innovativeAlarmSectionHeight = $('.innovative-alarm-section').height();
            var innovativeAlarmSectionPositionEnd =   innovativeAlarmSectionPosition + innovativeAlarmSectionHeight;

            var layerAdvantagesSectionPosition = $('.layer-advantages-section').position().top;
            var layerAdvantagesSectionHeight = $('.layer-advantages-section').height();
            var layerAdvantagesSectionPositionEnd =   layerAdvantagesSectionPosition + layerAdvantagesSectionHeight;

            var insideLayerSectionPosition = $('.inside-layer-section').position().top;
            var insideLayerSectionHeight = $('.inside-layer-section').height();
            var insideLayerSectionPositionEnd =   insideLayerSectionPosition + insideLayerSectionHeight;

            var smartHomeSectionPosition = $('.smart-home-section').position().top;
            var smartHomeSectionHeight = $('.smart-home-section').height();
            var smartHomeSectionPositionEnd =   smartHomeSectionPosition + smartHomeSectionHeight;

            var sleepTightSectionPosition = $('.sleep-tight-section').position().top;
            var sleepTightSectionHeight = $('.sleep-tight-section').height();
            var sleepTightSectionPositionEnd =   sleepTightSectionPosition + sleepTightSectionHeight;

            if(scrollHeight >= introducingLayerSectionPosition) {
                $('#header').show();
            } else {
                $('#header').hide();
            }

            if(scrollHeight <= (smartHomeSectionPosition + 30) && scrollHeight >= (smartHomeSectionPosition - 30)) {
                var navTag = $("#header").find('a');
                var imageTag = $("#header").find('img');
                navTag.css('color','#333331');
                imageTag.attr('src','images/logo-small-dark.png')
            } else {
                var navTag = $("#header").find('a');
                var imageTag = $("#header").find('img');
                imageTag.attr('src','images/logo-small.png');
                navTag.css('color','white');
            }


        }
        lastScrollTop = st;
    });


    // Too Slow
    function scrollToAnchor(scrollSection){
        var aTag = $(scrollSection);

        $('html,body').stop().animate({scrollTop: aTag.offset().top},'slow',"linear", function() {
            // Animation complete.
            eventTrigger = null;
        });

    }

    function scrollTopScreenPosition(scrollSection){
        var aTag = $(scrollSection);

        $('html,body').stop().animate({scrollTop: aTag.offset().top},'slow',"linear", function() {
            // Animation complete.
            eventTrigger = null;
        });

    }


})(jQuery);

