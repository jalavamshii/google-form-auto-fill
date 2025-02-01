document.addEventListener('DOMContentLoaded', function () {
  const extractButton = document.getElementById('extractButton');
  const htmlContent = document.getElementById('htmlContent');
  const updateButton = document.getElementById('updateButton');
  const addFieldButton = document.getElementById('addFieldButton');
  const deleteFieldButton = document.getElementById('deleteFieldButton');

  function sendMessageToContentScript(message, callback) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (tabs.length === 0 || !/^https?:\/\//.test(tabs[0].url)) {
        console.error("Content script cannot run on this page.");
        return;
      }

      const tabId = tabs[0].id;

      chrome.scripting.executeScript(
        {
          target: { tabId: tabId },
          files: ["contentScript.js"], // Inject the content script dynamically
        },
        function () {
          if (chrome.runtime.lastError) {
            console.error("Error injecting content script:", chrome.runtime.lastError.message);
            return;
          }

          // Send message to content script
          chrome.tabs.sendMessage(tabId, message, function (response) {
            if (chrome.runtime.lastError) {
              console.error("Error sending message to content script:", chrome.runtime.lastError.message);
            } else if (callback) {
              callback(response);
            }
          });
        }
      );
    });
  }

  extractButton.addEventListener('click', function () {
    const className = 'Qr7Oae'; // Replace with your class name

    sendMessageToContentScript({ action: 'getHTMLWithClass', className: className }, function (response) {
      if (response) {
        console.log(response);
        htmlContent.innerHTML = response.elementsHTML.join('<br>');
      }
    });
  });

  updateButton.addEventListener('click', function () {
    const predefinedValue = 'Name'; // Replace with your predefined value

    sendMessageToContentScript({ action: 'updateFields', predefinedValue: predefinedValue }, function (response) {
      if (response && response.status === 'done') {
        console.log('Fields updated successfully');
      }
    });
  });

  addFieldButton.addEventListener('click', function (event) {
    event.preventDefault();
    const keyInput = document.querySelector('[placeholder="Key"]');
    const valueInput = document.querySelector('[placeholder="Value"]');

    if (keyInput.value && valueInput.value) {
      sendMessageToContentScript(
        { action: 'addField', newKey: keyInput.value, newVal: valueInput.value },
        function (response) {
          if (response && response.status === 'done') {
            keyInput.value = '';
            valueInput.value = '';
          }
        }
      );
    }
  });

  deleteFieldButton.addEventListener('click', function (event) {
    event.preventDefault();
    const keyInput = document.querySelector('[placeholder="Key"]');

    if (keyInput.value) {
      sendMessageToContentScript(
        { action: 'deleteField', delKey: keyInput.value },
        function (response) {
          if (response && response.status === 'done') {
            keyInput.value = '';
          }
        }
      );
    }
  });
});


  