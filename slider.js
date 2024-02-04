document.addEventListener('DOMContentLoaded', function () {
  let loadCarouselButton = document.getElementById('ourProjectsBtn');
  let loadCarouselButton2 = document.getElementById("ourTechnologyBtn")

  loadCarouselButton.addEventListener('click', function() {
      // Call the function to initialize the carousel here
      initializeCarousel();
  });

  loadCarouselButton2.addEventListener('click', function() {
    // Call the function to initialize the carousel here
    initializeCarousel();
});

});

function initializeCarousel() {
  // Create a new slider and run it
  new Slider('new-products', [576, 992]).run();
  // Create a new slider and run it
  new Slider('featured-products', [576, 768, 992]).run();
}

  // A class for building sliders from it
  class Slider {
    constructor(id, mediaQueries) {
      // Get HTML elements
      this.slider = document.querySelector(`#${id}`);
      this.sliderList = this.slider.querySelector('.slider-list');
      this.sliderItems = this.slider.querySelectorAll('.slider-item');
      this.sliderNext = this.slider.querySelector('.slider-arrow-next');
      this.sliderPrev = this.slider.querySelector('.slider-arrow-prev');

      // Store the original length of the slider items
      this.originalSliderItemsLength = this.sliderItems.length;

      // Get media queries
      this.mediaQueryList = [window.matchMedia(`screen and (max-width:${mediaQueries[0] - 1}px)`)];
      mediaQueries.forEach((mediaQuery) => {
        this.mediaQueryList.push(window.matchMedia(`screen and (min-width:${mediaQuery}px)`));
      });

      // Define global variables
      this.numberOfVisibleItems = null;
      this.currentItemIndex = null;
      this.sliderItemsLength = this.sliderItems.length;
      this.mediaQueryLength = this.mediaQueryList.length;
      this.firstItemCloned = false;

      // Add event listener: to call the run function again when screen resized
      this.mediaQueryList.forEach((mediaQuery) => {
        mediaQuery.addEventListener('change', () => {
          this.run();
        });
      });

      // Disable focus on all slides links
      this.sliderItems.forEach((item) => {
        const elements = item.querySelectorAll('a');
        elements.forEach((element) => {
          element.tabIndex = '-1';
        });
      });

      // Add event listener: to scroll down to slider when previous arrow focused
      this.sliderPrev.addEventListener('focusin', () => {
        this.slider.scrollIntoView();
      });

      // Add event listener: to scroll down to slider when next arrow focused
      this.sliderNext.addEventListener('focusin', () => {
        this.slider.scrollIntoView();
      });

            // Add event listener: to go to next slide
      this.sliderNext.addEventListener('click', () => {
        this.currentItemIndex++;
        if (this.currentItemIndex >= this.sliderItemsLength) {
            this.currentItemIndex = 0; // Loop back to the first slide
        }
        this.shiftSlides();
      });

      // Add event listener: to go to previous slide
      this.sliderPrev.addEventListener('click', () => {
        this.currentItemIndex--;
        if (this.currentItemIndex < 0) {
            this.currentItemIndex = this.sliderItemsLength - this.numberOfVisibleItems; // Loop back to the last slide
        }
        this.shiftSlides();
      });
    }

    run() {
      let index = this.mediaQueryLength - 1;
      const isVertical = window.innerWidth <= 1100; // Check if the layout should be vertical
    
      while (index >= 0) {
        if (this.mediaQueryList[index].matches) {
          // Set number of visible slides
          this.numberOfVisibleItems = index + 1;
    
          // Reset the slider
          this.currentItemIndex = 0;
          this.sliderList.style.transform = 'translateX(0%)';
          if (isVertical) {
            // Adjust the height and width for vertical layout
            // this.sliderList.style.height = `auto`;
            this.sliderList.style.width = `100%`; // Set width to 90% for vertical layout
            this.sliderItems.forEach((item) => {
              // item.style.height = `50%`;
              item.style.width = `99%`; // Each item takes full width in vertical mode
              item.style.height = "auto";
            });
            // Adjust the height of the slider list based on the height of the first item
            if (this.sliderItems.length > 0) {
              const firstItemHeight = this.sliderItems[0].clientHeight;
              this.sliderList.style.height = `${firstItemHeight * this.numberOfVisibleItems}px`;
            }

          } else {
            // Adjust the width for horizontal layout
            this.sliderList.style.width = `calc(${(100 / this.numberOfVisibleItems) * this.sliderItemsLength}% + ${(this.sliderItemsLength / this.numberOfVisibleItems) * 16}px)`;
            this.sliderItems.forEach((item) => {
              item.style.width = `${100 / this.numberOfVisibleItems}%`;
            });
          }
    
          // Exit the loop
          break;
        }
        index--;
      }
    }

  shiftSlides() {
    const isVertical = window.innerWidth <= 1100; // Check if the layout should be vertical
  
    // Calculate slide dimension based on orientation
    let slideDimension;
    if (isVertical) {
      // Assuming all items have the same height
      slideDimension = 100 / this.numberOfVisibleItems; // Percentage of one slide's height
    } else {
      // Assuming all items have the same width
      slideDimension = 100 / this.numberOfVisibleItems; // Percentage of one slide's width
    }
 

    // Apply transformation
    if (this.currentItemIndex >= this.originalSliderItemsLength - this.numberOfVisibleItems + 1) {
      this.sliderList.style.transition = 'transform 0.5s ease';
      if (isVertical) {
        this.sliderList.style.transform = `translateY(-${slideDimension * (this.originalSliderItemsLength - this.numberOfVisibleItems)}%)`;
        console.log("translateY", this.sliderList.style.transform);
      } else {
        this.sliderList.style.transform = `translateX(-${slideDimension * (this.originalSliderItemsLength - this.numberOfVisibleItems)}%)`;
        console.log("translateX", this.sliderList.style.transform);
      }
  
      setTimeout(() => {
        this.sliderList.style.transition = 'none';
        this.currentItemIndex = 0;
        this.sliderList.style.transform = 'translateX(0%)';
        this.sliderList.style.transform = 'translateY(0%)'; // Reset for vertical layout as well
      }, 300);
    } else {
      this.sliderList.style.transition = 'transform 0.5s ease'; // Ensure transition is applied here as well
      if (isVertical) {
        this.sliderList.style.transform = `translateY(-${slideDimension * this.currentItemIndex}%)`;
      } else {
        this.sliderList.style.transform = `translateX(-${slideDimension * this.currentItemIndex}%)`;
      }
    }
  }
  
  
}

