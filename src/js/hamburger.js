// Hamburger-menu function - toggle button animation
function hamburger(hamburger_menu) {
    hamburger_menu.classList.toggle("change");
}

// Hamburger-menu toggle menu animation
$(document).ready(function() {
    $(".button").click(function() {
        $("nav").animate({
            height: 'toggle',
            width: 'toggle'
        }, "fast");
    });
});