window.slate = window.slate || {};
window.theme = window.theme || {};

/*================ Slate ================*/
/**
 * A11y Helpers
 * -----------------------------------------------------------------------------
 * A collection of useful functions that help make your theme more accessible
 * to users with visual impairments.
 *
 *
 * @namespace a11y
 */

slate.a11y = {

  /**
   * For use when focus shifts to a container rather than a link
   * eg for In-page links, after scroll, focus shifts to content area so that
   * next `tab` is where user expects if focusing a link, just $link.focus();
   *
   * @param {JQuery} $element - The element to be acted upon
   */
  pageLinkFocus: function($element) {
    var focusClass = 'js-focus-hidden';

    $element.first()
      .attr('tabIndex', '-1')
      .focus()
      .addClass(focusClass)
      .one('blur', callback);

    function callback() {
      $element.first()
        .removeClass(focusClass)
        .removeAttr('tabindex');
    }
  },

  /**
   * If there's a hash in the url, focus the appropriate element
   */
  focusHash: function() {
    var hash = window.location.hash;

    // is there a hash in the url? is it an element on the page?
    if (hash && document.getElementById(hash.slice(1))) {
      this.pageLinkFocus($(hash));
    }
  },

  /**
   * When an in-page (url w/hash) link is clicked, focus the appropriate element
   */
  bindInPageLinks: function() {
    $('a[href*=#]').on('click', function(evt) {
      this.pageLinkFocus($(evt.currentTarget.hash));
    }.bind(this));
  },

  /**
   * Traps the focus in a particular container
   *
   * @param {object} options - Options to be used
   * @param {jQuery} options.$container - Container to trap focus within
   * @param {jQuery} options.$elementToFocus - Element to be focused when focus leaves container
   * @param {string} options.namespace - Namespace used for new focus event handler
   */
  trapFocus: function(options) {
    var eventName = options.eventNamespace
      ? 'focusin.' + options.eventNamespace
      : 'focusin';

    if (!options.$elementToFocus) {
      options.$elementToFocus = options.$container;
    }

    options.$container.attr('tabindex', '-1');
    options.$elementToFocus.focus();

    $(document).on(eventName, function(evt) {
      if (options.$container[0] !== evt.target && !options.$container.has(evt.target).length) {
        options.$container.focus();
      }
    });
  },

  /**
   * Removes the trap of focus in a particular container
   *
   * @param {object} options - Options to be used
   * @param {jQuery} options.$container - Container to trap focus within
   * @param {string} options.namespace - Namespace used for new focus event handler
   */
  removeTrapFocus: function(options) {
    var eventName = options.namespace
      ? 'focusin.' + options.namespace
      : 'focusin';

    if (options.$container && options.$container.length) {
      options.$container.removeAttr('tabindex');
    }

    $(document).off(eventName);
  }
};

/**
 * Cart Template Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the Cart template.
 *
 * @namespace cart
 */

slate.cart = {
  
  /**
   * Browser cookies are required to use the cart. This function checks if
   * cookies are enabled in the browser.
   */
  cookiesEnabled: function() {
    var cookieEnabled = navigator.cookieEnabled;

    if (!cookieEnabled){
      document.cookie = 'testcookie';
      cookieEnabled = (document.cookie.indexOf('testcookie') !== -1);
    }
    return cookieEnabled;
  }
};

/**
 * Utility helpers
 * -----------------------------------------------------------------------------
 * A collection of useful functions for dealing with arrays and objects
 *
 * @namespace utils
 */

slate.utils = {

  /**
   * Return an object from an array of objects that matches the provided key and value
   *
   * @param {array} array - Array of objects
   * @param {string} key - Key to match the value against
   * @param {string} value - Value to get match of
   */
  findInstance: function(array, key, value) {
    for (var i = 0; i < array.length; i++) {
      if (array[i][key] === value) {
        return array[i];
      }
    }
  },

  /**
   * Remove an object from an array of objects by matching the provided key and value
   *
   * @param {array} array - Array of objects
   * @param {string} key - Key to match the value against
   * @param {string} value - Value to get match of
   */
  removeInstance: function(array, key, value) {
    var i = array.length;
    while(i--) {
      if (array[i][key] === value) {
        array.splice(i, 1);
        break;
      }
    }

    return array;
  },

  /**
   * _.compact from lodash
   * Remove empty/false items from array
   * Source: https://github.com/lodash/lodash/blob/master/compact.js
   *
   * @param {array} array
   */
  compact: function(array) {
    var index = -1;
    var length = array == null ? 0 : array.length;
    var resIndex = 0;
    var result = [];

    while (++index < length) {
      var value = array[index];
      if (value) {
        result[resIndex++] = value;
      }
    }
    return result;
  },

  /**
   * _.defaultTo from lodash
   * Checks `value` to determine whether a default value should be returned in
   * its place. The `defaultValue` is returned if `value` is `NaN`, `null`,
   * or `undefined`.
   * Source: https://github.com/lodash/lodash/blob/master/defaultTo.js
   *
   * @param {*} value - Value to check
   * @param {*} defaultValue - Default value
   * @returns {*} - Returns the resolved value
   */
  defaultTo: function(value, defaultValue) {
    return (value == null || value !== value) ? defaultValue : value
  }
};

