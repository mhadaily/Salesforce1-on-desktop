var DEFAULT_URL = 'https://login.salesforce.com/one/one.app';
var DEFAULT_HOST = 'login.salesforce.com';
var USER_AGENT = "Mozilla/5.0 (iPad; CPU OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1";

function removeSpaces(x) {
    return x.replace(/^\s+|\s+$/gm, '');
}

chrome.storage.local.get('saleforceUrl', function(items) {
    var salesForceUrl;
    var storageUrl = removeSpaces(items.saleforceUrl);
    if ((storageUrl !== null && storageUrl !== '') && storageUrl !== ' ') {
        salesForceUrl = storageUrl;
    } else {
        salesForceUrl = DEFAULT_HOST;
    }

    var mjReg = new RegExp(salesForceUrl, 'ig');
    var mjOneAppReg = new RegExp('one.app', 'ig');

    chrome.webRequest.onBeforeSendHeaders.addListener(
        function(details) {
            var url = details.url;
            if (mjReg.test(url)) {
                for (var i = 0; i < details.requestHeaders.length; ++i) {
                    if (details.requestHeaders[i].name === 'User-Agent') {
                        details.requestHeaders[i].value = USER_AGENT;
                        break;
                    }
                }
                return { requestHeaders: details.requestHeaders };
            }
        }, { urls: ["<all_urls>"] }, ["blocking", "requestHeaders"]);

    // chrome.tabs.query({ active: true }, function(tabs) {
    //     var tabUrlClean = tabs[0].url;
    //     var tabId = tabs[0].id;
    //     chrome.tabs.onUpdated.addListener(function(tabId, info) {
    //         if (info.status == "complete") {
    //             //Update the url here if it's not one.app and is force
    //             if (!mjOneAppReg.test(tabUrlClean) && mjReg.test(tabUrlClean)) {
    //                 // Check if url doesn't have http or https
    //                 if (!salesForceUrl.match(/^[a-zA-Z]+:\/\//)) {
    //                     salesForceUrl = 'https://' + salesForceUrl;
    //                 }
    //                 chrome.tabs.create({ url: salesForceUrl + '/one/one.app' });
    //             }
    //         }
    //     });
    // });

});