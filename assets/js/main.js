import { Utilis } from "./utilis.js";
import { UIUtilis } from "./UIutilis.js";
/*==================== Variables ====================*/
// recorder lib global variable
const { CanvasCapture } = window.CanvasCaptureLib;
let mp4Capture;
// Media variables
const THREE = window.MINDAR.FACE.THREE;
const photoQuality = 1;
const photoMimeType = "image/jpeg"; //"image/png"
let vidoMimeType = null;
let storeBlob = null;
let videoPreView = null;
let mediaRecorder = null;
let frameCount; // request animation frame count
let chunks = [];
let utilis = new Utilis(
  5,
  "./assets/audios/clock.wav",
  "./assets/audios/camera-shutter.mp3",
  "./assets/audios/camera-recdone.mp3",
  photoMimeType,
  photoQuality
);
let texture1 = new URL("../images/Face_Mask_Template.png", import.meta.url)
  .href;
let uIutilis = new UIUtilis();
// Water marker variables
let waterMarkerImageUrl = "";
let waterMarker = null;
let waterMarkerPosition = "left";
// selection type is photo ro video
let selectionType = "video";
// getting the value from api
let contentType = "";
let isDownload = "0";
let isShare = "0";
let currentExperience = "";
// mindar variables
let mindarThree;
let arType;
let arAssetPath;
let arAnchorIndex;
// squad selfie
const canvasHeight = 1920;
const canvasWidth = 1080;
const frameRate = 30;
let cameraStream = null;
let videoStreamBufferData = null;
let imageCaptureTime = 0;
let positionMarkerImageUrl = "";
let positionIndicator = null;
let selfieImageUrl = "";
let selfieImage = null;
let ssvideoPlayer = null;
let imageCaptureFlag = false;
let constraints = {
  audio: false,
  video: {
    facingMode: "user",
    width: {
      min: 640,
      ideal: 1280,
      max: 1920,
    },
    height: {
      min: 480,
      ideal: 720,
      max: 1080,
    },
  },
};
// timer
let min = 0;
let sec = 0;
let mobileOS = "";
let ismobile = false;
let downloadMsgAndroidVideo = "Video Downloaded. Please view it in the gallery";
let downloadMsgiOSVideo = "View your downloaded video in the Files app";
let downloadMsgAndroidPhoto = "Photo Downloaded. Please view it in the gallery";
let downloadMsgiOSPhoto = "View your downloaded photo in the Files app";
//JIO Checking Params
let JWT;
let experience;
let otpInput = "";
let log_parameter = "";
let format = "";
let otpEntered = "";
let userSelectedTeam = "";

const MP4_OPTIONS = {
  name: "fanisko-mp4",
  format: CanvasCapture.MP4,
  quality: 1,
  fps: frameRate,
  onExportProgress: (progress) =>
    console.log(`MP4 export progress: ${progress}.`),
  onExportFinish: () => console.log(`Finished MP4 export.`),
};

let selfie;
// Common functions
/*============== Desktop alert UI ============*/
function UIdesktopAlert() {
  document.querySelector("#app").innerHTML = `
        <div class="desktop-alert-title">
            You must be on a mobile device to use this experience
        </div>
    `;
}

/* =================== SNACKBAR ===================== */

function showSnackbar() {
  var x = document.getElementById("downloadedMsg");
  x.className = "show";
  setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, 5000);
}