/**
 * Rich Text Editor
 * -----------------------------------------------------------------------------
 * Wrap videos in div to force responsive layout.
 *
 * @namespace rte
 */

slate.rte = {

  wrapTable: function() {
    $('.rte table').wrap('<div class="rte__table-wrapper"></div>');
  },

  iframeReset: function() {
    var $iframeVideo = $('.rte iframe[src*="youtube.com/embed"], .rte iframe[src*="player.vimeo"]');
    var $iframeReset = $iframeVideo.add('.rte iframe#admin_bar_iframe');

    $iframeVideo.each(function() {
      // Add wrapper to make video responsive
      $(this).wrap('<div class="rte__video-wrapper"></div>');
    });

    $iframeReset.each(function() {
      // Re-set the src attribute on each iframe after page load
      // for Chrome's "incorrect iFrame content on 'back'" bug.
      // https://code.google.com/p/chromium/issues/detail?id=395791
      // Need to specifically target video and admin bar
      this.src = this.src;
    });
  }
};

slate.Sections = function Sections() {
  this.constructors = {};
  this.instances = [];

  $(document)
    .on('shopify:section:load', this._onSectionLoad.bind(this))
    .on('shopify:section:unload', this._onSectionUnload.bind(this))
    .on('shopify:section:select', this._onSelect.bind(this))
    .on('shopify:section:deselect', this._onDeselect.bind(this))
    .on('shopify:section:reorder', this._onReorder.bind(this))
    .on('shopify:block:select', this._onBlockSelect.bind(this))
    .on('shopify:block:deselect', this._onBlockDeselect.bind(this));
};

slate.Sections.prototype = $.extend({}, slate.Sections.prototype, {
  _createInstance: function(container, constructor) {
    var $container = $(container);
    var id = $container.attr('data-section-id');
    var type = $container.attr('data-section-type');

    constructor = constructor || this.constructors[type];

    if (typeof constructor === 'undefined') {
      return;
    }

    var instance = $.extend(new constructor(container), {
      id: id,
      type: type,
      container: container
    });

    this.instances.push(instance);
  },

  _onSectionLoad: function(evt) {
    var container = $('[data-section-id]', evt.target)[0];
    if (container) {
      this._createInstance(container);
    }
  },

  _onSectionUnload: function(evt) {
    var instance = slate.utils.findInstance(this.instances, 'id', evt.detail.sectionId);

    if (!instance) {
      return;
    }

    if (typeof instance.onUnload === 'function') {
      instance.onUnload(evt);
    }

    this.instances = slate.utils.removeInstance(this.instances, 'id', evt.detail.sectionId);
  },

  _onSelect: function(evt) {
    var instance = slate.utils.findInstance(this.instances, 'id', evt.detail.sectionId);

    if (instance && typeof instance.onSelect === 'function') {
      instance.onSelect(evt);
    }
  },

  _onDeselect: function(evt) {
    var instance = slate.utils.findInstance(this.instances, 'id', evt.detail.sectionId);

    if (instance && typeof instance.onDeselect === 'function') {
      instance.onDeselect(evt);
    }
  },

  _onReorder: function(evt) {
    var instance = slate.utils.findInstance(this.instances, 'id', evt.detail.sectionId);

    if (instance && typeof instance.onReorder === 'function') {
      instance.onReorder(evt);
    }
  },

  _onBlockSelect: function(evt) {
    var instance = slate.utils.findInstance(this.instances, 'id', evt.detail.sectionId);

    if (instance && typeof instance.onBlockSelect === 'function') {
      instance.onBlockSelect(evt);
    }
  },

  _onBlockDeselect: function(evt) {
    var instance = slate.utils.findInstance(this.instances, 'id', evt.detail.sectionId);

    if (instance && typeof instance.onBlockDeselect === 'function') {
      instance.onBlockDeselect(evt);
    }
  },

  register: function(type, constructor) {
    this.constructors[type] = constructor;

    $('[data-section-type=' + type + ']').each(function(index, container) {
      this._createInstance(container, constructor);
    }.bind(this));
  }
});

/**
 * Currency Helpers
 * -----------------------------------------------------------------------------
 * A collection of useful functions that help with currency formatting
 *
 * Current contents
 * - formatMoney - Takes an amount in cents and returns it as a formatted dollar value.
 *
 */

slate.Currency = (function() {
  var moneyFormat = '${{amount}}';

  /**
   * Format money values based on your shop currency settings
   * @param  {Number|string} cents - value in cents or dollar amount e.g. 300 cents
   * or 3.00 dollars
   * @param  {String} format - shop money_format setting
   * @return {String} value - formatted value
   */
  function formatMoney(cents, format) {
    if (typeof cents === 'string') {
      cents = cents.replace('.', '');
    }
    var value = '';
    var placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
    var formatString = (format || moneyFormat);

    function formatWithDelimiters(number, precision, thousands, decimal) {
      precision = slate.utils.defaultTo(precision, 2);
      thousands = slate.utils.defaultTo(thousands, ',');
      decimal = slate.utils.defaultTo(decimal, '.');

      if (isNaN(number) || number == null) {
        return 0;
      }

      number = (number / 100.0).toFixed(precision);

      var parts = number.split('.');
      var dollarsAmount = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + thousands);
      var centsAmount = parts[1] ? (decimal + parts[1]) : '';

      return dollarsAmount + centsAmount;
    }

    switch (formatString.match(placeholderRegex)[1]) {
      case 'amount':
        value = formatWithDelimiters(cents, 2);
        break;
      case 'amount_no_decimals':
        value = formatWithDelimiters(cents, 0);
        break;
      case 'amount_with_comma_separator':
        value = formatWithDelimiters(cents, 2, '.', ',');
        break;
      case 'amount_no_decimals_with_comma_separator':
        value = formatWithDelimiters(cents, 0, '.', ',');
        break;
      case 'amount_no_decimals_with_space_separator':
        value = formatWithDelimiters(cents, 0, ' ');
        break;
    }

    return formatString.replace(placeholderRegex, value);
  }

  return {
    formatMoney: formatMoney
  };
})();

