$(document).ready(function(){
    $(".burger-menu").click(function(){
        $(".menu").toggleClass("show");
    });
});

$(window).scroll(function() {
    if ($(window).width() > 768) {
        // $(".navbar").css("position", "fixed");
        $(".menu").removeClass("show"); // Hide menu when scrolling on larger screens
    }
});