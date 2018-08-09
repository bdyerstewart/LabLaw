
(function ($) {
  Drupal.behaviors.lablaw = {
    attach: function (context, settings) {
      if($('.page-node-309').length > 0) {
        $('#edit-submitted-social-security-number-').mask("999-99-9999");
        $('#spouses_social_security_number_').mask("999-99-9999");
        $("#edit-submitted-phone-number-").mask("(999) 999-9999");
        $("#spouses_phone_number_").mask("(999) 999-9999");
      }
      $(".page-node-309 #edit-delimiter").val(",");
      if ($(window).width() < 800) {
        $('.responsive-menus-simple li a').each(function () {
          if ($(this).attr("href") == "#") {
            $(this).css("color", "#ffffff");
          }
          else {
            $(this).css("color", "#bbcef7");
          }
        });
      }
    }
  };
})(jQuery);