/**
 * Image Helper Functions
 * -----------------------------------------------------------------------------
 * A collection of functions that help with basic image operations.
 *
 */

slate.Image = (function() {

  /**
   * Preloads an image in memory and uses the browsers cache to store it until needed.
   *
   * @param {Array} images - A list of image urls
   * @param {String} size - A shopify image size attribute
   */

  function preload(images, size) {
    if (typeof images === 'string') {
      images = [images];
    }

    for (var i = 0; i < images.length; i++) {
      var image = images[i];
      this.loadImage(this.getSizedImageUrl(image, size));
    }
  }

  /**
   * Loads and caches an image in the browsers cache.
   * @param {string} path - An image url
   */
  function loadImage(path) {
    new Image().src = path;
  }

  /**
   * Find the Shopify image attribute size
   *
   * @param {string} src
   * @returns {null}
   */
  function imageSize(src) {
    var match = src.match(/.+_((?:pico|icon|thumb|small|compact|medium|large|grande)|\d{1,4}x\d{0,4}|x\d{1,4})[_\.@]/);

    if (match) {
      return match[1];
    } else {
      return null;
    }
  }

  /**
   * Adds a Shopify size attribute to a URL
   *
   * @param src
   * @param size
   * @returns {*}
   */
  function getSizedImageUrl(src, size) {
    if (size === null) {
      return src;
    }

    if (size === 'master') {
      return this.removeProtocol(src);
    }

    var match = src.match(/\.(jpg|jpeg|gif|png|bmp|bitmap|tiff|tif)(\?v=\d+)?$/i);

    if (match) {
      var prefix = src.split(match[0]);
      var suffix = match[0];

      return this.removeProtocol(prefix[0] + '_' + size + suffix);
    } else {
      return null;
    }
  }

  function removeProtocol(path) {
    return path.replace(/http(s)?:/, '');
  }

  return {
    preload: preload,
    loadImage: loadImage,
    imageSize: imageSize,
    getSizedImageUrl: getSizedImageUrl,
    removeProtocol: removeProtocol
  };
})();


/*================ Sections ================*/
var dropdowns = $(".nav-dropdowns .nav-dropdown");
var navbar = $("#navbar"),
    navLogo = $("#nav-logo"),
    dummyLogo = $("#dummy-nav-logo");
$(document).ready(function(){
  $(".m-nav_list--main").on("click", ".m-nav_drop--has-children", function(e){
    e.preventDefault();
    e.stopPropagation();
    var $this = $(this);
    var dropMenuIndex = $this.data("dropdown-id");
    var $relatedDropMenus = $($(".m-nav_dropdowns .m-nav_link-submenu").filter(function(i,el){return dropMenuIndex == el.getAttribute("data-dropdown-id")}));

    if ( $this.hasClass("is-active") ) {
      $this.removeClass("is-active");
      dropdowns.removeClass("is-active").stop().slideUp(300);
      handleLogoResize(true, true);
    } else {
      if($relatedDropMenus.hasClass('easy')) {
        $relatedDropMenus.css('left', $this.offset().left + "px");
      }
      handleLogoResize(false);
      dropdowns.removeClass("is-active").stop().slideUp(300);
      $(".m-nav_drop--has-children.is-active, .m-nav_dropdowns .m-nav_link-submenu.is-active").removeClass("is-active");
      $this.addClass("is-active");
      $relatedDropMenus.addClass("is-active");
      $relatedDropMenus.stop().slideDown(300);
    }
  })
});

if($(window).width() > 991) {
    $(window).resize(function() {
        window.requestAnimationFrame(function() {
            if($(window).width() < 991) {
                if(dropdowns.hasClass('is-active')) {
                    dropdowns.removeClass("is-active").stop().slideUp(300);
                    $('.m-nav_link').removeClass('is-active');
                }
            }
        });
    });
}


dropdowns.click(function(e) {
    e.stopPropagation();
})

$(document).click(function(e) {
   if(dropdowns.hasClass('is-active')) {
        dropdowns.removeClass("is-active").stop().slideUp(300);
        $('.m-nav_link').removeClass('is-active');
        handleLogoResize(true, true);
    }
})

function handleLogoResize(collapse, animate) {
    if($('body').hasClass('template-index')) {
        if(collapse) {
            if($(window).scrollTop() < 40 && navbar.hasClass('small-logo')) {
                navLogo.animate({
                    top: dummyLogo.css('top'),
                    width: dummyLogo.css('width')
                }, 300);
                navbar.removeClass('small-logo');
            }
        } else {
            if($(window).scrollTop() < 40 && !navbar.hasClass('small-logo')) {
                resizeLogo();
                navbar.addClass('small-logo');
            }
        }
    }
}

