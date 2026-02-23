document.addEventListener("DOMContentLoaded", function() {
    // Scramble text at word level on hover; restore when mouse leaves (excluding navbar/header, footer, and blog posts)
    if (typeof initTextScramble === "function") initTextScramble();

    // Soft gradient blob that follows the mouse
    (function initCursorGradient() {
        var blob = document.querySelector(".cursor-gradient-blob");
        if (!blob || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !window.matchMedia("(hover: hover)").matches) return;
        var currentX = window.innerWidth / 2;
        var currentY = window.innerHeight / 2;
        var targetX = currentX;
        var targetY = currentY;
        var ease = 0.06;
        blob.style.left = currentX + "px";
        blob.style.top = currentY + "px";
        document.addEventListener("mousemove", function(e) {
            targetX = e.clientX;
            targetY = e.clientY;
        });
        function tick() {
            currentX += (targetX - currentX) * ease;
            currentY += (targetY - currentY) * ease;
            blob.style.left = currentX + "px";
            blob.style.top = currentY + "px";
            requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
    })();

    var lazyloadImages;    
  
    if ("IntersectionObserver" in window) {
      lazyloadImages = document.querySelectorAll(".lazyLoad");
      var imageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            var image = entry.target;
            image.classList.remove("lazyLoad");
            imageObserver.unobserve(image);
          }
        });
      });
  
      lazyloadImages.forEach(function(image) {
        imageObserver.observe(image);
      });
    } else {  
      var lazyloadThrottleTimeout;
      lazyloadImages = document.querySelectorAll(".lazyLoad");
      
      function lazyload () {
        if(lazyloadThrottleTimeout) {
          clearTimeout(lazyloadThrottleTimeout);
        }    
  
        lazyloadThrottleTimeout = setTimeout(function() {
          var scrollTop = window.pageYOffset;
          lazyloadImages.forEach(function(img) {
              if(img.offsetTop < (window.innerHeight + scrollTop)) {
                img.src = img.dataset.src;
                img.classList.remove('lazyLoad');
              }
          });
          if(lazyloadImages.length == 0) { 
            document.removeEventListener("scroll", lazyload);
            window.removeEventListener("resize", lazyload);
            window.removeEventListener("orientationChange", lazyload);
          }
        }, 20);
      }
  
      document.addEventListener("scroll", lazyload);
      window.addEventListener("resize", lazyload);
      window.addEventListener("orientationChange", lazyload);
    }
})