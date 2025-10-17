
function onloadWindow(){
  
  const toggleButton = document.querySelector(".nav-toggle");
  const navBar =  document.querySelector(".primary-navigation");
  const menuIcon =  document.querySelector("#hamburger");
  const header =  document.querySelector(".primary-header");
  
  toggleButton.addEventListener("click",()=>{
      const isVisible = navBar.getAttribute("data-visible");
      const newVal = isVisible === "false" ?  "true" : "false";
  
      menuIcon.className = isVisible === "false" ?  "animate" : "";
      navBar.setAttribute("data-visible",newVal);
      header.setAttribute("data-visible",newVal);
      toggleButton.setAttribute("aria-expanded",newVal);
  });
}  
function checkScroll(){
  var scrollPosition = window.scrollY;
  var container = document.querySelector('#navContainer');
  if (container) {
    if (scrollPosition > 20 && !container.classList.contains('open')) {
      container.classList.add('open');
    } else if(scrollPosition <= 20) {
      container.classList.remove('open');
    }
  }
}

window.addEventListener('scroll', checkScroll);
window.addEventListener('load', onloadWindow);
// const circle = document.querySelector('.circle');
// const downloadBtn = document.querySelector('.download-btn');
// downloadBtn.addEventListener('click', () => {
//   const svg = new Blob([circle.outerHTML], {type: 'image/svg+xml'});
//   const url = URL.createObjectURL(svg);
//   const link = document.createElement('a');
//   link.href = url;
//   link.download = 'circle.svg';
//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
//   URL.revokeObjectURL(url);
// });


const footer = document.querySelector("footer");

footer.innerHTML = `This website is made by Jadquir. Copyright &copy; ${new Date().getFullYear()}. All rights reserved.`
