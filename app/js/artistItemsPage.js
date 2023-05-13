let myTextArea = document.querySelector("textarea")
let myTitleInput = document.querySelector("#title")
let myUrlInput = document.querySelector("#url")
let myPriceInput = document.querySelector("#price")
let myCheckBox = document.querySelector('#gridCheck1')
let cancelBtn = document.querySelector(".cancelBtn")
let captureImageDiv = document.querySelector(".wrapper")
let auctioningMoneyIncome = document.querySelector(".auctioning-money-income")
localStorage.setItem("artistFirstLog", "0")
let beforeImage = document.querySelector(".before-image")
let selectOptions = document.querySelector("#exampleFormControlSelect1");
let optionMenuArtistItemsPage = document.createElement("option")
optionMenuArtistItemsPage.setAttribute('disabled',true)
optionMenuArtistItemsPage.setAttribute('value',"")
optionMenuArtistItemsPage.setAttribute('selected',true)
optionMenuArtistItemsPage.innerHTML = `Choose`
selectOptions.append(optionMenuArtistItemsPage)
let myIdx

  itemTypes.forEach((paintings) => {
    selectOptions.innerHTML += `<option value='${paintings}'>${paintings}</option>`;
  });

  if (localStorage.getItem("bonusCard")) {
    items.push(JSON.parse(localStorage.getItem("bonusCard")))
     };

 const src = beforeImage.getAttribute('src');

 function initartistItemsPage (){
 
  let itemWrapperDiv = document.querySelector(".item-wrapper")
  itemWrapperDiv.innerHTML = ""
  let localStorageNameAddNew =  localStorage.getItem("logged in")
  document.querySelector(".artist-items-name").innerText = localStorageNameAddNew
    let artistNameAddNew = localStorage.getItem("logged in")
    document.querySelector(".artist-name-add-new").innerText = artistNameAddNew
    if (localStorage.getItem("artistFirstLog") === "0") {
    filteredArtists = items.filter(name => name.artist === localStorageNameAddNew)
      localStorage.setItem("artistFirstLog", "1")
  } 
 
filteredArtists.forEach(function (artist,idx) {
  let myItemCard = document.createElement("div")
  myItemCard.classList.add("itemCards","col-sm-12","col-md-12", "col-lg-6", "col-xl-4" ,"mb-lg-4")
  let myitemImg = document.createElement("img");
  myitemImg.classList.add("itemImg");
  myitemImg.src = artist.image;
  let itemDescriptionDiv = document.createElement("div");
  itemDescriptionDiv.classList.add("itemDescription");
  let h6 = document.createElement("h6");
  h6.innerText = artist.title;
  let small = document.createElement("small");
  small.innerText = artist.dateCreated.toLocaleString("en-GB").slice(0, 10);
  let p = document.createElement("p");
  p.innerText = artist.description;
  let span = document.createElement("span");
  span.innerText = "$ " + artist.price;
  let itemButtonsDiv = document.createElement("div");
  itemButtonsDiv.classList.add("itemButtons");
  let btnAuction = document.createElement("button");
  btnAuction.classList.add("btn", "btnAuction");
  btnAuction.innerText = "Sent To Auction";

  let btnPubishUnpublish = document.createElement("button");
  if (artist.isPublished === true) {
    btnPubishUnpublish.classList.add("btn", "btnPublish");
    btnPubishUnpublish.innerText = "Unpublish";
  } else {
    btnPubishUnpublish.classList.add("btn", "btnUnpublish");
    btnPubishUnpublish.innerText = "Publish";
  }

  let btnRemove = document.createElement("button");
  btnRemove.classList.add("btn", "btnRemove");
  btnRemove.innerText = "Remove";
  btnRemove.setAttribute("value", artist.id)

  let btnEdit = document.createElement("button");
  btnEdit.classList.add("btn", "btnEdit");
  btnEdit.innerText = "Edit";
  btnEdit.setAttribute("value", artist.id)

     btnAuction.addEventListener("click", function(){
      artist.isAuctioning = true;
      localStorage.setItem("item for auction", JSON.stringify(artist))
      localStorage.setItem("timer for auction", "120")
      localStorage.setItem("auctionBtnClicked", "0")
      localStorage.setItem("liveAuction", "true")

      if (localStorage.getItem("dataIsBidding") === "false") {
        biddingUl.innerHTML = ""
        }

      localStorage.setItem("dataIsBidding", "true")
      auctioningMoneyIncome.innerText= `$${artist.price}`

      let allauctionBtn = document.querySelectorAll(".btnAuction")
      allauctionBtn.forEach(element => {
        element.setAttribute('disabled',true)  
      });
        location.hash = "#auctionPage"
  })

  btnPubishUnpublish.addEventListener("click", function () {
    if (btnPubishUnpublish.innerText === "Unpublish") {
      btnPubishUnpublish.innerText = "Publish";
      btnPubishUnpublish.style.backgroundColor = "#1BAC6F";
      btnPubishUnpublish.style.color = "#FCEBD5";
      artist.isPublished = false;
    } else {
      btnPubishUnpublish.innerText = "Unpublish";
      btnPubishUnpublish.style.backgroundColor = "#E5E5E5";
      btnPubishUnpublish.style.color = "#5A5A5A";
      artist.isPublished = true;
    }
  });

  btnRemove.addEventListener("click", function () {
    let myConfirm = "Are you sure you want to delete this card";
    if (confirm(myConfirm) == true) {
      myConfirm = "You pressed OK!";
      myitemImg.remove();
      itemDescriptionDiv.remove();
      itemButtonsDiv.remove();
      myItemCard.remove()
      let idToRemove = artist.id
      filteredArtists.splice(idToRemove,1);     
     } else {
      myConfirm = "You canceled!";
    }
  });



  btnEdit.addEventListener("click", function () {
    
    if (artist.isPublished === true) {
      document.querySelector("#gridCheck1").checked = true;
    } else {
      document.querySelector("#gridCheck1").checked = false;
    }

    myTitleInput.value = `${artist.title}`;
    myTextArea.value = `${artist.description}`;
    myPriceInput.value = `${artist.price}`;
    myUrlInput.value = `${artist.image}`;
    selectOptions.value = `${artist.type}`;
    beforeImage.src = myUrlInput.value
    myIdx = filteredArtists.indexOf(artist)
    beforeImage.style.display = "block"
    location.hash = `#artistAddNewItemsPage`;
  });
  itemButtonsDiv.append(btnAuction, btnPubishUnpublish, btnRemove, btnEdit);
  itemDescriptionDiv.append(h6, small, p, span);
  myItemCard.append(myitemImg, itemDescriptionDiv, itemButtonsDiv,)
  itemWrapperDiv.append( myItemCard);


});

    captureImageDiv.addEventListener("click", function (){
      location.hash = "#captureImagePage"
    })


    let allAuctionBtn = document.querySelectorAll(".btnAuction") 
    
      if (localStorage.getItem("timer for auction") > "0") {
        allAuctionBtn.forEach(element => {
          element.setAttribute('disabled',true)  
         });
      } 
}

