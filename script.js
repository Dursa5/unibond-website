const menu = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
menu?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menu.setAttribute("aria-expanded", open);
});
document.querySelectorAll(".nav a").forEach(a => a.addEventListener("click", () => {
  nav.classList.remove("open");
  menu?.setAttribute("aria-expanded", "false");
}));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, {threshold: 0.12});
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

const sections = [...document.querySelectorAll("main section[id]")];
const links = [...document.querySelectorAll(".nav a[href^='#']")];
const updateActive = () => {
  let current = "home";
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 160) current = section.id;
  });
  links.forEach(link => link.classList.toggle("active", link.getAttribute("href") === "#" + current));
};
window.addEventListener("scroll", updateActive, {passive:true});
updateActive();
