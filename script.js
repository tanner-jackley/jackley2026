function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  const nav = document.querySelector("#hamburger-nav");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
  nav.classList.toggle("open");
}
