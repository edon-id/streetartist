function initArtistHomePage() {
  document.querySelector(".canvas-div").innerHTML = "";
  let myCanvas = document.createElement("canvas");
  myCanvas.setAttribute("id", "myCanvas");
  document.querySelector(".canvas-div").append(myCanvas);

  let liveAuctionDiv = document.querySelector(".live-auction-div");
  const canvas = document.querySelector("#myCanvas");

  if (localStorage.getItem("liveAution") == "true") {
    canvas.height = 310;
    liveAuctionDiv.style.display = "block";
  } else {
    liveAuctionDiv.style.display = "none";
    canvas.height = 430;
  }

  let localStorageName = localStorage.getItem("logged in");
  let artistName = document.querySelector(".artist-name");
  artistName.innerText = localStorageName;

  filteredArtists = items.filter((name) => name.artist == localStorageName);

  let itemsSold = filteredArtists.filter((item) => item.dateSold !== "");

  let totalItemSold = document.querySelector(".number-of-items-sold");
  totalItemSold.innerText = `${itemsSold.length} of ${filteredArtists.length}`;

  let sum = 0;

  filteredArtists.forEach((el) => {
    let priceSold = parseInt(el.priceSold);
    if (!isNaN(priceSold)) {
      sum = priceSold + sum;
    }
  });
  let itemSold = document.querySelector(".money-income");
  itemSold.innerText = `$${sum}`;

  const dateLabels = generateDates(new Date(), 7);

  const data = {
    labels: dateLabels,
    datasets: [
      {
        label: "Amount",
        backgroundColor: "rgb(161, 106, 94)",
        borderColor: "rgb(161, 106, 94)",
        data: [],
        barThickness: 20,
      },
    ],
  };

  const config = {
    type: "bar",
    data: data,
    options: {
      indexAxis: "y",
    },
  };
  const myChart = new Chart(canvas, config);
  const last7 = document.querySelector("#last7");
  const last14 = document.querySelector("#last14");
  const last30 = document.querySelector("#last30");

  const filteredItems = items.filter(
    (item) => item.artist === localStorageName && item.priceSold
  );

  const newLabels = generateDates(new Date(), 7);
  myChart.data.labels = newLabels;
  const newData = newLabels.map((label) => {
    let sum = 0;
    filteredItems.forEach((item) => {
      if (formatDate(item.dateSold) === label) {
        sum += item.priceSold;
      }
    });
    return sum;
  });
  myChart.data.datasets[0].data = newData;
  myChart.update();
  newData.push(data.datasets[0].data);

  last7.addEventListener("click", function () {
    myChart.data.datasets[0].barThickness = 25;

    const newLabels = generateDates(new Date(), 7);
    myChart.data.labels = newLabels;

    const newData = newLabels.map((label) => {
      let sum = 0;
      filteredItems.forEach((item) => {
        if (formatDate(item.dateSold) === label) {
          sum += item.priceSold;
        }
      });
      return sum;
    });

    myChart.data.datasets[0].data = newData;
    myChart.update();
  });

  last14.addEventListener("click", function () {
    myChart.data.datasets[0].barThickness = 15;

    const newLabels = generateDates(new Date(), 14);
    myChart.data.labels = newLabels;

    const newData = newLabels.map((label) => {
      let sum = 0;
      filteredItems.forEach((item) => {
        if (formatDate(item.dateSold) === label) {
          sum += item.priceSold;
        }
      });
      return sum;
    });

    myChart.data.datasets[0].data = newData;
    myChart.update();
  });

  last30.addEventListener("click", function () {
    myChart.data.datasets[0].barThickness = 10;

    const newLabels = generateDates(new Date(), 30);
    myChart.data.labels = newLabels;

    const newData = newLabels.map((label) => {
      let sum = 0;
      filteredItems.forEach((item) => {
        if (formatDate(item.dateSold) === label) {
          sum += item.priceSold;
        }
      });
      return sum;
    });

    myChart.data.datasets[0].data = newData;
    myChart.update();
  });
}