function resizeLogo() {
    var newNavWidth = "112px",
        newNavTop = "35px";
    var winWidth = $(window).width(); 
    if(winWidth <= 650) {
        newNavWidth = "68px";
        newNavTop = "3px";
    } else if(winWidth > 650 && winWidth <= 991) {
        newNavWidth = "100px";
    }
    navLogo.animate({
        top: newNavTop,
        width: newNavWidth
    }, 300);
}
/**
 * Product Template Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the Product template.
 *
   * @namespace product
 */

theme.Product = (function() {

  var selectors = {
    addToCart: '[data-add-to-cart]',
    addToCartText: '[data-add-to-cart-text]',
    comparePrice: '[data-compare-price]',
    comparePriceText: '[data-compare-text]',
    originalSelectorId: '[data-product-select]',
    priceWrapper: '[data-price-wrapper]',
    productFeaturedImage: '[data-product-featured-image]',
    productJson: '[data-product-json]',
    productPrice: '[data-product-price]',
    productThumbs: '[data-product-single-thumbnail]',
    singleOptionSelector: '[data-single-option-selector]'
  };

  /**
   * Product section constructor. Runs on page load as well as Theme Editor
   * `section:load` events.
   * @param {string} container - selector for the section container DOM element
   */
  function Product(container) {
    this.$container = $(container);
    var sectionId = this.$container.attr('data-section-id');

    this.settings = {};
    this.namespace = '.product';

    // Stop parsing if we don't have the product json script tag when loading
    // section in the Theme Editor
    if (!$(selectors.productJson, this.$container).html()) {
      return;
    }

    this.productSingleObject = JSON.parse($(selectors.productJson, this.$container).html());
    this.settings.imageSize = slate.Image.imageSize($(selectors.productFeaturedImage, this.$container).attr('src'));

    slate.Image.preload(this.productSingleObject.images, this.settings.imageSize);

    this.initVariants();
  }

  Product.prototype = $.extend({}, Product.prototype, {

    /**
     * Handles change events from the variant inputs
     */
    initVariants: function() {
      var options = {
        $container: this.$container,
        enableHistoryState: this.$container.data('enable-history-state'),
        singleOptionSelector: selectors.singleOptionSelector,
        originalSelectorId: selectors.originalSelectorId,
        product: this.productSingleObject
      };

      this.variants = new slate.Variants(options);

      this.$container.on('variantChange' + this.namespace, this.updateAddToCartState.bind(this));
      this.$container.on('variantImageChange' + this.namespace, this.updateProductImage.bind(this));
      this.$container.on('variantPriceChange' + this.namespace, this.updateProductPrices.bind(this));
    },

    /**
     * Updates the DOM state of the add to cart button
     *
     * @param {boolean} enabeled - Decides whether cart is enabled or disabled
     * @param {string} text - Updates the text notification content of the cart
     */
    updateAddToCartState: function(evt) {
      var variant = evt.variant;

      if (variant) {
        $(selectors.priceWrapper, this.$container).removeClass('hide');
      } else {
        $(selectors.addToCart, this.$container).prop('disabled', true);
        $(selectors.addToCartText, this.$container).html(theme.strings.unavailable);
        $(selectors.priceWrapper, this.$container).addClass('hide');
        return;
      }

      if (variant.available) {
        $(selectors.addToCart, this.$container).prop('disabled', false);
        $(selectors.addToCartText, this.$container).html(theme.strings.addToCart);
      } else {
        $(selectors.addToCart, this.$container).prop('disabled', true);
        $(selectors.addToCartText, this.$container).html(theme.strings.soldOut);
      }
    },

    /**
     * Updates the DOM with specified prices
     *
     * @param {string} productPrice - The current price of the product
     * @param {string} comparePrice - The original price of the product
     */
    updateProductPrices: function(evt) {
      var variant = evt.variant;
      var $comparePrice = $(selectors.comparePrice, this.$container);
      var $compareEls = $comparePrice.add(selectors.comparePriceText, this.$container);

      $(selectors.productPrice, this.$container)
        .html(slate.Currency.formatMoney(variant.price, theme.moneyFormat));

      if (variant.compare_at_price > variant.price) {
        $comparePrice.html(slate.Currency.formatMoney(variant.compare_at_price, theme.moneyFormat));
        $compareEls.removeClass('hide');
      } else {
        $comparePrice.html('');
        $compareEls.addClass('hide');
      }
    },

    /**
     * Updates the DOM with the specified image URL
     *
     * @param {string} src - Image src URL
     */
    updateProductImage: function(evt) {
      var variant = evt.variant;
      var sizedImgUrl = slate.Image.getSizedImageUrl(variant.featured_image.src, this.settings.imageSize);

      $(selectors.productFeaturedImage, this.$container).attr('src', sizedImgUrl);
    },

    /**
     * Event callback for Theme Editor `section:unload` event
     */
    onUnload: function() {
      this.$container.off(this.namespace);
    }
  });

  return Product;
})();

