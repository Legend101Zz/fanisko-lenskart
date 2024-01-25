class utilis {
  constructor(
    countVal,
    clockSoundFilePath,
    captureSoundFilePath,
    recdoneSoundFilePath,
    photoMimeType,
    photoCompressQuality
  ) {
    this.countValue = countVal;
    this.clockSoundFilePath = clockSoundFilePath;
    this.captureSoundFilePath = captureSoundFilePath;
    this.recdoneSoundFilePath = recdoneSoundFilePath;
    this.photoMimeType = photoMimeType;
    this.photoCompressQuality = photoCompressQuality;
  }

  /*============== Play audio ============*/
  async playSound(soundfile) {
    const sound = new Audio(soundfile);
    const promise = sound.play();
    if (promise !== undefined) {
      promise.then(() => {}).catch((error) => console.error);
    }
  }

  // Capture sound
  playCaptureSound() {
    this.playSound(this.captureSoundFilePath);
  }

  // Record done sound
  playRecDoneSound() {
    this.playSound(this.recdoneSoundFilePath);
  }

  /*============== Flash ============*/
  async flash(fashViewId) {
    const flashTime = 500 / 2;
    const flash = document.getElementById(fashViewId);
    flash.style.opacity = "1";
    setTimeout(function () {
      flash.style.opacity = "0";
    }, flashTime);
  }

  /*============== Count down ============*/
  countDown(countdownViewId, callback) {
    document.getElementById("show-1").style.display = "none";
    let timeleft = this.countValue;
    let soundFilePath = this.clockSoundFilePath;
    let playSound = this.playSound;
    let downloadTimer = setInterval(function () {
      if (timeleft <= -1) {
        clearInterval(downloadTimer);
        document.getElementById(countdownViewId).innerHTML = "";
        callback("counter --> Compeleted");
      } else {
        document.getElementById(countdownViewId).innerHTML = `${timeleft}`;
        playSound(soundFilePath);
      }
      timeleft -= 1;
    }, 1000);
  }

  /*============== Share or download the photo or video file ============*/
  shareDownload(blob, mediaType, photoMimeType, videoMimeType, type) {
    console.log(
      `photoMimeType: ${photoMimeType}, videoMimeType: ${videoMimeType}`
    );
    let getfileArray = generateFilenameAndFileType();

    console.log(`file: ${getfileArray[1]}, fileType: ${getfileArray[0]}`);
    if (type == "download") {
      download(getfileArray[1], blob);
    } else if (type == "share") {
      share(getfileArray[1], getfileArray[0], blob);
    }
    // Generate Random
    function generateRandom() {
      return (
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(23).substring(2, 5)
      );
    }

    // Generate file name base on type
    function generateFilenameAndFileType() {
      let tempFileType = "";
      let tempFileName = "";
      if (mediaType == "photo" && photoMimeType == "image/png") {
        tempFileType = photoMimeType;
        tempFileName = `${generateRandom()}.png`;
      } else if (mediaType == "photo" && photoMimeType == "image/jpeg") {
        tempFileType = photoMimeType;
        tempFileName = `${generateRandom()}.jpeg`;
        //   } else if ((mediaType == 'video') && (videoMimeType == "video/mp4;codecs=avc1,mp4a")) {
      } else if (
        mediaType == "video" &&
        videoMimeType == 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
      ) {
        tempFileType = videoMimeType;
        tempFileName = `${generateRandom()}.mp4`;
      } else if (mediaType == "video" && videoMimeType == "video/mpeg") {
        tempFileType = videoMimeType;
        tempFileName = `${generateRandom()}.mp4`;
      } else if (mediaType == "video" && videoMimeType == "video/mp4") {
        tempFileType = videoMimeType;
        tempFileName = `${generateRandom()}.mp4`;
      } else {
        tempFileType = videoMimeType;
        tempFileName = `${generateRandom()}.webm`;
      }
      return new Array(tempFileType, tempFileName);
    }

    // Share image or video file
    function share(fileName, fileType, inblob) {
      const file = new File([inblob], fileName, { type: fileType });
      const files = [file];

      console.log(
        `file Share: ${fileName}, fileType: ${fileType},BLOB: ${inblob}`
      );

      //console.log(`BLOB: `+tx)
      //window.AndroidShareHandler.share('${inblob}');

      //async (dispatch) => {
      //const text = await new Response(inblob).text()
      //console.log(`BLOB TEXT: ${text}`)
      //const base64Retur = await fetch(`data:image/jpeg;base64,${inblob}`);
      //const text = await base64Retur.text();
      //console.log(`BLOB TEXT: ${text}`)
      //};

      var reader = new FileReader();
      reader.readAsDataURL(inblob);
      reader.onloadend = function () {
        var base64data = reader.result;
        console.log(`BLOB TEXT: ${base64data}`);
        var s = base64data.substr(base64data.indexOf(",") + 1);
        window.AndroidShareHandler.share(s);
        console.log("" + base64data.substr(base64data.indexOf(",") + 1));
      };

      if (navigator.canShare && navigator.canShare({ files: files })) {
        navigator
          .share({
            files: files,
          })
          .then(() => console.log("Share was successful."))
          .catch((error) => console.log("Sharing failed", error));
      }
    }

    // Create download link image or video
    function download(fileName, inblob) {
      console.log("download");
      var reader = new FileReader();
      reader.readAsDataURL(inblob);
      reader.onloadend = function () {
        var base64data = reader.result;
        console.log(`BLOB TEXT: ${base64data}`);
        var s = base64data.substr(base64data.indexOf(",") + 1);
        window.AndroidShareHandler.download(s);
        console.log("" + base64data.substr(base64data.indexOf(",") + 1));
      };

      const a = document.createElement("a");
      a.style.display = "none";
      a.href = window.URL.createObjectURL(inblob);
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
      }, 10000);
    }
  }
  /*==============video convert ============*/
  convertStreamstoMp4(inblob) {
    return new Promise(async (onResolved, onRejected) => {
      // try {
      let worker = processInWebWorker();
      var aab;
      let buffersReady;
      var fileReader = new FileReader();
      fileReader.onload = function () {
        aab = this.result;
        postMessage();
      };
      fileReader.readAsArrayBuffer(inblob);
      worker.onmessage = function (event) {
        var message = event.data;
        if (message.type == "ready") {
          console.log("convert --> ready");
          if (buffersReady) postMessage();
        } else if (message.type == "stdout") {
          console.log(message.data);
        } else if (message.type == "start") {
          console.log("convert --> started");
        } else if (message.type == "done") {
          console.log("convert --> completed");
          console.log(JSON.stringify(message));
          let result = message.data[0];
          console.log(JSON.stringify(result));
          if (result != null) {
            let newblob = new File([result.data], "test.mp4", {
              type: "video/mp4",
            });
            onResolved(newblob);
          } else {
            onRejected(null);
          }
        }
        // console.log(JSON.stringify(blob));
      };

      function processInWebWorker() {
        // let workerPath = 'https://archive.org/download/ffmpeg_asm/ffmpeg_asm.js';
        // if (document.domain == 'localhost') {
        //     workerPath = location.href.replace(location.href.split('/').pop(), '') + 'assets/js/ffmpeg_asm.js';
        // }
        let workerPath =
          "https://archive.org/download/ffmpeg_asm/ffmpeg_asm.js";
        let blob = URL.createObjectURL(
          new Blob(
            [
              'importScripts("' +
                workerPath +
                '");var now = Date.now;function print(text) {postMessage({"type" : "stdout","data" : text});};onmessage = function(event) {var message = event.data;if (message.type === "command") {var Module = {print: print,printErr: print,files: message.files || [],arguments: message.arguments || [],TOTAL_MEMORY: message.TOTAL_MEMORY || false};postMessage({"type" : "start","data" : Module.arguments.join(" ")});postMessage({"type" : "stdout","data" : "Received command: " +Module.arguments.join(" ") +((Module.TOTAL_MEMORY) ? ".  Processing with " + Module.TOTAL_MEMORY + " bits." : "")});var time = now();var result = ffmpeg_run(Module);var totalTime = now() - time;postMessage({"type" : "stdout","data" : "Finished processing (took " + totalTime + "ms)"});postMessage({"type" : "done","data" : result,"time" : totalTime});}};postMessage({"type" : "ready"});',
            ],
            {
              type: "application/javascript",
            }
          )
        );

        let worker = new Worker(blob);
        URL.revokeObjectURL(blob);
        return worker;
      }

      var postMessage = function () {
        worker.postMessage({
          type: "command",
          // arguments: '-i video.webm -c:v mpeg4 -b:v 6400k -strict experimental output.mp4'.split(' '),
          // arguments: ["-i", "video.webm", "-codec", "copy", "-strict", "-2", "output.mp4"],
          arguments:
            "-i video.webm -fflags +genpts+igndts -r 30 -b:v 64k output.mp4".split(
              " "
            ),
          files: [
            {
              data: new Uint8Array(aab),
              name: "video.webm",
            },
          ],
        });
      };

      // } catch (err) {
      //     // console.error(err.message);
      //     onRejected(err.message);
      // }
    });
  }

  /*============== Download video stream buffer from url ============*/
  async downloadVideoStreamBuffer(url, containerId) {
    return new Promise(async (onResolved, onRejected) => {
      try {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
        xhr.responseType = "blob";

        xhr.addEventListener("progress", function (e) {
          let percent_complete = (e.loaded / e.total) * 100;
          console.log(percent_complete);
          //  document.querySelector(`#${containerId}`).innerHTML = `Loading ${parseInt(percent_complete)}%`;
        });
        xhr.send();

        xhr.onload = function () {
          return onResolved(xhr.response);
        };
      } catch (err) {
        // console.error(err.message);
        onRejected(err.message);
      }
    });
  }

  /*============== Get MediaRecorder SupportType ============*/
  getMediaRecorderSupportType(callback) {
    const types = [
      "video/webm",
      "video/webm;codecs=vp9,opus",
      "video/webm;codecs=vp9",
      "video/webm;codecs=vp8",
      "video/webm;codecs=daala",
      "video/webm;codecs=h264",
      "audio/webm;codecs=opus",
      "video/mpeg",
      'video/mp4; codecs="avc1.42E01E, mp4a.40.2"',
      // "video/mp4;codecs=avc1,mp4a",
    ];

    for (let i in types) {
      if (MediaRecorder.isTypeSupported(types[i])) {
        if (types[i] == 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"') {
          callback(types[i]);
        } else {
          callback("video/webm;codecs=H264");
        }
        break;
      }
    }
  }

  /*============== Fix display container ============*/
  fixDisplayContainer(containerId, enable) {
    const width = document.documentElement.clientWidth;
    const height = document.documentElement.clientHeight;

    const w_width = document.body.clientWidth;
    const w_height = document.body.clientHeight;

    console.log("w-" + w_width + ",h-" + w_height);

    console.log("screen", `${width}x${height}`);

    let container = document.getElementById(containerId);
    let newHeight = 0,
      newWidth = 0;

    newWidth = w_width;
    newHeight = w_height;

    /*      if (enable == true) {
            if (height / width <= 16 / 9) {
                newWidth = height * 0.565;
                newHeight = height;
                // console.log(`aspectRatio = 16/9`);
            } else {
                newWidth = width;
                newHeight = width * 1.77;
                // console.log(`aspectRatio`);
            }
        } else {
            newWidth = width;
            newHeight = height;
        } */
    console.log("new screen", `${newWidth}x${newHeight}`);

    //SKR
    //newHeight = 100;

    container.setAttribute(
      "style",
      `width: ${newWidth}px; height: ${newHeight}px`
    );
  }

  /*============== Supports HEVC Alpha ============*/
  supportsHEVCAlpha() {
    const navigator = window.navigator;
    const ua = navigator.userAgent.toLowerCase();
    const hasMediaCapabilities = !!(
      navigator.mediaCapabilities && navigator.mediaCapabilities.decodingInfo
    );
    const isSafari =
      ua.indexOf("safari") != -1 &&
      !(ua.indexOf("chrome") != -1) &&
      ua.indexOf("version/") != -1;

    return isSafari && hasMediaCapabilities;
  }

  /*============== Draw camera view  with scaling ============*/
  drawCameraView(canvas, camera, ARfilter, facingMode) {
    const hctx = canvas.getContext("2d");
    console.log("in draw fn", camera, ARfilter);
    const vw = camera.videoWidth;
    const vh = camera.videoHeight;
    const needsScale = vw < canvas.width;
    const scale = needsScale
      ? Math.min(canvas.width / vw, canvas.height / vh)
      : 1.0;
    const orX = needsScale ? canvas.width / 2 - (vw / 2) * scale : 0;
    const orY = needsScale ? canvas.height / 2 - (vh / 2) * scale : 0;
    hctx.save();
    // draw camera view
    if (facingMode == "user") {
      console.log("in draw fn hit1");
      hctx.scale(-1, 1);
      hctx.drawImage(camera, orX, orY, vw * scale * -1, vh * scale);
      // hctx.drawImage(ARfilter, 0, 0, 200, 200);
    } else {
      console.log("in draw fn hit1");
      hctx.drawImage(camera, orX, orY, vw * scale, vh * scale);
      // hctx.drawImage(ARfilter, 0, 0, 200, 200);
    }
    hctx.restore();
  }
  /*============== Draw video player view with scaling ============*/
  drawVideoPlayer(canvas, videoPlayer) {
    const hctx = canvas.getContext("2d");
    const vw = videoPlayer.videoWidth;
    const vh = videoPlayer.videoHeight;
    const needsScale = vw < canvas.width;
    const scale = needsScale
      ? Math.min(canvas.width / vw, canvas.height / vh)
      : 1.0;
    const orX = needsScale ? canvas.width / 2 - (vw / 2) * scale : 0;
    const orY = needsScale ? canvas.height / 2 - (vh / 2) * scale : 0;
    hctx.drawImage(videoPlayer, orX, orY, vw * scale, vh * scale);
  }

  /*============== Draw other view with scaling ============*/
  drawOtherView(canvas, view) {
    const hctx = canvas.getContext("2d");
    const vw = view.width;
    const vh = view.height;
    const needsScale = vw < canvas.width;
    const scale = needsScale
      ? Math.min(canvas.width / vw, canvas.height / vh)
      : 1.0;
    const orX = needsScale ? canvas.width / 2 - (vw / 2) * scale : 0;
    const orY = needsScale ? canvas.height / 2 - (vh / 2) * scale : 0;
    hctx.drawImage(view, orX, orY, vw * scale, vh * scale);
  }

  /*============== Draw banner view ============*/
  drawWatermarkView(canvas, view, position) {
    console.log(view);
    const hctx = canvas.getContext("2d");
    const padding = 30;
    let iw = view.width;
    let ih = view.height;
    console.log(`iw: ${iw}, ih: ${ih}`);
    let w_height_n = document.body.clientHeight;
    let orX = 0;
    let orY = 0;
    let neworY = 0;
    let standard_px = 220;
    switch (position) {
      // case "top":
      //     orY = 0;
      //     break;
      // case "bottom":
      //     orY = canvas.height - ih;
      //     break;
      // case "left":
      //     orX = 0
      //     break;
      // case "right":
      //     orX = canvas.width - iw;
      //     break;
      // default:
      //     break;

      case "top":
        orX = canvas.width / 2 - iw / 2;
        orY = 0;
        break;
      case "bottom":
        // TEST
        let new_pos_1 = canvas.height / 3;
        console.log("new_pos" + new_pos_1);
        new_pos_1 = new_pos_1 + standard_px;
        console.log("new_pos-100" + new_pos_1);
        let orrY_1 = canvas.height - new_pos_1;

        console.log("Canvas" + new_pos_1);
        console.log("Canvas_Y" + orrY_1);
        //--------

        orX = canvas.width / 2 - iw / 2;
        //orY = canvas.height - ih;
        let new_pos = w_height_n / 3;
        console.log("new_pos" + new_pos);
        new_pos = new_pos + 800;
        console.log("new_pos-100" + new_pos);
        let orrY = w_height_n - new_pos;
        console.log("orY" + orrY);
        console.log(orX);
        console.log(orY);
        orY = new_pos;
        break;
      case "topleft":
        orX = padding;
        orY = padding;
        break;
      case "topright":
        orX = canvas.width - iw - padding;
        orY = padding;
        break;
      case "bottomleft":
        orX = padding;
        orY = canvas.height - ih - padding;
        break;
      case "bottomright":
        orX = canvas.width - iw - padding;
        orY = canvas.height - ih - padding;
        break;
      default:
        break;
    }
    console.log(`ix: ${orX}, iy: ${orY}, iw: ${iw}, ih: ${ih}`);
    hctx.drawImage(view, orX, orY, iw, ih);
  }

  /*===== Access the device camera and stream to cameraView =====*/
  async getCamera(cameraViewId, constraints) {
    return new Promise(async (onResolved, onRejected) => {
      try {
        let All_mediaDevices = navigator.mediaDevices;
        if (!All_mediaDevices || !All_mediaDevices.getUserMedia) {
          console.log("getUserMedia() not supported.");
          onRejected("getUserMedia() not supported.");
        }
        All_mediaDevices.getUserMedia(constraints).then(function (vidStream) {
          let video = document.getElementById(cameraViewId);
          let factor = constraints.video.facingMode == "user" ? "-1" : "1";
          // video.style.webkitTransform = "scaleX(" + factor + ")";
          video.style.transform = "scaleX(" + factor + ")";
          video.srcObject = vidStream;
          video.onloadedmetadata = (event) => {
            video.play();
          };
          return onResolved(vidStream);
        });
      } catch (err) {
        // console.error(err.message);
        onRejected(err.message);
      }
    });
  }

  /*===== Switching camera mode front & back =====*/
  async switchCamera(cameraViewId, stream, constraints) {
    return new Promise(async (onResolved, onRejected) => {
      try {
        // stop the current video stream
        if (stream != null && stream.active) {
          var tracks = stream.getVideoTracks();
          tracks.forEach((track) => {
            track.stop();
          });
        }
        // set the video source to null
        document.getElementById(cameraViewId).srcObject = null;
        // get new media stream
        this.getCamera(cameraViewId, constraints).then(
          (newStream) => {
            return onResolved(newStream);
          },
          (Failure) => {
            // console.log("Failure" + Failure);
            onRejected(Failure);
          }
        );
      } catch (err) {
        // console.error(err.message);
        onRejected(err.message);
      }
    });
  }

  /*===== Capture the squad selfie =====*/
  async captureSS(
    cameraViewId,
    mindar,
    videoPlayerId,
    selfieImageId,
    watermarkId,
    position,
    constraints,
    canvasWidth,
    canvasHeight,
    callback
  ) {
    let PMimeType = this.photoMimeType;
    let PCompressQuality = this.photoCompressQuality;
    await this.flash("flash");
    const hiddenCanvas = document.createElement("canvas");
    const camera = document.getElementById(cameraViewId).querySelector("video");
    const ARfilter = document
      .getElementById(cameraViewId)
      .querySelector("canvas");
    //  const player = document.getElementById(videoPlayerId);
    const watermark = document.getElementById(watermarkId);
    hiddenCanvas.width = canvasWidth;
    hiddenCanvas.height = canvasHeight;
    let hctx = hiddenCanvas.getContext("2d");
    hctx.clearRect(0, 0, hiddenCanvas.width, hiddenCanvas.width); // draw empty view
    // this.drawCameraView(
    //   hiddenCanvas,
    //   camera,
    //   mindar,
    //   constraints.video.facingMode
    // );
    this.drawCameraView(
      hiddenCanvas,
      camera,
      ARfilter,
      constraints.video.facingMode
    ); // draw camera view
    if (videoPlayerId != "") {
      const player = document.getElementById(videoPlayerId);
      this.drawVideoPlayer(hiddenCanvas, player); // draw videoPlayer view
    }
    if (selfieImageId != "") {
      const layer = document.getElementById(selfieImageId);
      this.drawOtherView(hiddenCanvas, layer);
    }
    this.drawWatermarkView(hiddenCanvas, watermark, position);
    const tempBlob = await new Promise((resolve) =>
      hiddenCanvas.toBlob(resolve, PMimeType, PCompressQuality)
    );
    callback(tempBlob);
  }

  /*===== Capture the face filter =====*/
  async captureFF(
    mindarThree,
    videoPlayerId,
    selfieImageId,
    watermarkId,
    position,
    callback
  ) {
    let PMimeType = this.photoMimeType;
    let PCompressQuality = this.photoCompressQuality;
    await this.flash("flash");
    const { video, renderer, scene, camera } = mindarThree;
    const renderCanvas = renderer.domElement;
    const watermark = document.getElementById(watermarkId);
    // output canvas
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = renderCanvas.width;
    canvas.height = renderCanvas.height;

    const sx =
      (((video.clientWidth - renderCanvas.clientWidth) / 2) *
        video.videoWidth) /
      video.clientWidth;
    const sy =
      (((video.clientHeight - renderCanvas.clientHeight) / 2) *
        video.videoHeight) /
      video.clientHeight;
    const sw = video.videoWidth - sx * 2;
    const sh = video.videoHeight - sy * 2;

    context.drawImage(video, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
    renderer.preserveDrawingBuffer = true;
    renderer.render(scene, camera); // empty if not run
    context.drawImage(renderCanvas, 0, 0, canvas.width, canvas.height);
    renderer.preserveDrawingBuffer = false;
    if (videoPlayerId != "") {
      const player = document.getElementById(videoPlayerId);
      this.drawVideoPlayer(canvas, player); // draw videoPlayer view
    }
    if (selfieImageId != "") {
      const layer = document.getElementById(selfieImageId);
      this.drawOtherView(canvas, layer);
    }
    this.drawWatermarkView(canvas, watermark, position);
    const tempBlob = await new Promise((resolve) =>
      canvas.toBlob(resolve, PMimeType, PCompressQuality)
    );
    callback(tempBlob);
  }
}
export { utilis as Utilis };
