// Saves options to chrome.storage.sync.
function save_options() {
    var saleforceUrl = document.getElementById('saleforceUrl').value;
    chrome.storage.sync.set({
        saleforceUrl: saleforceUrl,
    }, function() {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
            status.textContent = '';
        }, 1500);
    });
}
// Restores saleforceUrl using the preferences stored in chrome.storage.
function restore_options() {
    chrome.storage.sync.get({
        saleforceUrl: '',
    }, function(items) {
        document.getElementById('saleforceUrl').value = items.saleforceUrl;
    });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('saleforceUrlsave').addEventListener('click', save_options);

//https://test.force.com/one/one.app
//  if (!saleforceUrl.match(/^[a-zA-Z]+:\/\//)) {
//         saleforceUrl = 'https://' + saleforceUrl;
//     }