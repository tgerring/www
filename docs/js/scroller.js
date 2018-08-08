
    // clients

      $(window).load(function() {
      $("#flexiselDemo1").flexisel({
      visibleItems: 2,
      animationSpeed: 1000,
      autoPlay:false,
      autoPlaySpeed: 2500,
      pauseOnHover: true,
      enableResponsiveBreakpoints: true,
      responsiveBreakpoints: {
      portrait: {
      changePoint:480,
      visibleItems: 1
      },
      landscape: {
      changePoint:640,
      visibleItems:1
      },
      tablet: {
      changePoint:768,
      visibleItems: 1
      }
      }
      });
      });

    // here stars scrolling icon
      $(document).ready(function() {
      /*
      var defaults = {
      containerID: 'toTop', // fading element id
      containerHoverID: 'toTopHover', // fading element hover id
      scrollSpeed: 1200,
      easingType: 'linear'
      };
      */
      $().UItoTop({ easingType: 'easeOutQuart' });
      });
    // //here ends scrolling icon
    // //smooth scrolling
    // scrolling script

      jQuery(document).ready(function($) {
      $(".scroll").click(function(event){
      event.preventDefault();
      $('html,body').animate({scrollTop:$(this.hash).offset().top},1000);
      });
      });
    // //scrolling script