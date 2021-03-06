const PRODUCTION = true; // set to false if editing to use dev tools

function small() {
  return $(window).width() < 500 || $(window).height() < 500
}

$(function () {
  if ("ontouchstart" in document.documentElement) {
    $("body").prepend(
      "<h1 class='warning'>No touch screen devices allowed.</h1><p class='warning-text'>Or you could just press it. >:(</p>"
    );
  } else if (small()) {
    $("body").prepend(
      "<h1 class='warning'>Screen too small.</h1><p class='warning-text'>Too small, too bad.</p>"
    );
  } else {
    /* Stop context menu */
    $(document).contextmenu(function (e) {
      e.preventDefault();
    });
    /* Redirect dev tools */
    $(window).on("devtoolschange", function () {
      if (PRODUCTION) {
        $("html").empty();
        window.location.replace("/no.html");
      }
    });
    /* Add button */
    $("body").prepend("<button tabindex='-1'>Click me?</button>");
    /* Move button */
    $("button").mouseover(function () {
      $(this).css("transform", "none");
      $(this).animate(
        {
          left: Math.random() * ($(window).width() - $(this).width()) + "px",
          top: Math.random() * ($(window).height() - $(this).height()) + "px",
        },
        50
      );
      // $(this).css("font-size", parseFloat($(this).css("font-size")) + 1); // Grow it!
    });
    /* Reset button */
    $(window).resize(function () {
      $("button").css({
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      });
      if (small()) {
        $("button, .warning, .warning-text").remove();
        $("body").prepend(
          "<h1 class='warning'>Resized too small.</h1><p class='warning-text'>Tried to limit button movement?</p>"
        );
      }
    });
    /* Stop enter key and such */
    $(document).on("keypress", function (e) {
      e.preventDefault();
    });
    /* Button clicked */
    $("button").click(function () {
      alert("ive been clicked");
    });
  }
});
