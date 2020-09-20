export default function() {
  if (window.matchMedia("(max-width: 767px)").matches) {
    document.getElementById('sidebarMenu').style.transform = "translateX(-250px)";
    document.getElementById('sidebarMenu').style.transition = "transform 250ms ease-in-out";
    document.querySelector('div.menu-underlay').style.display = "none";
    document.querySelector('div.menu-underlay').style.pointerEvents = "none";
    document.getElementById('sidebarMenu').addEventListener('transitionend', function (e) {
      e.target.style.transitionProperty = "none";
    }); 
    document.body.style.overflow = "visible";
  }
}