cancelBtn.addEventListener("click", function(){
  beforeImage.style.display = "none"
  myTitleInput.value = "";
  myTextArea.value = "";
  myPriceInput.value = "";
  myUrlInput.value = "";
  selectOptions.value = "";
  myIdx = undefined;
  console.log(myIdx)
  location.hash = "#artistItemsPage"
})

let myForm = document.querySelector(".add-new-item-form")
myForm.addEventListener("submit", function(event,idx){
  event.preventDefault()
   
  if(myTitleInput.value === "") {
    return alert("Please fill the Title input")
  } 
  
  if (myPriceInput.value === "") {
    return alert("Please fill the Price input")
  }
  
  if (selectOptions.value === "") {
    return alert("Please fill Type input")
  }  
  
  beforeImage.style.display = "block"


  if (!src) {
    beforeImage.style.display = "none"
  } else {
    beforeImage.style.display = "block"
  }

function Object() {
    this.title = myTitleInput.value,
    this.description = myTextArea.value,
    this.type = selectOptions.value
    this.image = imageData, 
    this.image = imageData || myUrlInput.value, 
    this.price = parseInt(myPriceInput.value),
    this.artist = localStorage.getItem("logged in"),
    this.dateCreated = new Date().toLocaleDateString("en-GB").slice(0, 10),
    this.isPublished = "",
    this.isAuctioning = false,
    this.dateSold = "",
    this.priceSold = ""

}
const myObject = new Object();

console.log(myObject)

    if (myCheckBox.checked) {
      myObject.isPublished = true 
    } else {
      myObject.isPublished = false 
    }
    
  if (typeof myIdx !== "undefined") {
    filteredArtists.splice(myIdx, 1, myObject);
     myIdx = undefined;
  } else {
    filteredArtists.push(myObject);
    items.push(myObject)
    localStorage.setItem("bonusCard", JSON.stringify(myObject))  
  }

      myForm.reset()
      location.hash = `#artistItemsPage`
      event.stopImmediatePropagation()

    })

  beforeImage.style.display = 'none'