// Instafeed
var instagram = {
  loadContent: function(s){
    if(s.clientID) {
      var url = 'https://api.instagram.com/v1/users/self/media/recent/?access_token='+s.clientID+'&count='+s.limit;

      $.ajax({
        type: 'GET',
        url: url,
        dataType: 'jsonp',
        success: function(data) {
          if(data.meta.code === 200 && data.data.length) {
            var data = data.data;
            s.el.empty();

            for(var i = 0; i < data.length; i++) {
              var thisMedia = data[i], item;
              item = '<img class="m-instafeed_img ls-objectfit-img" src="'+thisMedia.images.standard_resolution.url+'" data-filter="'+thisMedia.filter+'" />';
              item = '<a class="l-responsive_square" href="'+thisMedia.link+'" target="_blank">'+item+'</a>';
            
              if(item) {
                item = '<div class="m-instafeed_item">'+item+'</div>';
              }
              if(item !== '') {
                s.el.append(item);
              }
            }
          } else {
            console.log(data.meta.error_message);
            console.log("data-returned: ", data);
          }
        },
        error: function() {
          console.log("Instagram Error!");
        }
      });
    }
  }
}
$(document).ready(function(){
  $("#collectionSidebar").on("click", ".m-sidebar_item--header.has-children", function(e) {
    e.preventDefault();
    $this = $(this);
    $this.toggleClass("is-active");
    $this.parent().next(".m-sidebar_item--childlist").slideToggle();
  })
});

/*================ Templates ================*/
/**
 * Customer Addresses Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the Customer Addresses
 * template.
 *
 * @namespace customerAddresses
 */

theme.customerAddresses = (function() {
  var $newAddressForm = $('#AddressNewForm');

  if (!$newAddressForm.length) {
    return;
  }

  // Initialize observers on address selectors, defined in shopify_common.js
  if (Shopify) {
    new Shopify.CountryProvinceSelector('AddressCountryNew', 'AddressProvinceNew', {
      hideElement: 'AddressProvinceContainerNew'
    });
  }

  // Initialize each edit form's country/province selector
  $('.address-country-option').each(function() {
    var formId = $(this).data('form-id');
    var countrySelector = 'AddressCountry_' + formId;
    var provinceSelector = 'AddressProvince_' + formId;
    var containerSelector = 'AddressProvinceContainer_' + formId;

    new Shopify.CountryProvinceSelector(countrySelector, provinceSelector, {
      hideElement: containerSelector
    });
  });

  // Toggle new/edit address forms
  $('.address-new-toggle').on('click', function() {
    $newAddressForm.toggleClass('hide');
  });

  $('.address-edit-toggle').on('click', function() {
    var formId = $(this).data('form-id');
    $('#EditAddress_' + formId).toggleClass('hide');
  });

  $('.address-delete').on('click', function() {
    var $el = $(this);
    var formId = $el.data('form-id');
    var confirmMessage = $el.data('confirm-message');
    if (confirm(confirmMessage || 'Are you sure you wish to delete this address?')) {
      Shopify.postLink('/account/addresses/' + formId, {parameters: {_method: 'delete'}});
    }
  });
})();

/**
 * Password Template Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the Password template.
 *
 * @namespace password
 */

theme.customerLogin = (function() {
  var config = {
    recoverPasswordForm: '#RecoverPassword',
    hideRecoverPasswordLink: '#HideRecoverPasswordLink'
  };

  if (!$(config.recoverPasswordForm).length) {
    return;
  }

  checkUrlHash();
  resetPasswordSuccess();

  $(config.recoverPasswordForm).on('click', onShowHidePasswordForm);
  $(config.hideRecoverPasswordLink).on('click', onShowHidePasswordForm);

  function onShowHidePasswordForm(evt) {
    evt.preventDefault();
    toggleRecoverPasswordForm();
  }

  function checkUrlHash() {
    var hash = window.location.hash;

    // Allow deep linking to recover password form
    if (hash === '#recover') {
      toggleRecoverPasswordForm();
    }
  }

  /**
   *  Show/Hide recover password form
   */
  function toggleRecoverPasswordForm() {
    $('#RecoverPasswordForm').toggleClass('hide');
    $('#CustomerLoginForm').toggleClass('hide');
  }

  /**
   *  Show reset password success message
   */
  function resetPasswordSuccess() {
    var $formState = $('.reset-password-success');

    // check if reset password form was successfully submited.
    if (!$formState.length) {
      return;
    }

    // show success message
    $('#ResetSuccess').removeClass('hide');
  }
})();

