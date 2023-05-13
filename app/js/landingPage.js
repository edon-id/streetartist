function initLandingPage() {
  let dropMenu = document.querySelector("#artist");
  dropMenu.innerHTML = "";

  let optionMenu = document.createElement("option");
  optionMenu.setAttribute("disabled", true);
  optionMenu.setAttribute("selected", true);
  optionMenu.innerHTML = `Choose`;
  dropMenu.append(optionMenu);

  fetch("https://jsonplaceholder.typicode.com/users")
    .then((res) => res.json())
    .then((artists) =>
      artists.forEach((artist) => {
        dropMenu.innerHTML += `<option value="${artist.name}">${artist.name}</option>`;
      })
    );

  dropMenu.addEventListener("change", function () {
    localStorage.setItem(
      "logged in",
      `${document.querySelector("#artist").value}`
    );
    location.hash = "#artistHomePage";
  });

  let visitorDiv = document.querySelector(".join-as-visitor");
  visitorDiv.addEventListener("click", function () {
    setTimeout(function () {
      localStorage.setItem("logged in", "Visitor");
      location.hash = "#visitorHomePage";
    }, 400);
  });
}

let filteredArtists = localStorage.getItem("logged in");