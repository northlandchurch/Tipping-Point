(function($, window, document, undefined) {

    'use strict';

    $(function() {
        // Calculator
        // ---
        // calculate on input change
        $('input[name=earnings], select[name=timeframe], input[name=percent]').on('input', function() {
            var earnings  = $('input[name=earnings]').val().replace(/[^\d\.]/g, '');
                $('input[name=earnings]').val(earnings);
            var timeframe = $('select[name=timeframe]').val();
            var percent   = $('input[name=percent]').val();

            var result;

            if(timeframe == 'year') {
            result = earnings * percent;
            }
            else if(timeframe == 'month') {
            result = (earnings*12) * percent;
            }
            else if(timeframe == 'week') {
            result = (earnings*52) * percent;
            }

            $('#result-year').text(prettyCurrency(result));
            $('#result-month').text(prettyCurrency(result / 12));
            $("#result-week").text(prettyCurrency(result / 52));
        });

        // return a currency format
        function prettyCurrency(value) {
            return '$' + parseFloat(value, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,').toString();
        }

        // convert decimal to a percentage
        // and display on .percent-show
        function percentCalc(value) {
          value = (value * 100).toFixed(0);
          $('.percent-show').text(value);
        }

        var percentInput = $('input[name=percent]');

        // calc percent on input change
        percentInput.on('input', function() {
          percentCalc($(this).val());
        });

        // calc percent on load
        percentCalc(percentInput.val());
        $( ".percent-show" ).append( "%" );

        // Commitment Card
        // ---
        // calculate on click
        $('.section--commitment button').on('click', function() {
            var normal  = $('input[name=normal]').val().replace(/[^\d\.]/g, '');
                $('input[name=normal]').val(normal);
            var additional = $('input[name=additional]').val().replace(/[^\d\.]/g, '');
                $('input[name=additional]').val(additional);
            var resource   = $('input[name=resource]').val().replace(/[^\d\.]/g, '');
                $('input[name=resource]').val(resource);

            var resultCommitment = ((parseFloat(normal) + parseFloat(additional)) * 2) + parseFloat(resource);

            $('#total-commitment').val(prettyCurrency(resultCommitment));

        });

        $(".section--commitment #normal-commitment, .section--commitment #additional-commitment, .section--commitment #resource-commitment, .calc-section #earnings").on("blur", function() {
          if ($(this).val() == "") {
            $(this).val(this.defaultValue);
          }
        });

        $(".section--commitment #normal-commitment, .section--commitment #additional-commitment, .section--commitment #resource-commitment").before("<span>$</span>");

        // Modal
        // ---
        // open modal with correct video on click of .player-button
        $('.player-button, .video-button').on('click', function() {
            if($(this).attr('data-reveal-id') === 'videoModal' && $(this).attr('data-video-id') !== null) {
                var container = $(this).parent(),
                    modal     = $('#videoModal');

                var videoId    = $(this).attr('data-video-id'),
                    videoTitle = container.find('.video__heading').text();

                // set modal h2 title
                modal.find('#modalTitle').text(videoTitle);

                // set video src
                modal.find('.flex-video-new iframe').attr('src', 'https://player.vimeo.com/video/' + videoId + '?autoplay=1&api=1');
            }
        });



        // close the video modal
        $(document).on('close.fndtn.reveal', '[data-reveal]', function () {
            var modal  = $('#videoModal');
            var iframe = $('#videoModal .flex-video-new iframe')[0];
            var player = $f(iframe);

            // pause the video
            player.addEvent('ready', function() {
                player.api('pause');
            });

            // remove title and iframe src
            modal.find('#modalTitle').text('');
            modal.find('.flex-video-new iframe').attr('src', '');
        });


        // Smooth scroll
        // ---
        $('a[href*=#]:not([href=#])').click(function() {
            if(location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                if(target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top-70
                    }, 300);
                    return false;
                }
            }
        });

        //chart animations
        $( "#community, #world, #future, #freedom, #congregatio, .close-chart-info" ).click(function() {
            $('#pie-chart').toggleClass( "text-left" );
            $('#pie-chart').toggleClass( "text-center" );
            $('#pie-chart').toggleClass( "large-centered medium-centered", "slow" );
            $('.pie-chart__sections').toggleClass( "hide", "slow" );
            $('#community, #world, #future, #freedom, #congregatio').attr("class", "");
        });

        //community
        $("#pie-chart.text-center #community, #pie-chart-mobile #community").hover(function () {
                $('#chart-svg, #pie-chart-mobile #chart-svg').attr("class", "community-bg");
            },
            function () {
                $('#chart-svg, #pie-chart-mobile #chart-svg').attr("class", "two-year-bg");
            }
        );
        $( "#community" ).click(function() {
            $('.pie-chart__section--community').toggleClass( "hide", "slow" );
            $('#community').attr("class", "community-bg-hover");
            $('.info-bars').toggleClass( "hide", "slow" );
        });
        $( "#pie-chart.text-left #community" ).click(function() {
            $('#chart-svg').attr("class", "community-bg");
        });
        $( ".pie-chart__section--community .close-chart-info" ).click(function() {
            $('.pie-chart__section--community').toggleClass( "hide" );
            $('.info-bars').toggleClass( "hide" );
        });

        //world
        $("#pie-chart.text-center #world, #pie-chart-mobile #world").hover(function () {
                $('#chart-svg, #pie-chart-mobile #chart-svg').attr("class", "world-bg");
            },
            function () {
                $('#chart-svg, #pie-chart-mobile #chart-svg').attr("class", "two-year-bg");
            }
        );
        $( "#world" ).click(function() {
            $('.pie-chart__section--world').toggleClass( "hide", "slow" );
            $('#world').attr("class", "world-bg-hover");
            $('.info-bars').toggleClass( "hide", "slow" );
        });
        $( "#pie-chart.text-left #world" ).click(function() {
            $('#chart-svg').attr("class", "world-bg");
        });
        $( ".pie-chart__section--world .close-chart-info" ).click(function() {
            $('.pie-chart__section--world').toggleClass( "hide" );
            $('.info-bars').toggleClass( "hide" );
        });

        //future
        $("#pie-chart.text-center #future, #pie-chart-mobile #future").hover(function () {
                $('#chart-svg, #pie-chart-mobile #chart-svg').attr("class", "future-bg");
            },
            function () {
                $('#chart-svg, #pie-chart-mobile #chart-svg').attr("class", "two-year-bg");
            }
        );
        $( "#future" ).click(function() {
            $('.pie-chart__section--future').toggleClass( "hide", "slow" );
            $('#future').attr("class", "future-bg-hover");
            $('.info-bars').toggleClass( "hide", "slow" );
        });
        $( "#pie-chart.text-left #future" ).click(function() {
            $('#chart-svg').attr("class", "future-bg");
        });
        $( ".pie-chart__section--future .close-chart-info" ).click(function() {
            $('.pie-chart__section--future').toggleClass( "hide" );
            $('.info-bars').toggleClass( "hide" );
        });

        //freedom
        $("#pie-chart.text-center #freedom, #pie-chart-mobile #freedom").hover(function () {
                $('#chart-svg, #pie-chart-mobile #chart-svg').attr("class", "freedom-bg");
            },
            function () {
                $('#chart-svg, #pie-chart-mobile #chart-svg').attr("class", "two-year-bg");
            }
        );
        $( "#freedom" ).click(function() {
            $('.pie-chart__section--freedom').toggleClass( "hide", "slow" );
            $('#freedom').attr("class", "freedom-bg-hover");
            $('.info-bars').toggleClass( "hide", "slow" );
        });
        $( "#pie-chart.text-left #freedom" ).click(function() {
            $('#chart-svg').attr("class", "freedom-bg");
        });
        $( ".pie-chart__section--freedom .close-chart-info" ).click(function() {
            $('.pie-chart__section--freedom').toggleClass( "hide" );
            $('.info-bars').toggleClass( "hide" );
        });

        //congregation
        $("#pie-chart.text-center #congregatio, #pie-chart-mobile #congregatio").hover(function () {
                $('#chart-svg, #pie-chart-mobile #chart-svg').attr("class", "congregation-bg");
            },
            function () {
                $('#chart-svg, #pie-chart-mobile #chart-svg').attr("class", "two-year-bg");
            }
        );
        $( "#congregatio" ).click(function() {
            $('.pie-chart__section--congregation').toggleClass( "hide", "slow" );
            $('#congregatio').attr("class", "congregation-bg-hover");
            $('.info-bars').toggleClass( "hide", "slow" );
        });
        $( "#pie-chart.text-left #congregatio" ).click(function() {
            $('#chart-svg').attr("class", "congregation-bg");
        });
        $( ".pie-chart__section--congregation .close-chart-info" ).click(function() {
            $('.pie-chart__section--congregation').toggleClass( "hide" );
            $('.info-bars').toggleClass( "hide" );
        });

        //mobile
        $( "#pie-chart-mobile #community" ).click(function() {
            $('.pie-chart__section--community').toggleClass( "hide", "slow" );
        });
        $( "#pie-chart-mobile #world" ).click(function() {
            $('.pie-chart__section--world').toggleClass( "hide", "slow" );
        });
        $( "#pie-chart-mobile #future" ).click(function() {
            $('.pie-chart__section--future').toggleClass( "hide", "slow" );
        });
        $( "#pie-chart-mobile #freedom" ).click(function() {
            $('.pie-chart__section--freedom').toggleClass( "hide", "slow" );
        });
        $( "#pie-chart-mobile #congregatio" ).click(function() {
            $('.pie-chart__section--congregation').toggleClass( "hide", "slow" );
        });

        //chart scrolling
        $('#pie-chart-mobile #chart-svg').on('click', function(e){
            $('html, body').animate({scrollTop: '+=300px'}, 500);
        });
    });

})(jQuery, window, document);
