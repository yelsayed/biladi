import ky from 'ky';
import { DOMMessageTypes } from '../types/';

/**
 * Will get the top level domain from the current window location
 * Example: https://www.google.com/search?q=hello
 *          will return google.com
 */
const getTLDFromCurrentSite = (currentSite: string) => {
  const url = new URL(currentSite);
  const hostname = url.hostname;
  const domain = hostname.split('.').slice(-2).join('.');
  return domain;
};

/**
 * Will check if the current site is blocked
 * @param {string} href - The URL of the current site
 * @returns true if the site is blocked, false otherwise
 */
const isBlocked = async (href: string | undefined) => {
  if (!href) return false;

  const domain = getTLDFromCurrentSite(href);

  // Use ky to make the request 
  const resp = await ky.get(`https://8k5qjp8wea.execute-api.us-east-2.amazonaws.com/domains/${domain}`, {
    throwHttpErrors: false
  });

  // If the response is 200, then the site is blocked
  return resp.status === 200;
}

setTimeout(() => {
  chrome.tabs.onUpdated.addListener(
    async function (tabId, changeInfo, tab) {
      if (!changeInfo.url) return;

      console.log("checking if site is blocked: ", changeInfo.url);
      const isSiteBlocked = await isBlocked(changeInfo.url);
      console.log(isSiteBlocked);

      if (!isSiteBlocked) {
        chrome.action.setBadgeText({ text: "" });
        chrome.action.setIcon({ path: "/images/success38.png", tabId: tabId });
        return;
      };

      chrome.action.setBadgeText({ text: "!" });
      chrome.action.setIcon({ path: "/images/danger38.png", tabId: tabId });
      
      chrome.tabs.sendMessage(tabId, {
        type: DOMMessageTypes.LANDED_ON_BLOCKED_SITE,
        blockedSite: changeInfo.url,
      })
    }
  );
}, 3000);
