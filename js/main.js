/* jshint browser: true, devel: true, indent: 2, curly: true, eqeqeq: true, futurehostile: true, latedef: true, undef: true, unused: true */
/* global $, jQuery, document, Modernizr */

var animationSpeed = 300;

jQuery(document).ready(function () {
  'use strict';
  
  Ajaxy.init();
  siteInit();
});

siteInit = function() {
  if( $('body').hasClass('single') || $('body').hasClass('page') ) {
    $("body").animate({
      scrollTop: $('#main-content').offset().top,
    }, animationSpeed);
    initSingle();
  }
};

unloadSingle = function() {
  $('#title, #title-fixed').unbind('.initBind');
  $(window).unbind('.initBind');
};

initSingle = function() {
  $('#title, #title-fixed').bind('click.initBind', function(event) {
    event.preventDefault();

    // Bind Fixed title -> goto top
    $("html, body").animate({scrollTop: 0,}, animationSpeed);
  });

  // Bind Fixed title show on scroll
  $(window).bind('scroll.initBind', $.throttle( switchTitle, 16.6 ) );
};

switchTitle = function() {
  console.log( Date() );
  if ( $(window).scrollTop() >= $('#main-content').offset().top ) {
    $('article').addClass('fixed-title');
  } else {
    $('article').removeClass('fixed-title');
  }
};

// AJAX
Ajaxy = {
  $contentContainer: null,
  init: function() {
    var _this = this;

    _this.$contentContainer = $('#main-content');

    var ajaxyLinks = 'a.ajax-link';

    // Find all ajaxy links and bind ajax event
    $(ajaxyLinks).click( function(event) {
      event.preventDefault();

      var url = event.currentTarget.href;

      $('html, body').animate({scrollTop: 0,}, animationSpeed);
      _this.ajaxLoad(url);

    });

    // For back button
    window.onpopstate = function() {
      _this.ajaxLoad(document.location.origin + document.location.pathname);
    };
  },

  ajaxLoad: function(url) {
    var _this = this;

    $.ajax(url, {
      beforeSend: function() {
        _this.ajaxBefore();
      },

      dataType: 'html',
      error: function(jqXHR, textStatus) {
        _this.ajaxErrorHandler(jqXHR, textStatus);
      },

      success: function(data) {
        _this.$contentContainer.html('');
        _this.ajaxSuccess(data, url);
        $("body").animate({
          scrollTop: _this.$contentContainer.offset().top,
        }, animationSpeed);
        setTimeout( function() {
        }, animationSpeed);
      },
    });
  },

  ajaxBefore: function() {
  },

  ajaxErrorHandler: function(jqXHR, textStatus) {
    alert(textStatus);
  },

  ajaxSuccess: function(data,url) {
    var _this = this;

    // Convert data into proper html to be able to fully parse thru jQuery
    var respHtml = document.createElement('html');

    respHtml.innerHTML = data;

    // Unbind events
    unloadSingle();

    // Get changes: body classes, page title, main content, header
    var $bodyClasses = $('body', respHtml).attr('class');
    var $title = $('title', respHtml).text();
    var $content = $('#main-content', respHtml);

    // Push new history state and update title
    history.pushState(null, $title, url);
    document.title = $title;

    // Update with new content and classes
    $('body').removeAttr('class').addClass($bodyClasses);
    _this.$contentContainer.html($content.html());

    // Rebind initial JS
    siteInit();
  },
};