var productVariants = (function() {
	var productSelect = $("#product-variants-select"),
		variants = productSelect.children('option'),
		priceField = document.getElementById('price-field'),
		availableVariants = [],
		optionSelects = $(".option-wrapper-select"),
		submitBtn = document.getElementById('product-submit');

	if(optionSelects.length) optionSelects.change(updateVariants);

	if(productSelect.length) {
		//loop through hidden variants and turn them into usable objects
		for(var i=0;i<variants.length;i++) {
			var options = variants[i].getAttribute('data-options').split(",");
			for(var k=0;k<options.length;k++) {
				options[k] = decodeURIComponent(options[k]);
			}
			var newVariant = {"options": options, "id": variants[i].getAttribute('value'), "aviable": variants[i].getAttribute('aviable'), "price": variants[i].getAttribute('data-price')}
			availableVariants.push(newVariant);
		}
		if(optionSelects.length) updateVariants();
		if(variants.length == 0) {
			setSubmitButton(true);
		}
	}

	function updateVariants() {
		var currentOptions = getCurrentOptions(),
			matchedVariant = null,
			inStock = false;
		//loop through all variants
		for(var i=0;i<availableVariants.length;i++) {
			var variantOptions = availableVariants[i].options,
				count = 0;
			//loop through options for current variant
			for(var j=0;j<variantOptions.length;j++) {
				//loop through selected options and check if they match with variantOptions
				var selectedOptions = currentOptions;
				for(var k=0;k<currentOptions.length;k++) {
					if(variantOptions[j] === selectedOptions[k]) {
						count++;
					}
				}
			}
			//if count equals options length that means the variant is available
			if(count === variantOptions.length) {
				inStock = true;
				matchedVariant = availableVariants[i];
				priceField.innerHTML = matchedVariant.price;
				break;
			}
		}
		if(inStock) {
			//change selected variant in official product select
			for(var i=0;i<variants.length;i++) {
				if(variants[i].getAttribute('value') === matchedVariant.id) {
					variants[i].setAttribute('selected', 'selected');
                    
				} else variants[i].removeAttribute('selected');
			}
          	
            if(matchedVariant.aviable === "true"){
              setSubmitButton(false);
            }
            else{
              setSubmitButton(true);
            }
			
		} else {
           setSubmitButton(true);
			
		}
      	var int = setInterval(function(){
          if(typeof spoProduct != "undefined") {  
              clearInterval(int);
              spoProduct.updateVariant(matchedVariant.id);
          }  
        },200);
        
	}

	function setSubmitButton(disable)
  	{
      //added for erroring checking
      let subbtn = document.querySelector('#product-submit');
      let subbtn2 = document.querySelector('theme-btn');
      if(subbtn !== null)
      {
       	 if(disable == true)
          {
            //if (subbtn.hasAttribute('disabled') === true)
            subbtn.setAttribute('disabled', 'disabled');
            subbtn.innerHTML = "SOLD OUT";
          }
          else
          {
            subbtn.removeAttribute('disabled');
            subbtn.innerHTML = "ADD TO CART";
          }
      }
      else if(subbtn2 !== null)
      {
        if (subbtn2.hasAttribute('disabled') === true)
        {
          if(disable == true)
          {
            subbtn2.setAttribute('disabled', 'disabled');
            subbtn2.innerHTML = "SOLD OUT";
          }
          else
          {
            subbtn2.removeAttribute('disabled');
            subbtn2.innerHTML = "ADD TO CART";
          } 
        }
      }
      /*
      if(disable)
      {
         submitBtn.setAttribute('disabled', 'disabled');
         submitBtn.innerHTML = "SOLD OUT";
      }
      else
      {
         submitBtn.removeAttribute('disabled');
         submitBtn.innerHTML = "ADD TO CART";
      }
      */
    }
  
 
	function getCurrentOptions() {
		//get array of currently selected options
		var options = [];
		for(var i=0;i<optionSelects.length;i++) {
			options.push(decodeURIComponent(optionSelects[i].value));
		}
		return options;
	}
})();

var productImages = (function() {
	var smallImages = $(".product-small-pic-container .small-image"),
		bigImages = $("#product-pic-container .big-image");

	smallImages.click(changeImage);

	function changeImage() {
		var smallId = $(this).attr('data-id'),
			activePic = null,
			nextPic = null;

		//find active image and next image
		for(var i=0;i<bigImages.length;i++) {
			if(bigImages[i].getAttribute('data-id') === smallId) {
				nextPic = bigImages[i];
			}
			if(bigImages[i].getAttribute('data-active') === 'true') {
				activePic = bigImages[i];
			}
		}

		activePic = $(activePic);
		nextPic = $(nextPic);

		activePic.hide().attr('data-active', 'false').children('img').removeClass('active');
		nextPic.show().attr('data-active', 'true').children('img').addClass('active');
	}

})();

var productTabs = (function() {
	var contents = $("#product-page .tab-title-content"),
		titles = $("#product-page .tab");

	if(titles.length) {
		titles.click(function() {
			titles.removeClass('active');
			$(this).addClass('active');
			for(var i=0;i<contents.length;i++) {
				if(contents[i].getAttribute('data-tab') === $(this).attr('data-tab')) {
					$(contents[i]).show();
				} else {
					$(contents[i]).hide();
				}
			}
		});
	}
})();

var productConditions = (function() {
	var conditions = $("#product-page .product-condition.list .condition-title");

	if(conditions.length) {
		conditions.click(function() {
			if($(this).hasClass('active')) {
				conditions.removeClass('active');
				conditions.next().slideUp(250);
			} else {
				conditions.removeClass('active');
				conditions.next().slideUp(250);
				$(this).addClass('active');
				$(this).next().stop().slideDown(250);
			}
		});
	}
})();

var productGiftWrap = (function() {
	var priceAdd = $("#plus-gift-wrap"),
		propInput = $("#gift-wrap-prop"),
		addInput = $("#add-gift-wrap");

	if(addInput.length) {
		addInput.click(function() {
			if($(this).is(':checked')) {
				priceAdd.css('opacity', '1');
				propInput.val('yes');
			} else {
				priceAdd.css('opacity', '0');
				propInput.val('no');
			}
		});
	}
})();

