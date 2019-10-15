// fires immediately after browser loads the object
window.onload = function(){ 
    // toggle button
    document.getElementById('toggle_button').onclick = function() {
        var text = document.getElementById('toggle_button').innerHTML;
        if (text == 'Disable') {
            document.getElementById('toggle_button').innerHTML = 'Enable';
        }
        else {
            document.getElementById('toggle_button').innerHTML = 'Disable';
        }
    };
   
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {todo: "change"})
    });
};
