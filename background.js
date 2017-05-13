chrome.webRequest.onBeforeSendHeaders.addListener(
    function(details) {
        var url = details.url;
        chrome.storage.sync.get('saleforceUrl', function(items) {
            var mjReg = new RegExp(items.salesforceUrl, 'ig');
            if (mjReg.test(url)) {
                for (var i = 0; i < details.requestHeaders.length; ++i) {
                    if (details.requestHeaders[i].name === 'User-Agent') {
                        details.requestHeaders[i].value = "Mozilla/5.0 (iPad; CPU OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1";
                        break;
                    }
                }
            }
            return { requestHeaders: details.requestHeaders };
        });
    }, { urls: ["<all_urls>"] }, ["blocking", "requestHeaders"]);

//https://test.force.com/one/one.app
//  if (!saleforceUrl.match(/^[a-zA-Z]+:\/\//)) {
//         saleforceUrl = 'https://' + saleforceUrl;
//     }