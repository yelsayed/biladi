import { DOMMessage, DOMMessageTypes } from "../types";

let observer: MutationObserver;
const DELAY_DEFAULT = 1000;

const OBSERVER_CONFIG = {
  attributes: true,
  childList: true,
  characterData: true,
  subtree: true
};

export function restartObserver(callback: MutationCallback) {
  observer?.disconnect();

  if (observer == null)
    observer = new MutationObserver(callback);

  observer.observe(document, OBSERVER_CONFIG);
}

export function startObserver(callback: MutationCallback, delay = DELAY_DEFAULT) {
  setTimeout(() => {
    restartObserver(callback);
  }, delay);

  chrome.runtime.onMessage.addListener(
    function(message: DOMMessage, sender, sendResponse) {
      if (message.type === DOMMessageTypes.URL_CHANGED) {
        restartObserver(callback);
      }
    });

}

export function stopObserver() {
  observer?.disconnect();
}
