const subcollapsibles = document.querySelectorAll(".sub-collapsible__header");
subcollapsibles.forEach((item) =>
  item.addEventListener("click", function () {
    this.classList.toggle("sub-collapsible--open");
  })
);
