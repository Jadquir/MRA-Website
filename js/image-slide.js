window.addEventListener("load",()=>{

  const list = document.querySelectorAll(".slider");

  list.forEach((element) => {
    let currentSlide = 0;
    let imageCount = element.querySelectorAll(".slider-image");
    let images = element.querySelector(".images");
    let interval = element.dataset.interval ?? 4500;
  
    function getWidth() {
      return element.querySelector(".slider-image").offsetWidth;
    } 
    function refresh() {
      images.style.transform = `translateX(-${currentSlide * getWidth()}px)`;
    }
  
    function nextSlide() {
      if (currentSlide === imageCount.length - 1) {
        currentSlide = 0;
      } else {
        currentSlide++;
      }
      images.style.transform = `translateX(-${currentSlide * getWidth()}px)`;
    }
  
    function previousSlide() {
      if (currentSlide === 0) {
        currentSlide = imageCount.length - 1;
      } else {
        currentSlide--;
      }
      images.style.transform = `translateX(-${currentSlide * getWidth()}px)`;
    }
  
    if(imageCount.length == 1){
      return;
    }

    window.addEventListener("resize",refresh);
    setInterval(() => {
      nextSlide();
    }, interval);
  });
  
})
;
