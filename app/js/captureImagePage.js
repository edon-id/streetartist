let imageData;

function initCaptureImagePage() {
  let localStorageNameAddNew = localStorage.getItem("logged in");
  document.querySelector(".capture-artist-name").innerText =
    localStorageNameAddNew;

  let video;
  let canvas;
  let image;
  let capturePhoto;
  let width;
  let height;
  let allVideoDevices;

  navigator.mediaDevices.enumerateDevices().then((data) => {
    allVideoDevices = data.filter((x) => x.kind === "videoinput");
  });

  function initCamera() {
    video = document.querySelector("#video");
    canvas = document.querySelector("#canvas");
    image = document.querySelector("#image");
    capturePhoto = document.querySelector("#capturePhoto");
    canvas.style.display = "none";
    const constrains = {
      audio: false,
      video: {
        width: 360,
        height: height,
        aspectRatio: { ideal: 1.33333 },
        facingMode: { ideal: "environment" },
      },
    };

    navigator.mediaDevices.getUserMedia(constrains).then((stream) => {
      video.srcObject = stream;
      capturePhoto.addEventListener("click", function () {
        const context = canvas.getContext("2d");
        context.drawImage(video, 0, 0, width, height);
        imageData = canvas.toDataURL("image/png");
        video.srcObject = stream;
        tracks = stream.getTracks();
        tracks[0].stop();
        image.src = imageData;
        video.srcObject = null;
        beforeImage.style.display = "block";
        location.hash = "#artistAddNewItemsPage";
      });
    });

    video.addEventListener("canplay", function () {
      height = video.videoHeight;
      width = video.videoWidth;
      video.setAttribute("width", width);
      video.setAttribute("height", height);
      canvas.setAttribute("width", width);
      canvas.setAttribute("height", height);
    });
  }

  initCamera();
}