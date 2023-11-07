import {DOMMessage, DOMMessageTypes, DOMMessageResponse} from '../types';
import Cross from "../icons/cross";

/**
 * @param {string} html representing a single element
 * @return {Element}
 */
const htmlToElement = (html: string) => {
  var template = document.createElement('template');
  html = html.trim(); // Never return a text node of whitespace as the result
  template.innerHTML = html;
  return template.content.firstChild;
}

const concatDescription = (description?: string) => {
  if (!description) return "";
  // If description is more than 130 characters, truncate it and add ellipsis
  if (description.length > 130) {
    return  description.substring(0, 130) + "...";
  }
  return description;
}

const showWarningToast = (name?: string, description?: string) => {
  // If there is already a toast, don't show another one
  if (document.getElementById("warningToast")) return;
  description = concatDescription(description);

  const element = htmlToElement(`
      <div class="toast" id="warningToast">
      <div class="__info">
        ${Cross}
        <div>
          <h5 class="__title">
            ${name || "This site"} supports Israel.
          </h5>
          ${description && `
            <p class="__subtitle">
              ${description}.
            </p>
          `}
        </div>
      </div>
      <div class="__cta">
        <button id="dismiss">&#10005;</button>
      </div>
    </div>
  `);

  const stylesheet = htmlToElement(`
  <style>
  .toast {
    position: fixed;
    top: 12px;
    right: 12px;
    color: black;
    border: 2px solid #d73e3e;
    width: 500px;
    display: flex;
    flex-direction: row;
    border-radius: 8px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    justify-content: space-between;
    align-items: center;
    background: white;
    z-index: 100000000000;
  }
  .toast svg {
    flex-basis: 50px;
    min-width: 50px;
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
  .toast .__info .__subtitle {
    font-size: 12px;
    font-weight: 300;
    line-height: 1.5;
    margin: 2px 0 0;
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
  .toast .__cta button {
    flex: 1;
    color: #2a2a2a;
    background: none;
    border: none;
    cursor: pointer;
    transition: all 0.1s ease;
    font-size: 22px;
    position: absolute;
    top: 5px;
    right: 5px;
  }
  .toast .__cta button:hover {
    color: #929292;
  }
  .toast .__cta button:active {
    background: #2A2A2A;
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
};

/**
 * Fired when a message is sent from either an extension process or a content script.
 */
// chrome.runtime.onMessage.addListener(messagesFromReactAppListener);
chrome.runtime.sendMessage({
  type: DOMMessageTypes.FETCH_DOMAIN_INFO,
}).then((response) => {
  if (response && response.type === DOMMessageTypes.LANDED_ON_BLOCKED_SITE) {
    showWarningToast(response.siteName, response.description);
  }
});
