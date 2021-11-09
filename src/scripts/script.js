const $ = window.$;
const navbarMenu = $("#navbar-menu");
const hamburgerMenu = $("#hamburger-menu");
const hamburgerMenuLines = $("#hamburger-menu-lines");
const hamburgerMenuCross = $("#hamburger-menu-cross");

hamburgerMenu.click(() => {
    navbarMenu.toggleClass("menu-hidden");
    hamburgerMenuLines.toggleClass("display-none");
    hamburgerMenuCross.toggleClass("display-none");
});

