let timer = document.querySelector(".timer");
let forRendering = document.querySelector(".for-rendering");
let biddingAmountInput = document.querySelector("#biddingAmountInput");
let biddingBtn = document.querySelector("#biddingBtn");
let divForBidding = document.querySelector(".div-for-bidding");
localStorage.setItem("auctionBtnClicked", "0");
let biddingUl = document.createElement("ul");
biddingUl.classList.add("text-center", "list-unstyled");
let divForRender;
let secondsCounter;
let minutes = 0;
let seconds = 0;

function initauctionPage() {
  forRendering.innerHTML = "";
  let localStorageName = localStorage.getItem("logged in");
  let artistNameAuction = document.querySelector(".artist-name-auction");
  divForRender = JSON.parse(localStorage.getItem("item for auction"));

  if (localStorage.getItem("logged in") === "Visitor") {
    if (localStorage.getItem("liveAuction") === "true") {
      biddingAmountInput.value = Math.ceil(
        divForRender.price / 2 + parseInt(1)
      );
    }

    biddingBtn.removeAttribute("disabled");

    if (localStorage.getItem("dataIsBidding") === "false") {
      biddingBtn.setAttribute("disabled", true);
    }
  } else {
    artistNameAuction.innerText = localStorageName;
    biddingBtn.setAttribute("disabled", true);
  }

  if (localStorage.getItem("item for auction")) {
    let myitemImg = document.createElement("img");
    myitemImg.classList.add("itemImg");
    myitemImg.style.backgroundImage = `url(${divForRender.image})`;
    let itemDescriptionDiv = document.createElement("div");
    itemDescriptionDiv.classList.add("itemDescription");
    let h6 = document.createElement("h6");
    h6.innerText = divForRender.title;
    let small = document.createElement("small");
    small.innerText = divForRender.dateCreated.slice(0, 10);
    let p = document.createElement("p");
    p.innerText = divForRender.description;
    let span = document.createElement("span");
    span.innerText = "$ " + divForRender.price;
    itemDescriptionDiv.append(h6, small, p, span);
    forRendering.append(myitemImg, itemDescriptionDiv);

    if (localStorage.getItem("auctionBtnClicked") === "0") {
      let counter = window.localStorage.getItem("timer for auction");
      secondsCounter = parseInt(counter);
      let myTimer = setInterval(function () {
        minutes = Math.floor(secondsCounter / 60);
        seconds = secondsCounter % 60;
        secondsCounter = secondsCounter - 1;
        window.localStorage.setItem("timer for auction", secondsCounter);
        if (localStorage.getItem("timer for auction") >= "0") {
          timer.innerText = `${minutes} min : ${seconds} sec`;
        } else if (minutes === 0 && seconds === 0) {
          timer.innerText = `Bidding is over `;
          let allAuctionBtn = document.querySelectorAll(".btnAuction");
          divForRender.dateSold = new Date()
            .toLocaleDateString("en-GB")
            .slice(0, 10);
          allAuctionBtn.forEach((element) => {
            element.removeAttribute("disabled");
          });
          localStorage.setItem("auctionBtnClicked", "0");
          localStorage.setItem("artistFirstLog", "1");
          localStorage.setItem("timer for auction", "0");
          localStorage.setItem("dataIsBidding", "false");
          localStorage.removeItem("liveAuction");
          clearInterval(myTimer);
        }
      }, 1000);

      localStorage.setItem("auctionBtnClicked", "1");
      biddingBtn.addEventListener("click", onBiddingClick);
    }
  }
}

function onBiddingClick() {
  if (localStorage.getItem("timer for auction") > "0") {
    let myAmount = biddingAmountInput.value;
    if (myAmount > divForRender.price / 2) {
      let biddingLi = document.createElement("li");
      biddingLi.classList.add("myBid");
      biddingLi.innerHTML = `Your Bid: $ ${myAmount}`;
      biddingUl.prepend(biddingLi);
      divForBidding.appendChild(biddingUl);
      fetch("https://projects.brainster.tech/bidding/api", {
        method: "POST",
        body: JSON.stringify({ myAmount }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.isBidding) {
            secondsCounter = parseInt(secondsCounter) + parseInt(60);
            let biddingLi = document.createElement("li");
            biddingLi.classList.add("hisBid");
            biddingLi.innerHTML = `Current Bid: $ ${data.bidAmount}`;
            biddingUl.prepend(biddingLi);
            biddingAmountInput.value = `${data.bidAmount + 50}`;
            divForRender.priceSold = data.bidAmount;
            auctioningMoneyIncome.innerText = `$${data.bidAmount}`;
          } else {
            let biddingLi = document.createElement("li");
            biddingLi.classList.add("biddingDone");
            biddingLi.innerText = "Bidding is done";
            biddingUl.prepend(biddingLi);
            divForRender.dateSold = new Date()
              .toLocaleDateString("en-GB")
              .slice(0, 10);
            divForRender.isAuctioning = false;
            auctioningMoneyIncome.innerText = "Bidding is over";
            biddingAmountInput.value = "";
            localStorage.setItem("dataIsBidding", "false");
            biddingBtn.setAttribute("disabled", true);
          }
        });
    } else {
      alert(
        `The minimum bid is ${Math.ceil(divForRender.price / 2 + parseInt(1))}`
      );
    }
  }
}