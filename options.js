var INPUT_ID = 'saleforceUrl';
var BUTTON_ID = 'saleforceUrlsave';

// Saves options to chrome.storage.local.
function message(msg) {
  var status = document.getElementById('status');
  status.textContent = msg;
  setTimeout(function() {
    status.textContent = '';
  }, 1500);
}

function save_options() {
  var saleforceUrl = document.getElementById(INPUT_ID).value;
  if (!saleforceUrl) {
    message('Error: No value specified');
    return;
  }
  chrome.storage.local.set({
    saleforceUrl: saleforceUrl,
  }, function() {
    // Update status to let user know options were saved.
    message('Options saved.');
  });
}
// Restores saleforceUrl using the preferences stored in chrome.storage.
function restore_options() {
  chrome.storage.local.get('saleforceUrl', function(items) {
    document.getElementById(INPUT_ID).value = items.saleforceUrl;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById(BUTTON_ID).addEventListener('click', save_options);