/*==================== Selection ====================*/
function selection() {
  console.log("selection", selectionType);
  let photoBtn = document.getElementById("select--photo--btn");
  let videoBtn = document.getElementById("select--video--btn");
  if (selectionType == "photo") {
    photoBtn.style.borderBottom = "3px solid #FFF"; // thin
    videoBtn.style.borderBottom = "none";
    photoBtn.style.color = "#d9008d";
    videoBtn.style.color = "#FFF";
    document.getElementById("video-img").style.display = "none";
    document.getElementById("camera-img").style.display = "block";
  }
  if (selectionType == "video") {
    photoBtn.style.borderBottom = "none";
    videoBtn.style.borderBottom = "3px solid #FFF"; //thin
    videoBtn.style.color = "#d9008d";
    photoBtn.style.color = "#FFF";
    document.getElementById("video-img").style.display = "block";
    document.getElementById("camera-img").style.display = "none";
  }
}
/*============== Mobile browser detecting   ============*/
async function mobileDetection() {
  if (navigator.userAgent.match(/Android/i)) {
    mobileOS = "Android";
    ismobile = true;
  }
  if (navigator.userAgent.match(/iPhone/i)) {
    mobileOS = "iOS";
    ismobile = true;
  }
  if (navigator.userAgent.match(/iPad/i)) {
    mobileOS = "iOS";
    ismobile = true;
  }
  if (navigator.userAgent.match(/iPod/i)) {
    mobileOS = "iOS";
    ismobile = true;
  }
  if (navigator.userAgent.match(/webOS/i)) {
    mobileOS = "Web";
    ismobile = true;
  }
}
/*============== get platform information ============*/
function getPlatformInfo() {
  try {
    console.log(platform.os); // 'iOS 5.0'
    console.log(platform.name); // 'Safari'
    console.log(platform.version); // '5.1'
    console.log(platform.product); // 'iPad'
    console.log(platform.manufacturer); // 'Apple'
    console.log(platform.layout); // 'WebKit'
    console.log(platform.description); // 'Safari 5.1 on Apple iPad (iOS 5.0)'
  } catch (err) {
    console.log("err:" + err.message);
  }
}
/*==================== Selection buttons event listener ====================*/
function addselectionButtonEventListener() {
  document
    .getElementById("select--photo--btn")
    .addEventListener("click", () => {
      console.log("photo --> Selected");
      selectionType = "photo";
      selection();
    });
  if (mobileOS != "Android") {
    document
      .getElementById("select--video--btn")
      .addEventListener("click", () => {
        console.log("video --> Selected");
        selectionType = "video";
        selection();
      });
  }
}
/*==================== Capture button event listener ====================*/
function addCaptureButtonEventListener() {
  document
    .getElementById("capture--btn")
    .addEventListener("click", async () => {
      console.log("captureBtn --> Clicked");
      console.log(
        `selectionType --> ${selectionType} \ncontentType --> ${contentType}`
      );
      if (selectionType == "photo") {
        if (contentType == "ss") {
          positionIndicator.style.display = "block";
          utilis.countDown("countdown--view", function (output) {
            console.log(output);
            imageCaptureFlag = true;

            ssvideoPlayer.currentTime = 0;
            ssvideoPlayer.muted = true;
            ssvideoPlayer.autoplay = true;
            // playVideo()
            ssvideoPlayer.play();
            document.querySelector("#video--player").style.display = "block";
          });
        }
      } else {
        //startRecording();
        utilis.countDown("countdown--view", function (output) {
          console.log("in else addCaptureButtonEventListener", output);
          startRecording();
        });
      }
    });
}
/*==================== canvas video Recorder ====================*/
function videoRecorder() {
  console.log("in videoRecorder");
  let tempStream = null;
  if (contentType == "ss") {
    tempStream = SSrenderCanvas();
  }
  mp4Capture = CanvasCapture.beginVideoRecord(MP4_OPTIONS);
  CanvasCapture.init(tempStream, {
    showRecDot: true,
    showAlerts: true,
    showDialogs: true,
    verbose: false,
  });
  // mediaRecorder = new MediaRecorder(tempStream.captureStream(frameRate), {
  //   mimeType: vidoMimeType,
  // });
  // mediaRecorder.start(100); // collect 100ms of data blobs
  // // console.log(mediaRecorder.state);
  // console.log("recording --> Started");
  // mediaRecorder.onstop = function (e) {
  //   console.log("data available after MediaRecorder.stop() called.");
  //   //  if (vidoMimeType == "video/mp4;codecs=avc1,mp4a") {
  //   if (vidoMimeType == 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"') {
  //     videoPreView = new Blob(chunks, { type: "video/mp4" });
  //     storeBlob = videoPreView;
  //     chunks = [];

  //     //utilis.playRecDoneSound();
  //     previewUIupdate();
  //   } else {
  //     videoPreView = new Blob(chunks, { type: vidoMimeType });
  //     storeBlob = videoPreView;

  //     chunks = [];
  //     convertWebmtomp4();
  //   }
  //   // chunks = [];
  //   // previewUIupdate();
  //   console.log("recording -->  Completed");
  // };
  // mediaRecorder.ondataavailable = function (e) {
  //   chunks.push(e.data);
  // };
  // if (contentType == "ss") {
  //   ssvideoPlayer.currentTime = 0;
  //   ssvideoPlayer.muted = true;
  //   ssvideoPlayer.autoplay = true;

  //   //playVideo()
  //   ssvideoPlayer.play();
  // } else {
  //   /*===== set timeout to stop recording =====*/
  //   setTimeout(function () {
  //     stopRecording();
  //   }, 10000);
  // }
}

