// Hamburger-menu function - toggle oncklick
function hamburger(hamburger_menu) {
    hamburger_menu.classList.toggle("change");
}


$(document).ready(function() {
    $(".button").click(function() {
        $("nav").animate({
            height: 'toggle',
            width: 'toggle'
        }, "fast");
    });
});