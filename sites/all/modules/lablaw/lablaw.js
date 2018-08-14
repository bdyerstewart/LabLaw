
(function ($) {
  Drupal.behaviors.lablaw = {
    attach: function (context, settings) {

      if ($('.page-node-309').length > 0) {
        $('#edit-submitted-social-security-number-').mask("999-99-9999");
        $('#spouses_social_security_number_').mask("999-99-9999");
        $("#edit-submitted-cphonefull").mask("(999) 999-9999");
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


      btn = '<a class="onlypages" href="#">Show Page Breaks Only</a>';
      $('body #webform-components-form').prepend(btn);

      $('.webform-pagebreak').click(function () {
        if ($(this).hasClass('filtered')) {
          $(this).removeClass('filtered');
          $('#webform-components tr').show();
        }
        else {
          $(this).addClass('filtered')
          attr = $(this).attr('data-cid');
          if (attr) {
            $('#webform-components tr').hide();
            $('.webform-pagebreak[data-cid="' + attr + '"]').show();
            $('.webform-pagebreak[data-cid="' + attr + '"]').nextUntil('.webform-pagebreak').show();
            $('tr.webform-add-form').show();
          }
        }
      });

      $('.onlypages').click(function () {
        if ($(this).hasClass('filtered')) {
          $(this).removeClass('filtered');
          $('#webform-components tr').show();
        }
        else {
          $(this).addClass('filtered')
          $('#webform-components tr').hide();
          $('.webform-pagebreak').show();
        }
      });

      var is_intake = false;
      if (typeof Drupal.settings.intake_ids != "undefined") {
        var ids = Drupal.settings.intake_ids;
        var lngth = ids.length;
        for (var k = 0; k < lngth; k++) {
          if ($('.page-node-' + ids[k]).length > 0) {
            is_intake = true;
            break;
          }
        }
      }

      if (is_intake) {
        intake_setup();
        $(".phone-number-mask").mask("(999) 999-9999");
        $('input.year').mask("9999");
        $('input.year').attr('placeholder', '1900');
        $('.ssn-4-mask').mask("9999");
        $('.ssn-mask').mask("999-99-9999");
        $('.zip-mask').mask("99999");
        $('input').keypress(function (event) {
          return event.keyCode == 13 ? false : true;
        });
        var pgtitle = $('.webform-progressbar-page.current .webform-progressbar-page-label').html();
        $('.webform-title-div').remove();
        pgtitle = "<div class='webform-page-title'>" + pgtitle + "</div>";
        var percent = $('.webform-progressbar-number').html();
        percent = "<div class='webform-percent'>(" + percent + ")</div>";
        var txt = "<div class='webform-title-div'>" + pgtitle + percent + "</div>";
        $('.webform-progressbar-number').parent().append(txt);
        $('.webform-progressbar-number').hide();
        // var char_options = {
        //   'maxCharacterSize': 600,
        //   'originalStyle': 'originalTextareaInfo',
        //   'warningStyle': 'warningTextareaInfo',
        //   'warningNumber': 40,
        //   'displayFormat': '#input used / #left characters remaining'
        // };
        // if ($('textarea[name="submitted[goal]"]').length) {
        //   var par1 = $('textarea[name="submitted[goal]"]').parent();
        //   if (par1.find('.charleft').length == 0) {
        //     $('textarea[name="submitted[goal]"]').textareaCount(char_options);
        //   }
        // }
        // if ($('textarea[name="submitted[add_legal_problem]"]').length) {
        //   var par2 = $('textarea[name="submitted[add_legal_problem]"]').parent();
        //   if (par2.find('.charleft').length == 0) {
        //     $('textarea[name="submitted[add_legal_problem]"]').textareaCount(char_options);
        //   }
        // }
      }

      function intake_setup(){
        $('.filterval').blur(function(){
          var thisval = $(this).val();
          var thisid = $(this).attr('id');
          var url = Drupal.settings.basePath + "lablaw_filterval/" + thisval + "/" + thisid;
          $.post(url);
        });
        $('.city-zip').focus(function(){
          $(this).removeClass('web-alert');
          $('div.web-alert').remove();
        });
        $('.city-zip').blur(function(){
          $(this).removeClass('web-alert');
          $('div.web-alert').remove();
          var thisval = $(this).val();
          if(!lablaw_validcity(thisval)){
            //alert('no');
            $(this).val("");
            $(this).before('<div class="web-alert">Please select a city~zip combination from the list</div>');
            $(this).addClass('web-alert');
          }
        });
      }

      function lablaw_validcity(val) {
        var divide = val.indexOf('~');
        if (divide === -1){
          return false;
        }
        var state = $('#edit-submitted-state').val();
        var city = val.substring(0,divide-1).trim();
        var zip =  val.substring(divide+1).trim();
        var proc_path = window.location.protocol + "//" + window.location.host + Drupal.settings.basePath;
        proc_path += "lablaw_validcity/" + state + "/" + city + "/" + zip;
        var out = 'noway';
        var data = '';
        $.getJSON(proc_path, function (data) {
          if (data) {
            out = data;
            console.log(data);
            alert(data);
          }
        });
        return true;
      }

    }
  }
})(jQuery);