/*==================== Convert Webmtomp4 ====================*/
function convertWebmtomp4() {
  var count = 0;
  var p = Promise.resolve();
  var fn = (perc) => {
    p = p.then(
      () =>
        new Promise((resolve) =>
          $("#load-perc")
            .text(perc + "%")
            .delay(1000)
            .fadeIn("slow", resolve)
        )
    );
  };
  while (count < 100) {
    fn(count + 1);
    count++;
  }

  document.querySelector("#load--view").style.display = "block";
  document.querySelector(
    `#load--view`
  ).innerHTML = `<img style="width: 100%;" src="./assets/images/squad_selfie_loader.gif" />
    <div class="loader-percent">
        <img class="loading-svg" src="./assets/images/loading.svg" />
        <p id="load-perc"></p>
    </div>`;

  utilis.convertStreamstoMp4(storeBlob).then((onResolved, onRejected) => {
    if (onResolved != null) {
      storeBlob = onResolved;
      vidoMimeType = "video/mp4";
      // console.log('onResolved' + onResolved);
      document.querySelector("#load--view").style.display = "none";
      //    utilis.playRecDoneSound();
      previewUIupdate();
    }
    if (onRejected != null) {
      console.log("onRejected" + onRejected);
    }
  });
}
/*==================== canvas video Recorder start ====================*/
function startRecording() {
  console.log("startRecording");
  document.getElementById("show-1").style.display = "none";
  document.getElementById("rec-show").style.display = "flex";

  // let data1 = dataLayeraddon;
  // let data2 = {
  //   event: "select_option",
  //   page_title: "squad_selfie_record_video_page",
  //   match: userSelectedTeam,
  //   message: "start",
  // };
  // let data_push = Object.assign({}, data1, data2);
  // //console.log(data_push);
  // try {
  //   dataLayer.push(data_push);
  // } catch (error) {
  //   console.log(error);
  // }

  videoRecorder();
}
/*==================== canvas video Recorder stop ====================*/
function stopRecording() {
  if (mediaRecorder != null) {
    mediaRecorder.stop();
    window.cancelAnimationFrame(frameCount);
    frameCount = undefined;
    min = 0;
    sec = 0;
    // console.log(mediaRecorder.state);
    document.getElementById("rec-show").style.display = "none";
    console.log("recorder --> Stopped");
  }
}
/*==================== Squad selfie canvas prepare and draw ====================*/
function SSrenderCanvas() {
  console.log("SSrenderCanvas FN");
  const camera = document.getElementById("camera--view").querySelector("video");
  const player = document.getElementById("video--player");
  const hiddenCanvas = document.createElement("canvas");
  const watermark = document.getElementById("watermark");
  //document.getElementById("video--player").style.display = "unset !important";
  ssDraw();
  /*===== squad selfie Draw sub function used to draw on canvas =====*/
  function ssDraw() {
    hiddenCanvas.width = canvasWidth;
    hiddenCanvas.height = canvasHeight;
    let hctx = hiddenCanvas.getContext("2d");
    hctx.clearRect(0, 0, hiddenCanvas.width, hiddenCanvas.width); // draw empty view
    utilis.drawCameraView(hiddenCanvas, camera, constraints.video.facingMode); // draw camera view
    utilis.drawVideoPlayer(hiddenCanvas, player); // draw videoPlayer view
    utilis.drawWatermarkView(hiddenCanvas, watermark, waterMarkerPosition);
    frameCount = window.requestAnimationFrame(ssDraw);
    let timer = document.getElementById("video-time-1");
    timer.innerHTML = "00 : 0" + min;
    sec++;
    if (sec >= 60) {
      sec = 0;
      min++;
    }
    // console.log("requestAnimationFrame " + frameCount);
  }
  return hiddenCanvas;
}
/*==================== preview UI update ====================*/
function previewUIupdate() {
  if (videoPreView != null) {
    const objectURL = URL.createObjectURL(videoPreView);
    if (selectionType == "photo") {
      utilis.playCaptureSound();

      document.querySelector("#preview--video").style.display = "none";
      const temp = document.querySelector("#preview--image");
      temp.src = objectURL;
      temp.style.display = "block";
    }
    if (selectionType == "video") {
      utilis.playRecDoneSound();

      document.querySelector("#preview--image").style.display = "none";
      const temp = document.querySelector("#preview--video");
      temp.src = objectURL;
      temp.play();
      temp.style.display = "block";
    }
    document.querySelector("#preview--view").style.display = "block";
    document.querySelector("#camera--panel--view").style.display = "none";
    if (ssvideoPlayer != null) {
      ssvideoPlayer.currentTime = 0;
      ssvideoPlayer.pause();
    }
  }
}
/*==================== Share download buttons event listener ====================*/
function addShareDownloadButtonEventListener() {
  document.getElementById("share--btn").addEventListener("click", () => {
    if (selectionType == "photo") {
      format = "image";
    }
    if (selectionType == "video") {
      format = "video";
    }

    console.log("shareBtn --> Clicked");
    currentExperience = "share";
    utilis.shareDownload(
      storeBlob,
      selectionType,
      photoMimeType,
      vidoMimeType,
      "share"
    );
  });
  var mobile_input = document.querySelector("[name=mobile-no-user]");
  // var patt = new RegExp(mobile_input.getAttribute('pattern'));
  mobile_input.oninput = function (event) {
    $(".error-success-msg").hide();
    if (mobile_input.value.length === 10) {
      console.log("btn--enable");
      document.getElementById("proceed").classList.remove("disabled");
    } else {
      console.log("btn--disable");
    }
  };
  document.querySelector("#proceed").addEventListener("click", () => {
    //var mobile_otp = document.getElementById("user_mobileno").value;
    let data1 = dataLayeraddon;
    let data2 = {
      event: "proceed",
      page_title: "ss_gold_pass_enter_number_page",
      match: userSelectedTeam,
    };
    let data_push = Object.assign({}, data1, data2);
    //console.log(data_push);
    try {
      dataLayer.push(data_push);
    } catch (error) {
      console.log(error);
    }
    var user_mobile = document.getElementById("user_mobileno").value;
  });
  document.querySelector("#submit").addEventListener("click", () => {
    const o1 = document.querySelector(".t1").value;
    const o2 = document.querySelector(".t2").value;
    const o3 = document.querySelector(".t3").value;
    const o4 = document.querySelector(".t4").value;
    const o5 = document.querySelector(".t5").value;
    const o6 = document.querySelector(".t6").value;
    console.log(o1 + "" + o2 + "" + o3 + "" + o4 + "" + o5 + "" + o6);
    const otpInput = o1 + "" + o2 + "" + o3 + "" + o4 + "" + o5 + "" + o6;
    var user_mobile = document.getElementById("user_mobileno").value;
    var correlationId = localStorage.getItem("correlationId");
  });
  document.querySelector("#resendOTP").addEventListener("click", () => {
    var user_mobile = document.getElementById("user_mobileno").value;
  });
  document.querySelector("#close1").addEventListener("click", () => {
    document.getElementById("user_mobileno").value = "";
    document.getElementById("mobilePort").style.display = "none";
    document.querySelector("#preview--video").style.opacity = "1";
  });
  document.querySelector("#close2").addEventListener("click", () => {
    document.getElementById("user_mobileno").value = "";
    document.querySelectorAll(".tseries").value = "";
    document.getElementById("mobilePort").style.display = "none";
    document.querySelector("#preview--video").style.opacity = "1";
  });

  $(".otp-verify input:first-child").focus();
  $(".otp-verify input").on("input", function () {
    var input = $(this);
    if (input.val().length == input.attr("maxlength")) {
      input.next(".otp-verify input").focus();
    }
    if (input.is(":last-child") && input.val().length > 0) {
      document.getElementById("submit").classList.remove("disabled");
    }
  });

  // move focus to the previous OTP input field on backspace delete
  $(".otp-verify input").on("keydown", function (e) {
    var input = $(this);
    if (e.keyCode == 8 && input.val().length == 0) {
      input.prev(".otp-verify input ").focus();
    }
    if (input.is(":last-child") && input.val().length > 0) {
      document.getElementById("submit").classList.add("disabled");
    }
  });

  document.getElementById("port").addEventListener("click", () => {});
  document.getElementById("download--btn").addEventListener("click", () => {
    console.log("downloadBtn --> Clicked");
    currentExperience = "download";

    if (selectionType == "photo") {
      format = "image";
    }
    if (selectionType == "video") {
      format = "video";
    }

    utilis.shareDownload(
      storeBlob,
      selectionType,
      photoMimeType,
      vidoMimeType,
      "download"
    );
  });

  document.getElementById("share--btn").style.display = "none";
  document.getElementById("download--btn").style.display = "none";
}
/*==================== Squad selfie listerner ====================*/
function SSAddListener() {
  selection(); // vaidate the selection photo or video
  addselectionButtonEventListener();
  addCaptureButtonEventListener();
  addShareDownloadButtonEventListener();
  if (mobileOS == "Android") {
    document.getElementById("select--video--btn").style.display = "none";
  }
  // ============= INSTRUCTION SCREEN NAVIGATION ===================== //

  try {
    document.querySelector("#guidelineS1").addEventListener("click", () => {});
    document
      .getElementById("camera--switch--back")
      .addEventListener("click", () => {
        console.log("camera -- switchingBtn --> Clicked");

        constraints.video.facingMode = "environment";
        utilis.switchCamera("camera--view", cameraStream, constraints).then(
          (newStream) => {
            cameraStream = newStream;
          },
          (Failure) => {
            console.log("Failure" + Failure);
          }
        );
        document.querySelector("#guidelineS1").style.display = "none";
        document.getElementById("guidelineS2").style.display = "block";
      });
    document
      .getElementById("camera--switch--front")
      .addEventListener("click", () => {
        let data1 = dataLayeraddon;
        let data2 = {
          event: "select_option",
          page_title: "squad_selfie_source_page",
          match: userSelectedTeam,
          message: "front",
        };
        let data_push = Object.assign({}, data1, data2);
        //console.log(data_push);
        try {
          dataLayer.push(data_push);
        } catch (error) {
          console.log(error);
        }

        console.log("camera -- switchingBtnFront --> Clicked");
        document.querySelector("#guidelineS1").style.display = "none";
        document.getElementById("guidelineS2").style.display = "block";
      });
    document.querySelector(".Proceedbtn").addEventListener("click", () => {
      document.querySelector("#guidelineS2").style.display = "none";
      document.getElementById("show-1").style.display = "block";

      positionIndicator.style.display = "block";
    });
  } catch (error) {
    document.querySelector("#guidelineS1").style.display = "none";
    document.querySelector("#guidelineS2").style.display = "none";
    document.getElementById("show-1").style.display = "block";
  }

  document.getElementById("video--player").addEventListener("ended", () => {
    console.log("videoplayer --> Ended");
    if (selectionType == "video") {
      stopRecording();
    }
  });
  // listen on the event
  document
    .getElementById("video--player")
    .addEventListener("timeupdate", function () {
      if (selectionType == "photo" && imageCaptureFlag == true) {
        if (parseInt(this.currentTime) == imageCaptureTime) {
          ssvideoPlayer.pause();
          imageCaptureFlag = false;
          setTimeout(async function () {
            console.log("checking fn");
            utilis.captureFF(
              mindarThree,
              "",
              "selfie--Image",
              "watermark",
              waterMarkerPosition,
              function (blob) {
                videoPreView = blob;
                storeBlob = videoPreView;

                console.log(`SS -- image --> Captured`);
                previewUIupdate();
              }
            );
            // utilis.captureSS(
            //   "camera--view",
            //   mindarThree,
            //   "",
            //   "selfie--Image",
            //   "watermark",
            //   waterMarkerPosition,
            //   constraints,
            //   canvasWidth,
            //   canvasHeight,
            //   function (blob) {
            //     videoPreView = blob;
            //     storeBlob = videoPreView;

            //     console.log(`SS -- image --> Captured`);
            //     previewUIupdate();
            //   }
            // );
          }, 50);
        }
      }
    });
}
/*==================== json parser ====================*/
function jsonparser(url) {
  let http = new XMLHttpRequest();
  http.open("get", url, true);
  http.send();
  http.onload = function () {
    if (this.readyState == 4 && this.status == 200) {
      let jsonData = JSON.parse(this.responseText);
      for (var i = 0; i < jsonData.length; i++) {
        if (selfie == jsonData[i].selfie) {
          jsonData = jsonData[i];
        }
      }
      contentType = jsonData.contentType;
      utilis.getMediaRecorderSupportType(function (output) {
        vidoMimeType = output;
        console.log("mediaRecorderSupportType --> " + vidoMimeType);
      });
      if (contentType == "ss") {
        let url = utilis.supportsHEVCAlpha()
          ? jsonData.squareSelfie.movVideoUrl ?? ""
          : jsonData.squareSelfie.webmVideoUrl ?? "";
        console.log("getting url", url);
        positionMarkerImageUrl =
          jsonData.squareSelfie.positionMarkerImageUrl ?? "";
        selfieImageUrl = jsonData.squareSelfie.selfieImageUrl ?? "";
        console.log(`selfieImageUrl: ${selfieImageUrl}`);
        waterMarkerImageUrl = jsonData.squareSelfie.waterMarkerImageUrl ?? "";
        waterMarkerPosition = jsonData.squareSelfie.waterMarkerPosition ?? "";
        console.log(`waterMarkerPosition: ${waterMarkerPosition}`);
        imageCaptureTime = jsonData.squareSelfie.imageCaptureTime ?? "0";
        uIutilis.appRendersquadselfieUI();
        utilis.fixDisplayContainer("display--container", true);
        // utilis.getCamera("camera--view", constraints).then((newStream) => {
        //   cameraStream = newStream;
        //   utilis
        //     .downloadVideoStreamBuffer(url, "load--text")
        //     .then((response) => {
        //       var urlCreator = window.URL || window.webkitURL;
        //       videoStreamBufferData = urlCreator.createObjectURL(response);
        //       positionIndicator = document.querySelector(
        //         "#position--indicator"
        //       );
        //       positionIndicator.src = positionMarkerImageUrl;
        //       positionIndicator.style.display = "none";
        //       selfieImage = document.querySelector("#selfie--Image");
        //       selfieImage.src = selfieImageUrl;
        //       ssvideoPlayer = document.querySelector("#video--player");
        //       ssvideoPlayer.src = videoStreamBufferData;
        //       waterMarker = document.querySelector("#watermark");
        //       waterMarker.src = waterMarkerImageUrl;
        //       SSAddListener();
        //       document.querySelector("#load--view").style.display = "none";
        //     });
        // });

        // =========MIND-AR CODE ============
        mindarThree = new window.MINDAR.FACE.MindARThree({
          container: document.querySelector("#camera--view"),
          uiScanning: "no",
        });

        // Add any specific MindAR configurations or setup here

        const { renderer, scene, camera } = mindarThree;
        const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
        scene.add(light);

        const faceMesh = mindarThree.addFaceMesh();
        const texture = new THREE.TextureLoader().load(texture1);
        faceMesh.material.map = texture;
        faceMesh.material.transparent = true;
        faceMesh.material.needsUpdate = true;
        scene.add(faceMesh);
        const smallerWidth = 400; // Set your desired width
        const smallerHeight = 300; // Set your desired height
        renderer.setSize(smallerWidth, smallerHeight);
        const start = async () => {
          await mindarThree.start();
          renderer.setAnimationLoop(() => {
            // console.log(faceMesh.position, mindarThree);
            renderer.render(scene, camera);
          });
        };

        utilis
          .downloadVideoStreamBuffer(url, "load--text")
          .then(async (response) => {
            var urlCreator = window.URL || window.webkitURL;
            videoStreamBufferData = urlCreator.createObjectURL(response);
            positionIndicator = document.querySelector("#position--indicator");
            positionIndicator.src = positionMarkerImageUrl;
            positionIndicator.style.display = "none";
            selfieImage = document.querySelector("#selfie--Image");
            selfieImage.src = selfieImageUrl;
            ssvideoPlayer = document.querySelector("#video--player");
            ssvideoPlayer.src = videoStreamBufferData;
            waterMarker = document.querySelector("#watermark");
            waterMarker.src = waterMarkerImageUrl;
            SSAddListener();
            document.querySelector("#load--view").style.display = "none";
          });
        start();
      }
    }
  };
}

