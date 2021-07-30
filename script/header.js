const navbar = document.getElementById("navbar");
const burger = document.getElementById("burger");

burger.addEventListener("click", ()=> {
    navbar.classList.toggle("showElement");
});