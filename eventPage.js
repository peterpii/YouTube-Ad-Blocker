chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.show == "showPageAction") {
        // retrieves all the tabs
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            // to highlight our tab
            chrome.pageAction.show(tabs[0].id);
        });
    }
});

