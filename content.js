// javascript file that works on specific url: Youtube
// send a message from the content page (need to listen from the event page which is a background script)
chrome.runtime.sendMessage({show: "showPageAction"});

// fires immediately after browser loads the object
window.onload = function(){ 
    var outerLayer = document.getElementsByClassName('video-ads ytp-ad-module');
    var adPlayerOverlay = document.getElementsByClassName('ytp-ad-player-overlay'); // popup ads in video
    var adImageOverlay = document.getElementsByClassName('ytp-ad-image-overlay');
    var button = document.getElementsByClassName('ytp-ad-skip-button ytp-button');
    var firstAd = document.getElementsByClassName('ytp-ad-text');

    function skipFirstInner(callback) {
        if (adPlayerOverlay[0] && adPlayerOverlay.length > 0) {
            adPlayerOverlay[0].style.visibility = 'hidden';
        }
        else if (adImageOverlay[0] && adImageOverlay.length > 0) {
            adImageOverlay[0].style.visibility = 'hidden';
        }
        callback();
    }

    function clickSkipBtn() {
        if(button[0] && button.length > 0) {
            button[0].click();
        }
    }

    setInterval(function(){ 
        // remove ads that pops up in the video frame
        if (outerLayer && outerLayer.length > 0) {
            clickSkipBtn();
            skipFirstInner(function() {
                if((firstAd && firstAd[2] && firstAd[2].innerHTML.includes('Ad')) ||
                   (firstAd && firstAd[1] && firstAd[1].innerHTML.includes('Ad')) ||
                   (firstAd && firstAd[0] && firstAd[0].innerHTML.includes('Ad'))) {
                    clickSkipBtn();
                    let videos = document.querySelectorAll('video');
                    for(let i=0; i<videos.length; i++) {
                        if(videos[i] && videos[i].duration) {
                            videos[i].currentTime = videos[i].duration;
                        }
                    }
                }
            });
        }
    }, 1);
};