import { DOMMessage, DOMMessageTypes, DOMMessageResponse } from '../types';

/**
 * @param {String} HTML representing a single element
 * @return {Element}
 */
const htmlToElement = (html: string) => {
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}

const showWarningToast = () => {
  console.log("Showing Warning Toast");
  // If there is already a toast, don't show another one
  if (document.getElementById("warningToast")) return;

  const element = htmlToElement(`
      <div class="toast" id="warningToast">
      <div class="__info">
        <div class="__icon--bad">X</div>
        <h5 class="__title">
          This site supports Israel.
        </h5>
      </div>
      <div class="__cta">
        <button id="dismiss">Dismiss</button>
        <button id="viewMore">View More</button>
      </div>
    </div>
  `);

  const stylesheet = htmlToElement(`
  <style>
  .toast {
    position: fixed;
    top: 12px;
    right: 12px;
    border: 2px solid #d73e3e;
    width: 500px;
    display: flex;
    flex-direction: row;
    border-radius: 8px;
    font-family: "Open Sans";
    justify-content: space-between;
    align-items: center;
    background: white;
  }
  .toast .__info {
    padding: 15px;
    display: flex;
    gap: 10px;
    align-items: center;
  }
  .toast .__info .__title {
    margin: 0;
    font-weight: 600;
    font-size: 18px;
  }
  .toast .__info .__icon--bad {
    background: #f7d8d8;
    font-size: 32px;
    width: 50px;
    height: 50px;
    display: inline-block;
    border-radius: 12px;
    text-align: center;
    color: #d73e3e;
  }
  .toast .__cta {
    display: flex;
    height: 80px;
    flex-direction: column;
    justify-content: center;
  }
  .toast .__cta button {
    flex: 1;
    background: #f8f8f8;
    border: 1px solid #ededed;
    cursor: pointer;
    transition: all 0.1s ease;
    font-size: 12px;
  }
  .toast .__cta button:hover {
    background: #ffffff;
  }
  .toast .__cta button:active {
    background: #dfdfdf;
  }
  .toast .__cta button:first-child {
    border-top-right-radius: 8px;
    border-bottom: 0;
  }
  .toast .__cta button:last-child {
    border-bottom-right-radius: 8px;
  }
  
  
  </style>
  `);

  document.body.appendChild(element as Node);
  document.head.appendChild(stylesheet as Node);

  // Add event listeners to the buttons
  const dismissButton = document.getElementById("dismiss");
  dismissButton?.addEventListener("click", () => {
    document.getElementById("warningToast")?.remove();
  });

  const viewMoreButton = document.getElementById("viewMore");
  viewMoreButton?.addEventListener("click", () => {
    document.getElementById("warningToast")?.remove();
    // Open the chrome extension popup
    chrome.action.openPopup();
  });
};

// Function called when a new message is received
const messagesFromReactAppListener = (
  msg: DOMMessage,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response: DOMMessageResponse) => void) => {

  if (msg.type === DOMMessageTypes.LANDED_ON_BLOCKED_SITE) {
    showWarningToast();
  }

  const headlines = Array.from(document.getElementsByTagName<"h1">("h1"))
    .map(h1 => h1.innerText);

  // Prepare the response object with information about the site
  const response: DOMMessageResponse = {
    title: document.title,
    headlines
  };

  sendResponse(response);
}

/**
* Fired when a message is sent from either an extension process or a content script.
*/
chrome.runtime.onMessage.addListener(messagesFromReactAppListener);