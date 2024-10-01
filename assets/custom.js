jQuery(document).ready(function ($) {
    $('.pages-carousel').owlCarousel({
      items: 4,
      loop: false,
      margin: 0,
      nav: true,
      dots: true,
      autoplay: false,
      autoplayPauseOnHover: true,
      touchDrag: true,
      mouseDrag: true,
      smartSpeed: 600,
      touchDragThreshold: 5,
      mouseDragThreshold: 5,
      navText: [
        "<span class='nav-arrow prev-arrow'><svg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'><circle cx='15' cy='15' r='14.5' fill='#fff' stroke='#E3DAD0'/><path d='m17 21-5-6 5-6' stroke='#443E37' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/></svg></span>",
        "<span class='nav-arrow next-arrow'><svg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'><circle cx='15' cy='15' r='14.5' transform='matrix(-1 0 0 1 30 0)' fill='#fff' stroke='#E3DAD0'/><path d='m13 21 5-6-5-6' stroke='#443E37' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/></svg></span>",
      ],
      responsive: {
        0: {
          items: 1,
        },
        350: {
          items: 2,
        },
        800: {
          items: 3,
        },
        1160: {
          items: 4,
        },
      },
    });

    $('.articles-carousel').owlCarousel({
      items: 4,

      loop: false,
      margin: 0,
      nav: true,
      dots: true,
      autoplay: false,
      autoplayPauseOnHover: true,
      touchDrag: true,
      mouseDrag: true,
      smartSpeed: 600,
      touchDragThreshold: 5,
      mouseDragThreshold: 5,
      navText: [
        "<span class='nav-arrow prev-arrow'><svg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'><circle cx='15' cy='15' r='14.5' fill='#fff' stroke='#E3DAD0'/><path d='m17 21-5-6 5-6' stroke='#443E37' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/></svg></span>",
        "<span class='nav-arrow next-arrow'><svg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'><circle cx='15' cy='15' r='14.5' transform='matrix(-1 0 0 1 30 0)' fill='#fff' stroke='#E3DAD0'/><path d='m13 21 5-6-5-6' stroke='#443E37' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/></svg></span>",
      ],
      responsive: {
        0: {
          items: 1,
        },
        350: {
          items: 2,
        },
        800: {
          items: 3,
        },
        1160: {
          items: 4,
        },
      },
    });

    $('.videos-carousel').owlCarousel({
      items: 4,

      loop: false,
      margin: 0,
      nav: true,
      dots: true,
      autoplay: false,
      autoplayPauseOnHover: true,
      touchDrag: true,
      mouseDrag: true,
      smartSpeed: 600,
      touchDragThreshold: 5,
      mouseDragThreshold: 5,
      navText: [
        "<span class='nav-arrow prev-arrow'><svg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'><circle cx='15' cy='15' r='14.5' fill='#fff' stroke='#E3DAD0'/><path d='m17 21-5-6 5-6' stroke='#443E37' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/></svg></span>",
        "<span class='nav-arrow next-arrow'><svg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'><circle cx='15' cy='15' r='14.5' transform='matrix(-1 0 0 1 30 0)' fill='#fff' stroke='#E3DAD0'/><path d='m13 21 5-6-5-6' stroke='#443E37' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/></svg></span>",
      ],
      responsive: {
        0: {
          items: 1,
        },
        350: {
          items: 2,
        },
        800: {
          items: 3,
        },
        1160: {
          items: 4,
        },
      },
    });

    // Tab navigation
    $('.tab-section-with-slider .tab-nav li').first().addClass('active');
    var datatab = $('.tab-section-with-slider .tab-nav li').first().attr('data-tab');
    var getid = $('.tab-content .tab-pane').attr('id');
    console.log(datatab);
    if (datatab == 'videos-tab') {
      $('.tab-section-with-slider #videos-tab').addClass('active');
    } else {
      $('.tab-section-with-slider #videos-tab').removeClass('active');
    }
    if (datatab == 'articles-tab') {
      $('.tab-section-with-slider #articles-tab').addClass('active');
    } else {
      $('.tab-section-with-slider #articles-tab').removeClass('active');
    }
    if (datatab == 'pages-tab') {
      $('.tab-section-with-slider #pages-tab').addClass('active');
    } else {
      $('.tab-section-with-slider #pages-tab').removeClass('active');
    }
    $('.tab-section-with-slider .tab-nav li').click(function () {
      var tab_id = $(this).attr('data-tab');

      $('.tab-section-with-slider .tab-nav li').removeClass('active');
      $('.tab-section-with-slider .tab-pane').removeClass('active');

      $(this).addClass('active');
      $('#' + tab_id).addClass('active');
    });
    // dropdown
    if ($(window).width() < 768) {
        $('.tab-section-with-slider .tab-dropdown').on('change', function () {
          var selectedTab = $(this).val(); // Get the value of the selected option
          $('.tab-section-with-slider .tab-content > div').removeClass('active').hide();
          $('#' + selectedTab)
            .addClass('active')
            .show();
        });
  
        $('.tab-section-with-slider .tab-content > div').each(function (index) {
          if (index === 0) {
            $(this).addClass('active').show(); // Show the first tab
          } else {
            $(this).hide();
          }
        });
      }



    //Product slider
    $('#home-products-slider .owl-carousel').owlCarousel({
        items: 4,
        loop: false,
        margin: 0,
        nav: true,
        dots: true,
        autoplay: false,
        autoplayPauseOnHover: true,
        touchDrag: true,
        mouseDrag: true,
        smartSpeed: 600,
        touchDragThreshold: 5,
        mouseDragThreshold: 5,
        navText: [
          "<span class='nav-arrow prev-arrow'><svg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'><circle cx='15' cy='15' r='14.5' fill='#fff' stroke='#E3DAD0'/><path d='m17 21-5-6 5-6' stroke='#443E37' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/></svg></span>",
          "<span class='nav-arrow next-arrow'><svg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'><circle cx='15' cy='15' r='14.5' transform='matrix(-1 0 0 1 30 0)' fill='#fff' stroke='#E3DAD0'/><path d='m13 21 5-6-5-6' stroke='#443E37' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/></svg></span>",
        ],
        responsive: {
          0: {
            items: 1,
          },
          350: {
            items: 2,
          },
          800: {
            items: 3,
          },
          1160: {
            items: 4,
          },
        },
      }); 
  });