$(document).ready(function () {
  $("a[href^='#']").on("click", function (e) {
    e.preventDefault();

    const target = $($(this).attr("href"));

    if (target.length) {
      $("html, body").animate(
        {
          scrollTop: target.offset().top,
        },
        800,
        "swing"
      );

      if ($("#app").data("vue").menuVisible) {
        $("#app").data("vue").closeMenu();
      }
    }
  });
});
