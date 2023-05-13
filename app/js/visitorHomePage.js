function initVisitorHomePage() {
  let myFistDiv = document.querySelector(".my-slider-content");
  let mySecondDiv = document.querySelector(".my-slider-content.left-right");
  const root = document.documentElement;

  const mySliderContent = document.querySelector("ul.my-slider-content");

  root.style.setProperty("--my-slider-elements", mySliderContent.children.length);

  function renderPicture(elDiv) {
    items.forEach((artist) => {
      let li = document.createElement("li");
      let a = document.createElement("a");
      a.href = "#visitorListingPage";
      let img = document.createElement("img");
      img.srcset = `${artist.image}`;
      a.append(img);
      li.append(a);
      elDiv.append(li);
    });
  }
  renderPicture(myFistDiv);
  renderPicture(mySecondDiv);
}