var DEFAULT_HOST = 'login.salesforce.com';
var USER_AGENT = 'Mozilla/5.0 (iPad; CPU OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1';

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
  
  chrome.webRequest.onBeforeSendHeaders.addListener(
    function(details) {
      var url = details.url;
      if ((url.indexOf(salesForceUrl) > 0 || url.indexOf(DEFAULT_HOST) > 0) && (url.indexOf('one.app') > 0 || url.indexOf('aura'))) {
        for (var i = 0; i < details.requestHeaders.length; ++i) {
          if (details.requestHeaders[i].name === 'User-Agent') {
            details.requestHeaders[i].value = USER_AGENT;
            break;
          }
        }
        return { requestHeaders: details.requestHeaders };
      }
    }, { urls: ['<all_urls>'] }, ['blocking', 'requestHeaders']);
});