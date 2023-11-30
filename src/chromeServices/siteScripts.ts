import { DOMMessageTypes } from '../types';
import Toaster from "../components/Toaster";
import ToasterStyle from "../components/ToasterStyle";

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

  document.body.appendChild(Toaster({name, description}));
  document.head.appendChild(ToasterStyle());

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
