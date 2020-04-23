export default function () {
  document.getElementById('sidebarMenu').style.transform = "translateX(0)";
  document.getElementById('sidebarMenu').style.transition = "transform 250ms ease-in-out";
  document.querySelector('div.menu-underlay').style.display = "block";
  document.querySelector('div.menu-underlay').style.pointerEvents = "auto";
  document.getElementById('sidebarMenu').addEventListener('transitionend', function (e) {
    e.target.style.transitionProperty = "none";
  });
  document.body.style.overflow = "hidden";
}