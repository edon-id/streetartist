let localStorageName = localStorage.getItem("logged in");
let visitorsItemWrapper = document.querySelector(".visitors-item");
let visitorFilterPage = document.querySelector(".visitor-filter-page");
let filterTitle = document.querySelector("#filterTitle");
let filteredByArtists = document.querySelector("#filteredControlSelect");
let submitFilterIcon = document.querySelector(".submit-filter-icon");
let cancelFilterIcon = document.querySelector(".cancel-filter-icon");
let minPrice = document.querySelector("#minPrice");
let maxPrice = document.querySelector("#maxPrice");
let paintingType = document.querySelector("#paintingType");
let filterIcon = document.querySelector(".filterIcon");
let myTitle;
let myFilterArtists;
let myMaxPrice;
let myMinPrice;
let myType;

filterIcon.addEventListener("click", function () {
  visitorFilterPage.classList.toggle("filter-move");
  localStorage.setItem("InFilteredItemsMenu", "in");
});

filteredByArtists.innerHTML = "";

let optionMenuFilteredArtist = document.createElement("option");
optionMenuFilteredArtist.setAttribute("disabled", true);
optionMenuFilteredArtist.setAttribute("value", "");
optionMenuFilteredArtist.setAttribute("selected", true);
optionMenuFilteredArtist.innerHTML = `Choose`;
filteredByArtists.append(optionMenuFilteredArtist);

fetch("https://jsonplaceholder.typicode.com/users")
  .then((res) => res.json())
  .then((artist) =>
    artist.forEach((el) => {
      filteredByArtists.innerHTML += `<option value='${el.name}'>${el.name}</option>`;
    })
  );

paintingType.innerHTML = "";

let optionMenuFilteredByType = document.createElement("option");
optionMenuFilteredByType.setAttribute("disabled", true);
optionMenuFilteredByType.setAttribute("value", "");
optionMenuFilteredByType.setAttribute("selected", true);
optionMenuFilteredByType.innerHTML = `Choose`;
paintingType.append(optionMenuFilteredByType);

itemTypes.forEach((paintings) => {
  paintingType.innerHTML += `<option value='${paintings}'>${paintings}</option>`;
});

let isPublishedFilteretArtist = items.filter((el) => el.isPublished === true);

function initVisitorListingPage() {
  visitorsItemWrapper.innerHTML = "";
  if (localStorage.getItem("InFilteredItemsMenu")) {
    let filtered = isPublishedFilteretArtist.filter(
      (item) =>
        (myTitle ? item.title.includes(myTitle) : true) &&
        (myMinPrice ? item.price >= myMinPrice : true) &&
        (myMaxPrice ? item.price <= myMaxPrice : true) &&
        (myFilterArtists ? item.artist.includes(myFilterArtists) : true) &&
        (myType ? item.type.includes(myType) : true)
    );
    filtered.forEach((artist, idx) => {
      if (idx % 2 == 0) {
        createCard(artist, "evenDiv");
      } else {
        createCard(artist, "oddDiv");
      }
      localStorage.setItem("something", "else");
    });
  } else {
    isPublishedFilteretArtist.forEach((artist, idx) => {
      if (idx % 2 == 0) {
        createCard(artist, "evenDiv");
      } else {
        createCard(artist, "oddDiv");
      }
    });
  }
  localStorage.removeItem("InFilteredItemsMenu");
}

submitFilterIcon.addEventListener("click", function () {
  myTitle = filterTitle.value;
  myFilterArtists = filteredByArtists.value;
  myMaxPrice = maxPrice.value;
  myMinPrice = minPrice.value;
  myType = paintingType.value;
  visitorFilterPage.classList.toggle("filter-move");
  initVisitorListingPage();
});

cancelFilterIcon.addEventListener("click", function () {
  visitorFilterPage.classList.toggle("filter-move");
});