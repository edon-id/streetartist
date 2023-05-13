window.addEventListener("hashchange", handleRoute);
window.addEventListener("load", handleRoute);

function handleRoute() {
  const hash = location.hash;
  let allSections = document.querySelectorAll("section");
  allSections.forEach((element) => {
    element.style.display = "none";
  });

  switch (hash) {
    case "#landingPage":
      document.querySelector(hash).style.display = "block";
      initLandingPage();
      break;

    case "#artistHomePage":
      document.querySelector(hash).style.display = "block";
      initArtistHomePage();
      break;

    case "#artistItemsPage":
      document.querySelector(hash).style.display = "block";
      initartistItemsPage();
      break;

    case "#artistAddNewItemsPage":
      document.querySelector(hash).style.display = "block";
      initartistItemsPage();
      break;

    case "#captureImagePage":
      document.querySelector(hash).style.display = "block";
      initCaptureImagePage();
      break;

    case "#visitorHomePage":
      document.querySelector(hash).style.display = "block";
      initVisitorHomePage();
      break;

    case "#visitorListingPage":
      document.querySelector(hash).style.display = "block";
      initVisitorListingPage();
      break;

    case "#auctionPage":
      document.querySelector(hash).style.display = "block";
      initauctionPage();
      break;

    default:
      document.querySelector("#landingPage").style.display = "block";
      initLandingPage();
      break;
  }
}