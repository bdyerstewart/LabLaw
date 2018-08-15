var startrow = 1;
var itemshow = 4;
(function ($) {
    Drupal.behaviors.theme1033 = {
        attach: function (context, settings) {
            if ($('body').hasClass("front")) {
                if ($('li.front-menu-logo').length == 0) {
                    var txt = "<li class='front-menu-logo'>";
                    txt += "<img src='/sites/default/files/horsehead.png' />";
                    $(txt).insertAfter('#menu-463-1');
                }
                $('#footer_top_wrapper').prepend('<div class="footer-news-title"><h2>Latest News</h2></div>');
                if($(window).width() < 768){
                    $('#header .block-block-9 .block-content').append($('.header-options').detach());
                }
            }
            if( $('.subscribe_cont').length){
                if ( ! $('.subscribe_cont .fieldset-wrapper .form-actions').length){
                    $('.subscribe_cont .fieldset-wrapper').append($('#webform-client-form-346 .form-actions').detach());
                }
            }

            var numrows = $('.view-categories .category-row').length;
            if (numrows > 0) {
                if ($('.view-categories .view-content').length) {
                    $('.view-categories .view-content').prepend('<div class="vc-btn vc-left">&#xf0d9;</div>');
                    $('.view-categories .view-content').append('<div class="vc-btn vc-right">&#xf0da;</div>');
                }
                var wdth = $(window).width();
                if(wdth < 480){
                    itemshow = 1;
                }
                else if (wdth < 600) {
                    itemshow = 2;
                }
                else if (wdth < 768) {
                    itemshow = 3;

                }
                showcats(itemshow);
                $('.vc-left').css('order', '0');
                $('.vc-right').css('order', (itemshow + 1).toString());
                $('.vc-right').click(function () {
                    startrow++;
                    if (startrow > numrows) {
                        startrow = 1;
                    }
                    showcats(itemshow);
                });
                $('.vc-left').click(function () {
                    startrow = startrow - 1;
                    if (startrow < 1) {
                        startrow = numrows - itemshow + 1;
                    }
                    //alert(startrow)
                    showcats(itemshow);
                });
            }

            function showcats(itemshow) {
                $('.view-categories .category-row').hide();
                for (var i = 0; i < itemshow; i++) {
                    var x = startrow + i;
                    if (x > numrows) {
                        startrow = 1;
                        x = 1;
                    }
                    row = '.view-categories .category-row.views-row-' + x;

                    $(row).show();
                    $(row).css('order', (i + 1).toString());
                }
            }

            // $('.view-categories').click(function(){
            //     location.href = $(this).find('.cat-pick').attr('href');
            // });
            $('.portfolio-row').click(function () {
                location.href = $(this).find('a').attr('href');
            });
            $('.view-blog-posts-display .pager-next a,.view-blog-posts-display .pager-previous a').html('');
            $('.category-image.svg img').addClass('svg');
            $('img.svg').each(function () {
                var $img = $(this);
                var imgID = $img.attr('id');
                var imgClass = $img.attr('class');
                var imgURL = $img.attr('src');

                $.get(imgURL, function (data) {
                    // Get the SVG tag, ignore the rest
                    var $svg = $(data).find('svg');

                    // Add replaced image's ID to the new SVG
                    if (typeof imgID !== 'undefined') {
                        $svg = $svg.attr('id', imgID);
                    }
                    // Add replaced image's classes to the new SVG
                    if (typeof imgClass !== 'undefined') {
                        $svg = $svg.attr('class', imgClass + ' replaced-svg');
                    }

                    // Remove any invalid XML tags as per http://validator.w3.org
                    $svg = $svg.removeAttr('xmlns:a');

                    // Replace image with new SVG
                    $img.replaceWith($svg);

                }, 'xml');

            });
        }
    };
})(jQuery);
