
let ismobile = false;
let mobileOS = "";
let userSelectedTeam;
let userteamLowercase;

var csk_count, kkr_count, mi_count, rcb_count, dc_count, pbks_count;
csk_count = kkr_count = mi_count = rcb_count = dc_count = pbks_count = 3;

var lsg_count, rr_count, srh_count;
lsg_count = rr_count = srh_count = 2;

//var dc_count = gt_count = lsg_count = pbks_count = rr_count = srh_count = 2;
//let dc_count_array = gt_count_array = lsg_count_array = rr_count_array = srh_count_array = ["1", "2"];
var lsg_count_array, rr_count_array, srh_count_array;
lsg_count_array = rr_count_array = srh_count_array = ["1", "2"];

var gt_count = 1;

var gt_count_array;
gt_count_array = ["1"];

//let pbks_count_array = ["1", "3"];
//let csk_count_array = kkr_count_array = mi_count_array = rcb_count_array = ["1", "2", "3"];

var csk_count_array, kkr_count_array, mi_count_array, rcb_count_array, dc_count_array, pbks_count_array;
csk_count_array = kkr_count_array = mi_count_array = rcb_count_array = dc_count_array = pbks_count_array = ["1", "2", "3"];

// Create an object to store the team arrays
const teamArrays = {
  dc_count: dc_count_array,
  gt_count: gt_count_array,
  lsg_count: lsg_count_array,
  rr_count: rr_count_array,
    srh_count: srh_count_array,
    csk_count: csk_count_array,
    mi_count: mi_count_array,
    kkr_count: kkr_count_array,
    rcb_count: rcb_count_array,
  pbks_count: pbks_count_array
};



let JWT;
let base_api_endpoint = "https://prodapi.jiovipbox.com/";

/*============== Desktop alert UI ============*/
function UIdesktopAlert() {
    document.querySelector('#app').innerHTML = `
        <div class="desktop-alert-title">
            You must be on a mobile device to use this experience
        </div>
    `;
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

function data() {
    let current_team = userteamLowercase + "_count";
    console.log(current_team);
    if (current_team == 2) {
        //let current_team_array = window[current_team + "_array"];
        let current_team_array = teamArrays[current_team];
        console.log(current_team_array);
        const iterator = current_team_array.values();

        for (const value of iterator) {
            console.log(value);
            const identifier = "ss_" + value;
            const click_identifier = "#ss_" + value;
            document.getElementById(identifier).style.display = "block";

             document.querySelector(click_identifier).addEventListener('click', () => {
                window.location.href = window.location.origin + "/squadselfie/list.html?jwt=" + JWT + "&experience=" + value; 
            });

        }
    } else {
        let teamName = current_team.includes("csk");
        // let current_team_array = window[current_team + "_array"];
        let current_team_array = teamArrays[current_team];
        console.log(current_team_array);
        const iterator = current_team_array.values();

        for (const value of iterator) {
            console.log(value);
            const identifier = "ss_" + value;
            const click_identifier = "#ss_" + value;
            if (teamName == true) {
                document.getElementById("ss_image_3").src = "./assets/images/jio/csk_pose3.png";
            }
            document.getElementById(identifier).style.display = "block";
            
              document.querySelector(click_identifier).addEventListener('click', () => {
                window.location.href = window.location.origin + "/squadselfie/list.html?jwt=" + JWT + "&experience=" + value; 
            });
        }
    }

    if (current_team == 1) {
        //let current_team_array = window[current_team + "_array"];
        let current_team_array = teamArrays[current_team];
        console.log(current_team_array);
        const iterator = current_team_array.values();

        for (const value of iterator) {
            console.log(value);
            const identifier = "ss_" + value;
            const click_identifier = "#ss_" + value;
            document.getElementById(identifier).style.display = "block";

             document.querySelector(click_identifier).addEventListener('click', () => {
                window.location.href = window.location.origin + "/squadselfie/list.html?jwt=" + JWT + "&experience=" + value; 
            });

        }
    }


}

function fetchData() {
    try {
        mobileDetection()
        if (ismobile) {
            var urlParams = new URLSearchParams(window.location.search);
            JWT = urlParams.get('jwt');


                var settings = {
                "url": base_api_endpoint + "user/get_profile",
                "method": "GET",
                "timeout": 0,
                "headers": {
                    "Authorization": JWT
                },
            };
            $.ajax(settings).done(function(response) {
                console.log(response);
                userSelectedTeam = response.selectedTeam;
                userteamLowercase = userSelectedTeam.toLowerCase();
                let imageUrl = window.location.origin + "/squadselfie/assets/images/jio/bg-" + userteamLowercase + ".jpg";
                document.getElementById("bd-logo").style.backgroundImage = "url(" + imageUrl + ")";



                data();
            
            }).fail(function(jqXHR, textStatus, errorThrown) {
                if (jqXHR.status == 401) {
                    // handle 401 error response here
                    //alert("unauthorized");
                    window.location.href = window.location.origin;
                    console.log('Unauthorized');
                } else {
                    //alert("unauthorized-error");
                    window.location.href = window.location.origin;
                    console.log('Error: ' + textStatus + ' - ' + errorThrown);
                }
            });
            
        }

         else {
            UIdesktopAlert();
        }
    }
    catch (err) {
        console.log("err:" + err.message);
    }
}

fetchData();