function toggleMenu() {
  const icon = document.querySelector(".hamburger-icon");
  const nav = document.querySelector("#hamburger-nav");
  icon.classList.toggle("open");
  nav.classList.toggle("open");
}
