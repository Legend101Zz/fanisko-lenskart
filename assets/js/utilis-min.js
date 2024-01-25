class utilis {
    constructor(e, t, a, i, o, s) {
        (this.countValue = e), (this.clockSoundFilePath = t), (this.captureSoundFilePath = a), (this.recdoneSoundFilePath = i), (this.photoMimeType = o), (this.photoCompressQuality = s);
    }
    async playSound(e) {
        let t = new Audio(e),
            a = t.play();
        void 0 !== a && a.then(() => {}).catch((e) => console.error);
    }
    playCaptureSound() {
        this.playSound(this.captureSoundFilePath);
    }
    playRecDoneSound() {
        this.playSound(this.recdoneSoundFilePath);
    }
    async flash(e) {
        let t = document.getElementById(e);
        (t.style.opacity = "1"),
            setTimeout(function () {
                t.style.opacity = "0";
            }, 250);
    }
    countDown(e, t) {
        document.getElementById("show-1").style.display = "none";
        let a = this.countValue,
            i = this.clockSoundFilePath,
            o = this.playSound,
            s = setInterval(function () {
                a <= -1 ? (clearInterval(s), (document.getElementById(e).innerHTML = ""), t("counter --> Compeleted")) : ((document.getElementById(e).innerHTML = `${a}`), o(i)), (a -= 1);
            }, 1e3);
    }
    shareDownload(e, t, a, i, o) {
        console.log(`photoMimeType: ${a}, videoMimeType: ${i}`);
        let s,
            n,
            r =
                ((s = ""),
                (n = ""),
                "photo" == t && "image/png" == a
                    ? ((s = a), (n = `${d()}.png`))
                    : "photo" == t && "image/jpeg" == a
                    ? ((s = a), (n = `${d()}.jpeg`))
                    : "video" == t && 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"' == i
                    ? ((s = i), (n = `${d()}.mp4`))
                    : "video" == t && "video/mpeg" == i
                    ? ((s = i), (n = `${d()}.mp4`))
                    : "video" == t && "video/mp4" == i
                    ? ((s = i), (n = `${d()}.mp4`))
                    : ((s = i), (n = `${d()}.webm`)),
                [s, n]);
        function d() {
            return Math.random().toString(36).substring(2, 15) + Math.random().toString(23).substring(2, 5);
        }
        function l(e, t) {
            let a = document.createElement("a");
            (a.style.display = "none"),
                (a.href = window.URL.createObjectURL(t)),
                (a.download = e),
                document.body.appendChild(a),
                a.click(),
                setTimeout(() => {
                    document.body.removeChild(a);
                }, 1e4);
        }
        console.log(`file: ${r[1]}, fileType: ${r[0]}`),
            "download" == o
                ? l(r[1], e)
                : "share" == o &&
                  (function e(t, a, i) {
                      let o = new File([i], t, { type: a }),
                          s = [o];
                      navigator.canShare && navigator.canShare({ files: s })
                          ? navigator
                                .share({ files: s, text: "" })
                                .then(() => console.log("Share was successful."))
                                .catch((e) => console.log("Sharing failed", e))
                          : l(t, i);
                  })(r[1], r[0], e);
    }
    convertStreamstoMp4(e) {
        return new Promise(async (t, a) => {
            let i,
                o,
                s =
                    ((i = URL.createObjectURL(
                        new Blob(
                            [
                                'importScripts("https://jiowebar.fanisko.com/fanisko-ar-share/assets/js/ffmpeg_asm.js");var now = Date.now;function print(text) {postMessage({"type" : "stdout","data" : text});};onmessage = function(event) {var message = event.data;if (message.type === "command") {var Module = {print: print,printErr: print,files: message.files || [],arguments: message.arguments || [],TOTAL_MEMORY: message.TOTAL_MEMORY || false};postMessage({"type" : "start","data" : Module.arguments.join(" ")});postMessage({"type" : "stdout","data" : "Received command: " +Module.arguments.join(" ") +((Module.TOTAL_MEMORY) ? ".  Processing with " + Module.TOTAL_MEMORY + " bits." : "")});var time = now();var result = ffmpeg_run(Module);var totalTime = now() - time;postMessage({"type" : "stdout","data" : "Finished processing (took " + totalTime + "ms)"});postMessage({"type" : "done","data" : result,"time" : totalTime});}};postMessage({"type" : "ready"});',
                            ],
                            { type: "application/javascript" }
                        )
                    )),
                    (o = new Worker(i)),
                    URL.revokeObjectURL(i),
                    o),
                n;
            var r,
                d = new FileReader();
            (d.onload = function () {
                (r = this.result), l();
            }),
                d.readAsArrayBuffer(e),
                (s.onmessage = function (e) {
                    var i = e.data;
                    if ("ready" == i.type) console.log("convert --> ready"), n && l();
                    else if ("stdout" == i.type) console.log(i.data);
                    else if ("start" == i.type) console.log("convert --> started");
                    else if ("done" == i.type) {
                        console.log("convert --> completed"), console.log(JSON.stringify(i));
                        let o = i.data[0];
                        (console.log(JSON.stringify(o)), null != o) ? t(new File([o.data], "test.mp4", { type: "video/mp4" })) : a(null);
                    }
                });
            var l = function () {
                s.postMessage({ type: "command", arguments: "-i video.webm -fflags +genpts+igndts -movflags +faststart -r 30 -b:v 128k output.mp4".split(" "), files: [{ data: new Uint8Array(r), name: "video.webm" }] });
            };
        });
    }
    async downloadVideoStreamBuffer(e, t) {
        return new Promise(async (t, a) => {
            try {
                var i = new XMLHttpRequest();
                i.open("GET", e, !0),
                    i.setRequestHeader("Access-Control-Allow-Origin", "*"),
                    (i.responseType = "blob"),
                    i.addEventListener("progress", function (e) {
                        let t = (e.loaded / e.total) * 100;
                        console.log(t);
                    }),
                    i.send(),
                    (i.onload = function () {
                        return t(i.response);
                    });
            } catch (o) {
                a(o.message);
            }
        });
    }
    getMediaRecorderSupportType(e) {
        let t = [
            "video/webm",
            "video/webm;codecs=vp9,opus",
            "video/webm;codecs=vp9",
            "video/webm;codecs=vp8",
            "video/webm;codecs=daala",
            "video/webm;codecs=h264",
            "audio/webm;codecs=opus",
            "video/mpeg",
            'video/mp4; codecs="avc1.42E01E, mp4a.40.2"',
        ];
        for (let a in t)
            if (MediaRecorder.isTypeSupported(t[a])) {
                e('video/mp4; codecs="avc1.42E01E, mp4a.40.2"' == t[a] ? t[a] : "video/webm;codecs=vp9,opus");
                break;
            }
    }
    fixDisplayContainer(e, t) {
        let a = document.documentElement.clientWidth,
            i = document.documentElement.clientHeight;
        console.log("screen", `${a}x${i}`);
        let o = document.getElementById(e),
            s = 0,
            n = 0;
        !0 == t ? (i / a <= 16 / 9 ? ((n = 0.565 * i), (s = i)) : ((n = a), (s = 1.77 * a))) : ((n = a), (s = i)), console.log("new screen", `${n}x${s}`), o.setAttribute("style", `width: ${n}px; height: ${s}px`);
    }
    supportsHEVCAlpha() {
        let e = window.navigator,
            t = e.userAgent.toLowerCase(),
            a = !!(e.mediaCapabilities && e.mediaCapabilities.decodingInfo),
            i = -1 != t.indexOf("safari") && !(-1 != t.indexOf("chrome")) && -1 != t.indexOf("version/");
        return i && a;
    }
    drawCameraView(e, t, a) {
        let i = e.getContext("2d"),
            o = t.videoWidth,
            s = t.videoHeight,
            n = o < e.width,
            r = n ? Math.min(e.width / o, e.height / s) : 1,
            d = n ? e.width / 2 - (o / 2) * r : 0,
            l = n ? e.height / 2 - (s / 2) * r : 0;
        i.save(), "user" == a ? (i.scale(-1, 1), i.drawImage(t, d, l, -(o * r * 1), s * r)) : i.drawImage(t, d, l, o * r, s * r), i.restore();
    }
    drawVideoPlayer(e, t) {
        let a = e.getContext("2d"),
            i = t.videoWidth,
            o = t.videoHeight,
            s = i < e.width,
            n = s ? Math.min(e.width / i, e.height / o) : 1,
            r = s ? e.width / 2 - (i / 2) * n : 0,
            d = s ? e.height / 2 - (o / 2) * n : 0;
        a.drawImage(t, r, d, i * n, o * n);
    }
    drawOtherView(e, t) {
        let a = e.getContext("2d"),
            i = t.width,
            o = t.height,
            s = i < e.width,
            n = s ? Math.min(e.width / i, e.height / o) : 1,
            r = s ? e.width / 2 - (i / 2) * n : 0,
            d = s ? e.height / 2 - (o / 2) * n : 0;
        a.drawImage(t, r, d, i * n, o * n);
    }
    drawWatermarkView(e, t, a) {
        let i = e.getContext("2d"),
            o = t.width,
            s = t.height,
            n = 0,
            r = 0;
        switch (a) {
            case "top":
                (n = e.width / 2 - o / 2), (r = 0);
                break;
            case "bottom":
                (n = e.width / 2 - o / 2), (r = e.height - s);
                break;
            case "topleft":
                (n = 30), (r = 30);
                break;
            case "topright":
                (n = e.width - o - 30), (r = 30);
                break;
            case "bottomleft":
                (n = 30), (r = e.height - s - 30);
                break;
            case "bottomright":
                (n = e.width - o - 30), (r = e.height - s - 30);
        }
        console.log(`ix: ${n}, iy: ${r}, iw: ${o}, ih: ${s}`), i.drawImage(t, n, r, o, s);
    }
    async getCamera(e, t) {
        return new Promise(async (a, i) => {
            try {
                let o = navigator.mediaDevices;
                (o && o.getUserMedia) || (console.log("getUserMedia() not supported."), i("getUserMedia() not supported.")),
                    o
                        .getUserMedia(t)
                        .then(function (i) {
                            let o = document.getElementById(e),
                                s = "user" == t.video.facingMode ? "-1" : "1";
                            return (
                                (o.style.transform = "scaleX(" + s + ")"),
                                (o.srcObject = i),
                                (o.onloadedmetadata = (e) => {
                                    o.play();
                                }),
                                a(i)
                            );
                        })
                        .catch((e) => {
                            console.log("e:", e);
                        });
            } catch (s) {
                console.error(s.message);
            }
        });
    }
    async switchCamera(e, t, a) {
        return new Promise(async (i, o) => {
            try {
                null != t &&
                    t.active &&
                    t.getVideoTracks().forEach((e) => {
                        e.stop();
                    }),
                    (document.getElementById(e).srcObject = null),
                    this.getCamera(e, a).then(
                        (e) => i(e),
                        (e) => {
                            o(e);
                        }
                    );
            } catch (s) {
                o(s.message);
            }
        });
    }
    async captureSS(e, t, a, i, o, s, n, r, d) {
        let l = this.photoMimeType,
            h = this.photoCompressQuality;
        await this.flash("flash");
        let c = document.createElement("canvas"),
            p = document.getElementById(e),
            g = document.getElementById(i);
        (c.width = n), (c.height = r);
        if ((c.getContext("2d").clearRect(0, 0, c.width, c.width), this.drawCameraView(c, p, s.video.facingMode), "" != t)) {
            let m = document.getElementById(t);
            this.drawVideoPlayer(c, m);
        }
        if ("" != a) {
            let u = document.getElementById(a);
            this.drawOtherView(c, u);
        }
        this.drawWatermarkView(c, g, o);
        let w = await new Promise((e) => c.toBlob(e, l, h));
        d(w);
    }
    async captureFF(e, t, a, i) {
        let o = this.photoMimeType,
            s = this.photoCompressQuality;
        await this.flash("flash");
        let { video: n, renderer: r, scene: d, camera: l } = e,
            h = r.domElement,
            c = document.getElementById(t),
            p = document.createElement("canvas"),
            g = p.getContext("2d");
        (p.width = h.width), (p.height = h.height);
        let m = (((n.clientWidth - h.clientWidth) / 2) * n.videoWidth) / n.clientWidth,
            u = (((n.clientHeight - h.clientHeight) / 2) * n.videoHeight) / n.clientHeight,
            w = n.videoWidth - 2 * m,
            y = n.videoHeight - 2 * u;
        g.drawImage(n, m, u, w, y, 0, 0, p.width, p.height), (r.preserveDrawingBuffer = !0), r.render(d, l), g.drawImage(h, 0, 0, p.width, p.height), (r.preserveDrawingBuffer = !1), this.drawWatermarkView(p, c, a);
        let f = await new Promise((e) => p.toBlob(e, o, s));
        i(f);
    }
}
export { utilis as Utilis };
