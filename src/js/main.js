'use strict';

svg4everybody();

/**
 * lazy loading
 */
document.addEventListener("DOMContentLoaded", () => {
  const lazyImages = [].slice.call(document.querySelectorAll(".lazy"));
  const lazyBgs = [].slice.call(document.querySelectorAll(".lazy-bg"));

  if ("IntersectionObserver" in window && "IntersectionObserverEntry" in window && "intersectionRatio" in window.IntersectionObserverEntry.prototype) {
    const lazyImageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach( (entry) => {
        if (entry.isIntersecting) {
          const lazyImage = entry.target;
          if (lazyImage.dataset.src) {
            lazyImage.src = lazyImage.dataset.src;
          }
          if (lazyImage.dataset.src) {
            lazyImage.srcset = lazyImage.dataset.srcset;
          }
          lazyImage.classList.remove("lazy");
          lazyImageObserver.unobserve(lazyImage);
        }
      });
    });
    const lazyBgObserver = new IntersectionObserver( (entries, observer) => {
      entries.forEach( (entry) => {
        if (entry.isIntersecting) {
          const lazyBg = entry.target;
          lazyBg.classList.add("lazy-bg--loaded");
          lazyBgObserver.unobserve(lazyBg);
        }
      });
    });

    lazyImages.forEach( (lazyImage) => {
      lazyImageObserver.observe(lazyImage);
    });
    lazyBgs.forEach( (lazyBg) => {
      lazyBgObserver.observe(lazyBg);
    });
  } else {
    lazyImages.forEach( (lazyImage) => {
      lazyImage.src = lazyImage.dataset.src;
      lazyImage.srcset = lazyImage.dataset.srcset;
    });
    lazyBgs.forEach( (lazyBg) => {
      lazyBg.classList.add("lazy-bg--loaded");
    });
  }
});