/* ============ LOAD TEXTURE ============*/

const loadTexture = (path) => {
  try {
    return new Promise((resolve, reject) => {
      const loader = new THREE.TextureLoader();
      loader.load(path, (texture) => {
        resolve(texture);
      });
    });
  } catch (e) {
    console.log("Loader error", e);
  }
};

/* ============ DOWNALOD CONVERT ===================== */

async function convertMp4(inblob) {
  const ffmpeg = createFFmpeg({ log: true });
  return new Promise(async (onResolved, onRejected) => {
    var aab;
    var fileReader = new FileReader();
    fileReader.onload = function () {
      aab = this.result;
    };
    fileReader.readAsArrayBuffer(inblob);

    await ffmpeg.load();

    ffmpeg.FS("writeFile", "video.webm", new Uint8Array(aab));
    await ffmpeg.run("-i", "video.webm", "output.mp4");
    console.log("ffmpeg running");
    const data = ffmpeg.FS("readFile", "output.mp4");
    if (data != null) {
      let newblob = new File([data.buffer], "test.mp4", {
        type: "video/mp4",
      });
      onResolved(newblob);
    } else {
      onRejected(null);
    }
  });
}

/*==================== Fetch data ====================*/
function fetchData() {
  try {
    mobileDetection();
    if (ismobile) {
      var urlParams = new URLSearchParams(window.location.search);
      selfie = urlParams.get("selfie");

      let localPath = `./jsons/ss.json`;
      console.log(CanvasCapture);
      jsonparser(localPath);
    } else {
      UIdesktopAlert();
    }
  } catch (err) {}
}
// /*================== MEDIA RECORDER ANIMATION LOOP ====================*/
function loop() {
  requestAnimationFrame(loop);
  if (CanvasCapture.isRecording()) CanvasCapture.recordFrame();
}
// /*==================== DOM ContentLoaded ====================*/
loop();
fetchData();
