import { DOMMessageTypes } from '../types';
import { showBoycottToast } from "../utils";

/**
 * Fired when a message is sent from either an extension process or a content script.
 */
// chrome.runtime.onMessage.addListener(messagesFromReactAppListener);
chrome.runtime.sendMessage({
  type: DOMMessageTypes.FETCH_DOMAIN_INFO,
}).then((response) => {
  if (response && response.type === DOMMessageTypes.LANDED_ON_BLOCKED_SITE) {
    showBoycottToast(response.domainInfo);
  }
});
