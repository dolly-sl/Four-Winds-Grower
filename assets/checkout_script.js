$(document).ready(function() {
  function checkCitrus() {
    // Configuration
    var noCitrusStates = ["FL", "TX", "AZ"];

    // End Configuration
    var stateFound;
    var foundProhibitedTag = false;

    stateFound = window.cart.shipping_state;
    tags = window.cart.tags;

    if (tags.includes('citrus restricted') || tags.includes('citrus-restricted')) {
      foundProhibitedTag = true;
    }

    if (noCitrusStates.includes(stateFound) && foundProhibitedTag == true) {
      return true;
    }
  }

  if (checkCitrus() && $('.step').attr('data-step') == 'shipping_method') {
      console.log('Checkout Error.');

      var citrusNoticeString = 'As mentioned in our <a href="https://www.fourwindsgrowers.com/pages/shipping-information">Shipping Terms</a>, we are unable to ship citrus items to Texas, Arizona, or Florida. Please remove citrus items or change your shipping address.';

      if ($('.notice--error').length) {
        $('.notice--error').find('.notice__text').html(citrusNoticeString);
      } else {
        $('.section__content').html($('#alert__template').contents());
      }
  }

  function throwWeatherRestriction() {
    $('.section--shipping-method').before($('#alert__weather').contents());
  }

  window.cart.weather_states.forEach(function(curParent) {
      if ( curParent.toLowerCase() == window.cart.shipping_state.toLowerCase()) {
        throwWeatherRestriction();
      }
  })
});
