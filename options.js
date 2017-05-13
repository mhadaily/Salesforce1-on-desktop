// Saves options to chrome.storage.sync.
function message(msg) {
    var status = document.getElementById('status');
    status.textContent = msg;
    setTimeout(function() {
        status.textContent = '';
    }, 1500);
}

function save_options() {
    var saleforceUrl = document.getElementById('saleforceUrl').value;
    if (!saleforceUrl) {
        message('Error: No value specified');
        return;
    }
    chrome.storage.sync.set({
        saleforceUrl: saleforceUrl,
    }, function() {
        // Update status to let user know options were saved.
        message('Options saved.');
    });
}
// Restores saleforceUrl using the preferences stored in chrome.storage.
function restore_options() {
    chrome.storage.sync.get('saleforceUrl', function(items) {
        document.getElementById('saleforceUrl').value = items.saleforceUrl;
    });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('saleforceUrlsave').addEventListener('click', save_options);