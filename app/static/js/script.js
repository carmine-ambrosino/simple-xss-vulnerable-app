document.addEventListener("DOMContentLoaded", function () {
  var links = document.querySelectorAll(".mostraSezione");
  var sections = document.querySelectorAll(".sezione");
  var navBar = document.getElementById("nav-bar");
  var navContent = document.getElementById("nav-content");
  var isNavOpen = false; // Variable to keep track of menu state

  // Handle click on nav-bar to toggle nav-content
  navBar.addEventListener("click", function () {
    if (isNavOpen) {
      navContent.style.display = "none";
      isNavOpen = false;
    } else {
      navContent.style.display = "block";
      isNavOpen = true;
    }
  });

  // Handle click on each section link
  links.forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();

      // Hide all sections
      sections.forEach(function (section) {
        section.style.display = "none";
      });

      // Show only the section corresponding to the clicked link
      var targetId = this.getAttribute("href").substring(1); // Remove the '#' character from the id
      var targetSection = document.getElementById(targetId);

      // Hide the presentation-screen and show the section
      if (targetSection) {
        document.getElementById("presentation-screen").style.display = "none";
        targetSection.style.display = "block";
      }

      // Close nav-content if it's open
      if (isNavOpen) {
        navContent.style.display = "none";
        isNavOpen = false;
      }
    });
  });

  // Close nav-content when clicking anywhere else on the page
  document.addEventListener("click", function (event) {
    if (
      !navBar.contains(event.target) &&
      !navContent.contains(event.target) &&
      isNavOpen
    ) {
      navContent.style.display = "none";
      isNavOpen = false;
    }
  });
});