/*================ Snippets ================*/
$(document).ready(function(){
  $(".m-accordions").on("click", ".m-accordion_trigger", function(e) {
    $this = $(this);
    $this.toggleClass("is-active");
    $this.parent().next(".m-accordion_content").slideToggle();
  })
});

/*================ SLEEPLESS ================*/
var navScroll = (function() {
	var navbar = $("#navbar"),
		navShadow = $("#scroll-shadow"),
		navCollapsed = false,
		navLogo = $("#navbar .m-nav_logo"),
		$window = $(window);
	var dropdowns = $(".nav-dropdowns .nav-dropdown");
	//nav scrolling

	$window.scroll(function() {
		window.requestAnimationFrame(handleScroll);
	});

	function handleScroll() {
		var scrollTop = $window.scrollTop();
		if(!$('body').hasClass('no-scroll')) {
			if(scrollTop >= 40 && !navbar.hasClass('scrolled')) {
				navbarSlide(true);
				navbar.addClass('scrolled')
			} else if(scrollTop < 40 && navbar.hasClass('scrolled')) {
				navbarSlide(false);
				navbar.removeClass('scrolled')
			}
		}
	}

	function navbarSlide(collapse) {
		if(collapse) {
			var winWidth = $window.width(); 
			if(winWidth > 650) {
				navbar.animate({
					top: '-35px'
				}, 175);
			}
			navShadow.css("opacity", "1");
			resizeLogo();
		} else {
			navbar.stop().css("top", "0");
			navShadow.css("opacity", "0");
			if(!dropdowns.hasClass('is-active')) {
				navLogo.stop().attr('style', '0');
			}
		}
	}

	$window.resize(function() {
		window.requestAnimationFrame(function() {
			if($window.width() <= 650 && navbar.css('top'))  {
				navbar.attr('style', '');
			}
		});
	});

	function resizeLogo() {
		var newNavWidth = "75px",
			newNavTop = "35px";
		var winWidth = $window.width(); 
		if(winWidth <= 650) {
			newNavWidth = "68px";
			newNavTop = "3px";
		} else if(winWidth > 650 && winWidth <= 991) {
			newNavWidth = "75px";
		}
		navLogo.animate({
			top: newNavTop,
			width: newNavWidth
		}, 175);
	}
})();

var flyout = (function() {
	var accTitles = $("#flyout .accordion-title"),
		subAccTitles = $("#flyout .sub-accordion-title"),
		flyout = $("#flyout"),
		overlay = $("#flyout-overlay"),
		navbar = $("#navbar"),
		flyoutContent = $(".flyout-content"),
		buttons = $(".flyout-button");

	buttons.click(function() {
		if($(this).hasClass('active')) {
			buttons.removeClass('active');
			overlay.stop().fadeOut(250);
			flyout.stop().slideUp(250);
			$('body').removeClass('no-scroll');
			accTitles.removeClass('active');
			accTitles.next().slideUp(250);
			subAccTitles.removeClass('active');
			subAccTitles.next().slideUp(250);
			handleLogoResize(true);
		} else {
			buttons.addClass('active');
			overlay.stop().fadeIn(250);
			var newHeight = "213px";
			if($(window).width() < 651) {
				newHeight = $(window).height() - 80 + 'px';
			}
			flyout.css('height', newHeight);
			flyout.stop().slideDown(250);
			$('body').addClass('no-scroll');
			handleLogoResize(false);
		}
	});

	accTitles.click(function() {
		if($(this).hasClass('active')) {
			accTitles.removeClass('active');
			accTitles.next().slideUp(250);
			if($(window).width() > 650) {
				flyout.stop().animate({
					height: "213px"
				}, 250);
			}
		} else {
			accTitles.removeClass('active');
			accTitles.next().slideUp(250);
			$(this).addClass('active');
			var contentHeight = $(this).next().height() + 213;
			$(this).next().stop().slideDown(250);
			if($(window).width() > 650) {
				var winHeight = $(window).height() - $("#navbar").height(),
					newHeight = contentHeight;
				if(contentHeight > winHeight) {
					newHeight = winHeight;
				}

				flyout.stop().animate({
					height: newHeight + "px"
				}, 250);
			}
		}
	});
	subAccTitles.click(function() {
		if($(this).hasClass('active')) {
			subAccTitles.removeClass('active');
			subAccTitles.next().slideUp(250);
		} else {
			subAccTitles.removeClass('active');
			subAccTitles.next().slideUp(250);
			$(this).addClass('active');
			$(this).next().stop().slideDown(250);
		}
	});

	function handleLogoResize(collapse) {
	    if($('body').hasClass('template-index') && $(window).width() <= 650) {
	        if(collapse) {
	            if($(window).scrollTop() < 40 && navbar.hasClass('small-logo')) {
	                navLogo.stop().attr('style', '0');
	                navbar.removeClass('small-logo')
	            }
	        } else {
	            if($(window).scrollTop() < 40 && !navbar.hasClass('small-logo')) {
	                resizeLogo();
	                navbar.addClass('small-logo')
	            }
	        }
	    }
	}
})();

