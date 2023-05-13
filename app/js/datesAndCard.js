function generateDates(start, daysAgo) {
  let arr = [];

  for (let i = 0; i < daysAgo; i++) {
    const startDate = new Date(start);
    const currentDate = startDate.setDate(new Date(start).getDate() - i);
    const formattedDate = formatDate(currentDate);
    arr.push(formattedDate);
  }
  return arr;
}

function formatDate(date) {
  return new Date(date).toLocaleDateString("en-GB");
}

function createCard(artist, className) {
  let itemWrapperDiv = document.createElement("div");
  itemWrapperDiv.classList.add(className);
  itemWrapperDiv.classList.add(
    "col-sm-12",
    "col-md-12",
    "col-lg-6",
    "col-xl-4",
    "mb-lg-4"
  );
  
  let myitemImg = document.createElement("img");
  myitemImg.classList.add("itemImg");
  myitemImg.style.backgroundImage = `url(${artist.image})`;
  let itemDescriptionDiv = document.createElement("div");
  itemDescriptionDiv.classList.add("itemDescription");
  let h2 = document.createElement("h2");
  h2.innerText = artist.artist;
  let h6 = document.createElement("h6");
  h6.innerText = artist.title;
  let p = document.createElement("p");
  p.innerText = artist.description;
  let span = document.createElement("span");
  span.innerText = "$ " + artist.price;
  itemDescriptionDiv.append(h2, h6, p, span);
  itemWrapperDiv.append(myitemImg, itemDescriptionDiv);
  visitorsItemWrapper.append(itemWrapperDiv);
}