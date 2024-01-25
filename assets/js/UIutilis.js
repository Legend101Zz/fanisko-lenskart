class uiutilis {
  constructor() {}
  /*============== appRender squadselfie view UI ============*/
  appRendersquadselfieUI() {
    document.querySelector("#app").innerHTML = `
        <div id="display--container">
            <!-- Camera view -->
            <div id="camera--view"></div>
            <!-- Position indicator -->
            <img id="position--indicator"/>
            <!-- Videoplayer -->
            <video id="video--player" style="display: none;" muted playsinline></video>
            <video id="video--player-c" muted playsinline></video>
            <!--<video id="video--player" muted preload="auto" controls playsinline></video> -->
             <!-- selfie image -->
            <img id="selfie--Image" style="display: none;"/>
            <!-- Watermark-->
            <img id="watermark" />
            <!-- Title view -->
            <div id="title--view" style="display: none;">Lenskart</div>
            <div class="lk-logo-view"><img src="./assets/images/lk-logo.png" /></div>
            <!-- Countdown view -->
            <div id="countdown--view"></div>
            <!-- Flash -->
            <div id="flash"></div>
            ${this.UICameraControlSS()}
            ${this.UIPreview()}
        </div>
        ${this.UIloadingView()}
        `;
  }
  /*============== Loading view UI ============*/
  UIloadingView() {
    return `
            <!-- Loading view -->
            <div id="load--view" style="opacity: 1;">
                <div id="n-load" class="loader-with-text">
                <img style="width: 100%;" src="./assets/images/loader.gif" />
            </div>
            </div>
        `;
  }

  /*============== Camera control UI Squad selfie  ============*/
  UICameraControlSS() {
    return `
        <!-- Camera selection view -->
        <div id="camera--panel--view">
            <div id="guidelineS1" class="document" style="display: none;">
            <div class="content1">
                <h1 style="text-transform: uppercase; font-size: 14px;">Please select a camera to use</h1>
                <ul class="lr-struct">
                    <li id="camera--switch--back" class="back-camera">
                        <span class="inin">
                            <img src="./assets/images/Vector.svg" />
                        </span>
                        <span class="camera-text">Rear Camera :</span>
                        <span>Ask a friend to Record your experiences</span>
                    </li>
                    <li id="camera--switch--front" class="rear-camera">
                        <span class="inin">
                            <img src="./assets/images/Vector-1.svg" />
                        </span>
                        <span class="camera-text">Front Camera :</span>
                        <span>Place on Surface and Record Yourself</span>
                    </li>
                </ul>
            </div>
            </div>
            <div id="guidelineS2" class="document" style="display: none;">
                    <div class="content1">
                        <h1>GUIDELINES</h1>
                        <ul class="bullet">
                            <li>Please mind your surroundings.</li>
                            <li>Please stay 3 feet away.</li>
                            <li>Make sure to keep your phone stable.</li>
                        </ul>
                        <div class="Proceedbtn">
                            <p>&nbsp;</p>
                            <span id="fmeet" class="button button--wayra">Proceed</span>
                            <p>&nbsp;</p>
                        </div>
                    </div>
            </div>

            <!-- Start of Camera Controls -->
                <ul id="show-1" class="controls" style="display: block;">
                    <div class="photo-video-selecton-block" style="display: none;">
                        <p id="select--photo--btn" class="choose-type">Photo</p>
                        <p id="select--video--btn" class="choose-type" style="display: none;">Video</p>
                    </div>
                    <li id="captureBtn" class="camera--capture">
                    </li>
                    <li id="capture--btn" class="camera--rec">
                    <!--<div class="circle"></div>-->
                        <button id="camera-img" class="icon-files"></button>
                        
                        <img id="video-img" class="icon-files" style="display: none;" src="./assets/images/video-record.png" />
                    <li id="camera--capture--start" class="camera--rec" style="display: none;">
                    <div class="circle"></div>
                    </li>
                    <li class="cameraSwitchBtn" style="display: none;"></li>
                </ul>
                <ul id="rec-show" style="display: none;">
                    <li id="myDIV" style="color:rgb(255, 255, 255); visibility: visible;">
                    <button class="Rec button1">Recording</button>Rec
                    </li>
                    <li class="capture-btn-11">
                        <!--<div class="recording-circle"></div>-->
                        <img id="record-btn" class="record-img" src="./assets/images/stop-btn.png" />
                    </li>

                    <li id="video-time-1" class="camera-switch-btn-1">00:00 </li>
                    <!-- <button id="camera--capture"></button>
                    <button id="camera--rec"></button> -->
                </ul>


        </div>
        `;
  }

  /*============== Preview UI ============*/
  UIPreview() {
    return `
         <div id="final-experience-loader" class="final-experience-loader" style="display: none;">
            <div class="loader-with-text">
                <img src="./assets/images/loading.svg" />
                <p>Hang in there!</p>
                <p>Generating your video...</p>
            </div>
        </div>
        <!-- Preview view -->
        <div id="preview--view">
            <!-- Preview video -->
            <video id="preview--video" muted playsinline loop></video>
            <!-- Preview image -->
            <img id="preview--image" />
            <!-- title view -->
            <div id="title--view" style="display: none;">Preview</div>
            <div id="preview--panel--view">
                <!-- Share button 
                <button id="share--btn">Share</button><br /> -->
                <!-- Download button 
                <button id="download--btn">Download</button> -->
                <img  id="share--btn" class="preview-share" src="./assets/images/ButtonShare.png" />
                <img  id="download--btn" class="preview-share preview-download" src="./assets/images/ButtonDownload.png" />



                 <!--<div id="share--btn" class="preview-share">Share</div>-->
                <!--<div id="download--btn" class="preview-share preview-download">Download <img class="download-icon" src="./assets/images/download-icon-128.png" /></div>-->
                <div id="downloadedMsg"></div>
            </div>
            <!-- Preview close button
            <button id="previewclose--button">
                x
            </button> -->
        </div>
                <div id="mobilePort" style="display: none;">
			<div id="popup" class="overlay">
				<div class="popup">
					<div id="stepOne" class="content">
						<p class="close-space no-margin"><a id="close1" class="close">×</a></p>
						<p class="font-16">Your Jio number is your VIP pass</p>
						<p>Enter your Jio number<span class="next-line"> to share your experiences</span></p>
						<p class="mobile_number"><span>+91</span><input id="user_mobileno" class="mobile-no-user number" name="mobile-no-user" type="tel" pattern="\d*" maxlength="10" minlength="10" pattern="[1-9]{1}[0-9]{9}" ></p>
                        <div id="error-no-jio-no" class="error-success-msg" style="display : none;">
                            <p class="no-jio">This is <b>not</b> your Jio number</p> 
                            <p class="no-jio">Please enter the Jio number <b>on this phone</b></p>
                        </div>
                         <div id="error-no-jio-exhaust" class="error-success-msg" style="display : none;">
                            <p class="no-jio">You have exhausted 3 attempts for OTP requests</p> 
                            <p class="no-jio">Please try after <b>15 minutes</b></p>
                        </div>
                        <div id="success-otp" class="error-success-msg" style="display : none;">
                            <p class="no-jio">New OTP has been shared</p> 
                            <p class="no-jio">Please wait <b>10 secs</b> before requesting again</p>
                        </div>
                        <div id="error-no-jio-somethingwrong" class="error-success-msg" style="display : none;">
                            <p id="error-msg" class="no-jio"></p> 
                        </div>
						<div class="s1btn">
                            <p id="proceed" class="button pink-btn disabled">Proceed</p>
                            <p class="in-block">or</p>
                            <p id="port" class="button white-btn">Get Jio SIM</p>
                            
                        </div>
                        <div class="s2btn-new">
                            <p class="in-block last-sent">Win Match Tickets & More</p>
                        </div>
					</div>
					<div id="stepTwo" class="content" style="display: none;">
						<p class="close-space no-margin"><a id="close2" class="close">×</a></p>
						<p></p>
						<p>Enter the OTP received on +91 <span id="masked_mobile">XXXXXXXX90</span></p>
                        
						<div class="otp-verify">
							<input type="tel" class="tseries t1" pattern="\d*" maxlength="1" required />
                            <input type="tel" class="tseries t2" pattern="\d*" maxlength="1" />
                            <input type="tel" class="tseries t3" pattern="\d*" maxlength="1" />
                            <input type="tel" class="tseries t4" pattern="\d*" maxlength="1" />
                            <input type="tel" class="tseries t5" pattern="\d*" maxlength="1" />
                            <input type="tel" class="tseries t6" pattern="\d*" maxlength="1" />
						</div>
                         <div id="success-otp-s2" class="error-success-msg" style="display : none;">
                            <p class="no-jio">New OTP has been shared</p> 
                            <p class="no-jio">Please wait <b>10 secs</b> before requesting again</p>
                        </div>
                        <div id="invalid-otp" class="error-success-msg" style="display: none;">
                            <p>Please enter a valid 6-digit OTP</p>
                        </div>
                         <div id="error-no-jio-exhaust-s2" class="error-success-msg" style="display : none;">
                            <p class="no-jio">You have exhausted 3 attempts for OTP requests</p> 
                            <p class="no-jio">Please try after <b>15 minutes</b></p>
                        </div>
						<p id="submit" class="button pink-btn disabled">Submit</p>
						<p id="resendOTP" class="text" onclick=backButtonClicked()>Resend OTP</p>
					</div>
				</div>
			</div>
		</div>
        `;
  }
}
export { uiutilis as UIUtilis };