var footerAccordion = (function() {
	var accTitles = $("footer .accordion-title");

	accTitles.click(function() {
		if($(this).hasClass('active')) {
			accTitles.removeClass('active');
			accTitles.next().slideUp(250);
		} else {
			accTitles.removeClass('active');
			accTitles.next().slideUp(250);
			$(this).addClass('active');
			$(this).next().stop().slideDown(250);
		}
	})
})();
var cartAgree = (function() {
	var form = $("#cart-form");
	form.submit(function(e) {
		if(!$("#agree").is(':checked') && document.activeElement.getAttribute('name') != "update") {
			e.preventDefault();
			$("#agree-error").show();
			//$(this)[0].submit();
		}
	})
})();
var sideMenuAccordion = (function() {
	var sideMenu = $(".interior-side-menu"),
		title = $(sideMenu.find('h4'));

	if(title.length && $(window).width() < 992) {
		title.click(function() {
			if(title.hasClass('active')) {
				title.next().removeClass('active').slideUp(250);
				title.removeClass('active');
			} else {
				title.next().addClass('active').slideDown(250);
				title.addClass('active');
			}
		});
	}
})();

var defaultInteriorAccordion = (function() {
	var accordionTitles = $(".interior-accordion .accordion-title")

	if(accordionTitles.length) {
		accordionTitles.click(function() {
			if($(this).hasClass('active')) {
				accordionTitles.next().slideUp(250);
				accordionTitles.removeClass('active');
			} else {
				accordionTitles.next().slideUp(250);
				accordionTitles.removeClass('active');
				$(this).addClass('active');
				$(this).next().stop().slideDown(250);
			}
		});
	}
})();

var submitFamilyTree = (function() {
	var fileInputs = $(".form-line.file-upload .form-upload-multiple");

	if(fileInputs.length) {
		fileInputs.change(function(e) {
			$(this).parents('.form-line').find('.file-name').text(this.value.split(/(\\|\/)/g).pop())
		})
	}
})();
//forgot password form
var forgotPassword = (function() {
	var forgotBtn = $("#forgot-password"),
		loginForm = $("#login-form"),
		forgotForm = $("#forgot-password-form"),
		sentEmail = $("#successful-post");

	if(forgotBtn.length) forgotBtn.click(function() {
		loginForm.hide();
		forgotForm.show();
		$("#login-header").text('RECOVER PASSWORD');
	});

	if(sentEmail.length) $("#form-reset-success").html("<p><em>Reset Password Email Sent!</em></p>");
})();

//open/closing add/edit addresses
var accountPage = (function() {
	var addBtn = $("#add-address"),
		cancelBtn = $("#cancel-address-form"),
		addressForm = $("#address-form"),
		addressErrors = $("#address-form-errors"),
		editAddressBtn = $(".edit-address-link"),
		cancelEditBtn = $(".cancel-edit-address");

	if(editAddressBtn.length) editAddressBtn.click(editAddress);
	if(addressErrors.length) addressForm.slideDown();

	if(cancelBtn.length) cancelBtn.click(function() {
		addressForm.slideUp();
	});

	if(addBtn.length) addBtn.click(function() {
		addressForm.slideDown();
	});

	if(cancelEditBtn.length) cancelEditBtn.click(function() {
		$(this).parents('.edit-address').slideUp();
	});

	function editAddress() {
		$(this).parents('.customer-address').find('.edit-address').slideDown();
	}
})();	

$(document).ready(function() {
  var sections = new slate.Sections();
  sections.register('product', theme.Product);

  // Common a11y fixes
  slate.a11y.pageLinkFocus($(window.location.hash));

  $('.in-page-link').on('click', function(evt) {
    slate.a11y.pageLinkFocus($(evt.currentTarget.hash));
  });

  // Wrap videos in div to force responsive layout.
  slate.rte.wrapTable();
  slate.rte.iframeReset();

  // Apply a specific class to the html element for browser support of cookies.
  if (slate.cart.cookiesEnabled()) {
    document.documentElement.className = document.documentElement.className.replace('supports-no-cookies', 'supports-cookies');
  }

  $('.instagram-feed-wrap').each(function (index, value) {
    var $target = $(this).find(".js-instafeed");
    instagram.loadContent({
      el: $target,
      clientID: $target.data('client-id'),
      limit: $target.data('count')
    });
  });

  $(".m-slider_landing .m-slider").owlCarousel({
    center: true,
    items:2,
    loop:true,
    dots:true,
    autoWidth:true,
    autoplay: true,
    autoplayPauseOnHover: true,
    responsive: {
      0: {
        autoWidth:false,
        items: 1
      },
      992: {
        autoWidth:true
      }
    }
  });
  if($("#home-best-sellers").length) {
    $("#home-best-sellers .owl-carousel").owlCarousel({
      items: 4,
      loop:true,
      margin:20,
      nav:true,
      autoplay:true,
      autoplayPauseOnHover: true,
      navText: [
        '<div class="fa fa-angle-left carousel-arrow left"></div>',
        '<div class="fa fa-angle-right carousel-arrow right"></div>'
      ],
      responsive: {
        0: {
          items: 1
        },
        500: {
          items: 2
        },
        992: {
          items: 4
        }
      }
    });
  }
  if($("#related-products").length) {
    $("#related-products .owl-carousel").owlCarousel({
      items: 4,
      loop:true,
      margin:20,
      nav:false,
      responsive: {
        0: {
          items: 1
        },
        500: {
          items: 2
        },
        992: {
          items: 4
        }
      }
    });
  }
});